import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData,
    Keyboard,
} from 'react-native';
import { shallow } from 'zustand/shallow';

import { ScrollContext } from '../../../../contexts/scroll/Scroll';
import useSharePostWriteStore from '../../../../stores/share-post/write';
import { color } from '../../../common/tokens/colors';

type SelectionInfo = {
    start: number;
    end: number;
};

const MAX_CHARACTER_COUNT = 500;

const WritingComponent = () => {
    const { scrollIntoView, isScrolling, scrollInfo } = useContext(ScrollContext);
    const { postContent, setPostContent } = useSharePostWriteStore(
        (state) => ({
            postContent: state.postContent,
            setPostContent: state.setPostContent,
        }),
        shallow,
    );

    const textInputRef = useRef<TextInput>(null);
    const textAreaView = useRef<View>(null);
    const [textInputHeight, setTextInputHeight] = useState<number>(200);
    const selectionRef = useRef<SelectionInfo>({ start: 0, end: 0 });
    const pressOutInfoRef = useRef<{ pageY: number; locationY: number }>({ pageY: 0, locationY: 0 });

    useEffect(() => {
        const scrollIntoViewMountEvent = Keyboard.addListener('keyboardDidShow', async () => {
            const keyboardMetrics = Keyboard.metrics();
            if (!keyboardMetrics) {
                return;
            }
            const { screenY } = keyboardMetrics;
            const { pageY } = pressOutInfoRef.current;
            if (screenY < pageY + 16) {
                const newY = scrollInfo.contentOffset.y + pageY / 2;
                scrollIntoView({ y: newY });
            }
        });

        return () => {
            scrollIntoViewMountEvent.remove();
        };
    }, [scrollInfo, scrollIntoView]);

    const handleTextChange = (inputText: string) => {
        setPostContent(inputText);
    };

    const handleSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        selectionRef.current = event.nativeEvent.selection;
    };

    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const { start, end } = selectionRef.current;
        const { key } = event.nativeEvent;
        if (start === end) {
            return;
        }

        const textSize = postContent.length;
        if (key.length > 1) {
            const newText = postContent.slice(0, start) + postContent.slice(end, textSize);
            setPostContent(newText);
            return;
        }

        const newText = postContent.slice(0, start) + key + postContent.slice(end, textSize);
        setPostContent(newText);
        selectionRef.current = { start: textSize, end: textSize };
    };

    const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const { height } = event.nativeEvent.contentSize;
        const minHeight = Math.max(200, height);
        const resizeHeight = minHeight - textInputHeight < 17 ? minHeight + 17 : minHeight;

        setTextInputHeight(resizeHeight);
        if (resizeHeight !== textInputHeight) {
            handleScrollBottom(resizeHeight - textInputHeight);
        }
    };

    const handleScrollBottom = async (addHeight: number) => {
        const newY = scrollInfo.contentOffset.y + addHeight;
        scrollIntoView({ y: newY, animated: false });
    };

    return (
        <View style={styles.container}>
            <View ref={textAreaView} style={[styles.textareaContainer, { height: textInputHeight + 45 }]}>
                <TextInput
                    scrollEnabled={false}
                    editable={!isScrolling}
                    ref={textInputRef}
                    style={[styles.textarea, { height: textInputHeight }]}
                    placeholder="일상을 공유해 주세요."
                    value={postContent}
                    multiline={true}
                    maxLength={MAX_CHARACTER_COUNT}
                    onPressOut={(event) =>
                        (pressOutInfoRef.current = {
                            pageY: event.nativeEvent.pageY,
                            locationY: event.nativeEvent.locationY,
                        })
                    }
                    onKeyPress={handleKeyPress}
                    onChangeText={handleTextChange}
                    onSelectionChange={handleSelectionChange}
                    onContentSizeChange={handleContentSizeChange}
                />
            </View>
            <View style={styles.characterCountContainer}>
                <Text style={styles.characterCountText}>{`${postContent.length} / ${MAX_CHARACTER_COUNT}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    textareaContainer: {
        borderColor: color.Gray[250].toString(),
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: color.White.toString(),
    },
    textarea: {
        verticalAlign: 'top',
        overflow: 'hidden',
    },
    characterCountContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
    },
    characterCountText: {
        fontSize: 12,
        color: color.Gray[500].toString(),
    },
});

export default WritingComponent;
