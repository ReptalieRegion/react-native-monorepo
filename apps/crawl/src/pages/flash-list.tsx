import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { type ImageStyle } from 'expo-image';
import { type Asset, getAssetsAsync, usePermissions } from 'expo-media-library';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const numColumns = 3;

interface GalleryState {
    photos: Asset[];
    endCursor: string | undefined;
    hasNextPage: boolean;
    totalCount: number;
}

interface SetAssets {
    type: 'SET_ASSETS';
    photos: Asset[];
    endCursor: string | undefined;
    hasNextPage: boolean;
    totalCount: number;
}

type GalleryActions = SetAssets;

const initialState: GalleryState = {
    photos: [],
    endCursor: undefined,
    hasNextPage: true,
    totalCount: 0,
};

const reducer = (state: GalleryState, actions: GalleryActions): GalleryState => {
    switch (actions.type) {
        case 'SET_ASSETS':
            return {
                ...state,
                photos: [...state.photos, ...actions.photos],
                endCursor: actions.endCursor,
                hasNextPage: actions.hasNextPage,
                totalCount: actions.totalCount,
            };
        default:
            return state;
    }
};

export default function PlaygroundFlashList() {
    // styles
    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();

    const imageWidth = useMemo(() => width / numColumns, [width]);
    const wrapperStyles = useMemo<StyleProp<ViewStyle>>(() => [{ paddingBottom: bottom }, styles.wrapper], [bottom]);
    const imageStyles = useMemo<StyleProp<ImageStyle>>(() => [{ width: imageWidth, height: imageWidth }], [imageWidth]);

    // states
    const [permissionResponse, requestPermission] = usePermissions();
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchPhoto = useCallback(async () => {
        setIsLoading(true);
        if (!state.hasNextPage || isLoading) {
            return;
        }

        const assetInfo = await getAssetsAsync({
            first: 300,
            after: state.endCursor,
            mediaType: 'photo',
            sortBy: ['creationTime'],
        });

        dispatch({
            type: 'SET_ASSETS',
            photos: assetInfo.assets,
            endCursor: assetInfo.endCursor,
            hasNextPage: assetInfo.hasNextPage,
            totalCount: assetInfo.totalCount,
        });

        setIsLoading(false);
    }, [isLoading, state.endCursor, state.hasNextPage]);
    console.log(state.photos.length);

    // useEffect
    useEffect(() => {
        const initFetchPhoto = async () => {
            if (permissionResponse?.status !== 'granted') {
                await requestPermission();
            }

            fetchPhoto();
        };

        initFetchPhoto();
    }, [fetchPhoto, permissionResponse?.status, requestPermission]);

    // functions
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<Asset>) => {
            return <InnerImage key={item.id} uri={item.uri} imageStyles={imageStyles} />;
        },
        [imageStyles],
    );

    const keyExtractor = useCallback((item: Asset) => item.id, []);

    // constants
    const estimatedListSize = useMemo(
        () => ({
            width: imageWidth,
            height: imageWidth,
        }),
        [imageWidth],
    );

    return (
        <View style={wrapperStyles}>
            <FlashList
                data={state.photos}
                numColumns={numColumns}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={imageWidth}
                estimatedListSize={estimatedListSize}
                onEndReachedThreshold={0.5}
                onEndReached={fetchPhoto}
            />
        </View>
    );
}

function InnerImage({ uri, imageStyles }: { uri: string; imageStyles: StyleProp<ImageStyle> }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={{ position: 'relative' }}>
            <Image
                source={{ uri: uri }}
                style={imageStyles}
                onLoadEnd={() => {
                    setIsLoading(false);
                }}
            />
            {isLoading && <View style={[imageStyles, { position: 'absolute', backgroundColor: 'lightgray' }]} />}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowWrapper: {
        flexDirection: 'row',
        gap: 3,
    },
    contentContainerStyle: {
        gap: 3,
    },
});
