import * as React from 'react';
import {
    Animated,
    View,
    ScrollView,
    type LayoutChangeEvent,
    type NativeSyntheticEvent,
    type NativeScrollEvent,
    type ScrollViewProps,
} from 'react-native';

import type { FooterHeight, HeaderHeight, RowHeight, SectionFooterHeight, SectionHeight } from './fast-list-computer';
import FastListComputer from './fast-list-computer';
import { FastListItemTypes, type FastListItem } from './fast-list-item-recycler';
import FastListSectionRenderer from './fast-list-selection-renderer';

const FastListItemRenderer = ({
    layoutHeight: height,
    children,
}: {
    layoutHeight: number;
    children?: React.ReactNode;
}): React.ReactNode => <View style={{ height }}>{children}</View>;

export type FastListProps = {
    renderActionSheetScrollViewWrapper?: (a: React.ReactNode) => React.ReactNode;
    actionSheetScrollRef?: {
        current: ScrollView | null;
    };
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    renderHeader: () => React.ReactNode | null | undefined;
    renderFooter: () => React.ReactNode | null | undefined;
    renderSection: (section: number) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    renderRow: (section: number, row: number) => React.ReactNode | null | undefined;
    renderSectionFooter: (section: number) => React.ReactNode | null | undefined;
    renderAccessory?: (list: FastList) => React.ReactNode;
    renderEmpty?: () => React.ReactNode | null | undefined;
    onEndReached?: () => Promise<void>;
    onEndReachedThreshold?: number;
    headerHeight: HeaderHeight;
    footerHeight: FooterHeight;
    sectionHeight: SectionHeight;
    sectionFooterHeight: SectionFooterHeight;
    rowHeight: RowHeight;
    sections: number[];
    insetTop: number;
    insetBottom: number;
    scrollTopValue?: Animated.Value;
    contentInset: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
} & ScrollViewProps;

type FastListState = {
    batchSize: number;
    blockStart: number;
    blockEnd: number;
    height: number;
    items: Array<FastListItem>;
    isFetching: boolean;
};

function computeBlock(
    containerHeight: number,
    scrollTop: number,
): Pick<FastListState, 'batchSize' | 'blockStart' | 'blockEnd'> {
    if (containerHeight === 0) {
        return { batchSize: 0, blockStart: 0, blockEnd: 0 };
    }

    const batchSize = Math.ceil(containerHeight / 2);
    const blockNumber = Math.ceil(scrollTop / batchSize);
    const blockStart = batchSize * blockNumber;
    const blockEnd = blockStart + batchSize;
    return { batchSize, blockStart, blockEnd };
}

function getFastListState(
    {
        headerHeight,
        footerHeight,
        sectionHeight,
        rowHeight,
        sectionFooterHeight,
        sections,
        insetTop,
        insetBottom,
    }: FastListProps,
    {
        batchSize,
        blockStart,
        blockEnd,
        items: prevItems,
    }: Pick<FastListState, 'batchSize' | 'blockStart' | 'blockEnd'> & Partial<FastListState>,
): FastListState {
    if (batchSize === 0) {
        return {
            isFetching: false,
            batchSize,
            blockStart,
            blockEnd,
            height: insetTop + insetBottom,
            items: [],
        };
    }

    const computer = new FastListComputer({
        headerHeight,
        footerHeight,
        sectionHeight,
        rowHeight,
        sectionFooterHeight,
        sections,
        insetTop,
        insetBottom,
    });
    return {
        isFetching: false,
        batchSize,
        blockStart,
        blockEnd,
        ...computer.compute(blockStart - batchSize, blockEnd + batchSize, prevItems || []),
    };
}

export default class FastList extends React.PureComponent<FastListProps, FastListState> {
    static defaultProps = {
        isFastList: true,
        renderHeader: () => null,
        renderFooter: () => null,
        renderSection: () => null,
        renderSectionFooter: () => null,
        headerHeight: 0,
        footerHeight: 0,
        sectionHeight: 0,
        sectionFooterHeight: 0,
        insetTop: 0,
        insetBottom: 0,
        contentInset: { top: 0, right: 0, left: 0, bottom: 0 },
    };

    containerHeight: number = 0;
    scrollTop: number = 0;
    scrollTopValue: Animated.Value = this.props.scrollTopValue || new Animated.Value(0);
    scrollTopValueAttachment: { detach: () => void } | null | undefined;
    scrollView = React.createRef<ScrollView>();

    state: FastListState = getFastListState(this.props, computeBlock(this.containerHeight, this.scrollTop));

    static getDerivedStateFromProps(props: FastListProps, state: FastListState) {
        return getFastListState(props, state);
    }

    getItems(): Array<FastListItem> {
        return this.state.items;
    }

    isVisible = (layoutY: number): boolean => {
        return layoutY >= this.scrollTop && layoutY <= this.scrollTop + this.containerHeight;
    };

    scrollToLocation = (section: number, row: number, animated: boolean = true) => {
        const scrollView = this.scrollView.current;
        if (scrollView != null) {
            const {
                headerHeight,
                footerHeight,
                sectionHeight,
                rowHeight,
                sectionFooterHeight,
                sections,
                insetTop,
                insetBottom,
            } = this.props;
            const computer = new FastListComputer({
                headerHeight,
                footerHeight,
                sectionHeight,
                sectionFooterHeight,
                rowHeight,
                sections,
                insetTop,
                insetBottom,
            });
            const { scrollTop: layoutY, sectionHeight: layoutHeight } = computer.computeScrollPosition(section, row);
            scrollView.scrollTo({
                x: 0,
                y: Math.max(0, layoutY - layoutHeight),
                animated,
            });
        }
    };

    handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { nativeEvent } = event;
        const { contentInset, onEndReached, onEndReachedThreshold } = this.props;
        const { isFetching } = this.state;

        if (!isFetching && onEndReached) {
            const paddingToBottom = nativeEvent.layoutMeasurement.height * (onEndReachedThreshold ?? 1);
            const isEndReached =
                nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
                nativeEvent.contentSize.height - paddingToBottom;

            if (isEndReached) {
                this.setState((state) => ({ ...state, isFetching: true }));
                onEndReached().then(() => {
                    this.setState((state) => ({ ...state, isFetching: false }));
                });
            }
        }

        this.containerHeight = nativeEvent.layoutMeasurement.height - (contentInset.top || 0) - (contentInset.bottom || 0);
        this.scrollTop = Math.min(
            Math.max(0, nativeEvent.contentOffset.y),
            nativeEvent.contentSize.height - this.containerHeight,
        );

        const nextState = computeBlock(this.containerHeight, this.scrollTop);
        if (
            nextState.batchSize !== this.state.batchSize ||
            nextState.blockStart !== this.state.blockStart ||
            nextState.blockEnd !== this.state.blockEnd
        ) {
            this.setState(nextState);
        }

        const { onScroll } = this.props;
        if (onScroll != null) {
            onScroll(event);
        }
    };

    handleLayout = (event: LayoutChangeEvent) => {
        const { nativeEvent } = event;
        const { contentInset } = this.props;

        this.containerHeight = nativeEvent.layout.height - (contentInset.top || 0) - (contentInset.bottom || 0);

        const nextState = computeBlock(this.containerHeight, this.scrollTop);
        if (
            nextState.batchSize !== this.state.batchSize ||
            nextState.blockStart !== this.state.blockStart ||
            nextState.blockEnd !== this.state.blockEnd
        ) {
            this.setState(nextState);
        }

        const { onLayout } = this.props;
        if (onLayout != null) {
            onLayout(event);
        }
    };
    /**
     * FastList only re-renders when items change which which does not happen with
     * every scroll event. Since an accessory might depend on scroll position this
     * ensures the accessory at least re-renders when scrolling ends
     */
    handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { renderAccessory, onScrollEnd } = this.props;
        if (renderAccessory != null) {
            this.forceUpdate();
        }
        onScrollEnd && onScrollEnd(event);
    };

    renderItems() {
        const { renderHeader, renderFooter, renderSection, renderRow, renderSectionFooter, renderEmpty } = this.props;

        const { items } = this.state;

        if (renderEmpty != null && this.isEmpty()) {
            return renderEmpty();
        }

        const sectionLayoutYs: number[] = [];
        items.forEach(({ type, layoutY }) => {
            if (type === FastListItemTypes.SECTION) {
                sectionLayoutYs.push(layoutY);
            }
        });

        const children: React.ReactNode[] = [];
        items.forEach(({ type, key, layoutY, layoutHeight, section, row }) => {
            switch (type) {
                case FastListItemTypes.SPACER: {
                    children.push(<FastListItemRenderer key={key} layoutHeight={layoutHeight} />);
                    break;
                }
                case FastListItemTypes.HEADER: {
                    const child = renderHeader();
                    if (child != null) {
                        children.push(
                            <FastListItemRenderer key={key} layoutHeight={layoutHeight}>
                                {child}
                            </FastListItemRenderer>,
                        );
                    }
                    break;
                }
                case FastListItemTypes.FOOTER: {
                    const child = renderFooter();
                    if (child != null) {
                        children.push(
                            <FastListItemRenderer key={key} layoutHeight={layoutHeight}>
                                {child}
                            </FastListItemRenderer>,
                        );
                    }
                    break;
                }
                case FastListItemTypes.SECTION: {
                    sectionLayoutYs.shift();
                    const child = renderSection(section);
                    if (child != null) {
                        children.push(
                            <FastListSectionRenderer
                                key={key}
                                layoutY={layoutY}
                                layoutHeight={layoutHeight}
                                nextSectionLayoutY={sectionLayoutYs[0]}
                                scrollTopValue={this.scrollTopValue}
                            >
                                {child}
                            </FastListSectionRenderer>,
                        );
                    }
                    break;
                }
                case FastListItemTypes.ROW: {
                    const child = renderRow(section, row);
                    if (child != null) {
                        children.push(
                            <FastListItemRenderer key={key} layoutHeight={layoutHeight}>
                                {child}
                            </FastListItemRenderer>,
                        );
                    }
                    break;
                }
                case FastListItemTypes.SECTION_FOOTER: {
                    const child = renderSectionFooter(section);
                    if (child != null) {
                        children.push(
                            <FastListItemRenderer key={key} layoutHeight={layoutHeight}>
                                {child}
                            </FastListItemRenderer>,
                        );
                    }
                    break;
                }
            }
        });

        return children;
    }

    componentDidMount() {
        if (this.scrollView.current != null) {
            // @ts-ignore (AUTO)
            this.scrollTopValueAttachment = Animated.attachNativeEvent(this.scrollView.current, 'onScroll', [
                { nativeEvent: { contentOffset: { y: this.scrollTopValue } } },
            ]);
        }
    }

    componentDidUpdate(prevProps: FastListProps) {
        if (prevProps.scrollTopValue !== this.props.scrollTopValue) {
            throw new Error('scrollTopValue cannot changed after mounting');
        }
    }

    componentWillUnmount() {
        if (this.scrollTopValueAttachment != null) {
            this.scrollTopValueAttachment.detach();
        }
    }

    isEmpty = () => {
        const { sections } = this.props;
        const length = sections.reduce((innerLength, rowLength) => innerLength + rowLength, 0);
        return length === 0;
    };

    render() {
        const {
            /* eslint-disable @typescript-eslint/no-unused-vars */
            renderSection,
            renderRow,
            renderAccessory,
            sectionHeight,
            rowHeight,
            sections,
            insetTop,
            insetBottom,
            actionSheetScrollRef,
            renderActionSheetScrollViewWrapper,
            renderEmpty,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...props
        } = this.props;
        const wrapper = renderActionSheetScrollViewWrapper || ((val) => val);

        const scrollView = wrapper(
            <ScrollView
                {...props}
                ref={(ref) => {
                    // @ts-ignore (AUTO)
                    this.scrollView.current = ref;
                    if (actionSheetScrollRef) {
                        actionSheetScrollRef.current = ref;
                    }
                }}
                onScroll={this.handleScroll}
                onLayout={this.handleLayout}
                onMomentumScrollEnd={this.handleScrollEnd}
                onScrollEndDrag={this.handleScrollEnd}
                scrollEventThrottle={16}
                removeClippedSubviews={false}
            >
                {this.renderItems()}
            </ScrollView>,
        );

        return (
            <>
                {scrollView}
                {renderAccessory != null ? renderAccessory(this) : null}
            </>
        );
    }
}
