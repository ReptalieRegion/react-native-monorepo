# `camera-album`

-   기기의 앨범을 격자 형태로 리스트 형태로 보여줄 수 있습니다.

## Preview

![Simulator Screen Recording - iPhone 15 - 2024-01-30 at 04 21 20](https://github.com/ReptalieRegion/react-native-monorepo/assets/96051437/ae9dae50-b9c4-40f7-95b6-b352063548b1)

## Usage

```tsx
import { CameraAlbum, PhotoList } from '@crawl/camera-album';
import React, { useMemo } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { openPhotoPicker } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraAlbumPage() {
    const { top } = useSafeAreaInsets();
    const wrapperStyle = useMemo(() => [{ paddingTop: top }, styles.wrapper], [top]);

    return (
        <View style={wrapperStyle}>
            <CameraAlbum>
                {앨범권한 === .limited ? <CameraActionButtons /> : null}
                <PhotoList pageSize={96} />
            </CameraAlbum>
        </View>
    );
}

// .limited 권한일 때, 앨범 연결
function CameraActionButtons() {
    return (
        <View>
            <Button title="앨범" onPress={openPhotoPicker} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
```

### Props

```ts
type PhotoListState = {
    /**
     * 앨범에서 패치해올 사진 수
     */
    pageSize: number;
    /**
     * 앨범에서 최소 선택 개수
     */
    minSelectCount?: number;
    /**
     * 앨범에서 최대 선택 개수
     */
    maxSelectCount?: number;
};

interface PhotoListActions {
    /**
     * 최대 선택 개수를 넘었을 때 실행되는 함수
     */
    onMaxSelectCount?(): void;
    /**
     * 최소 선택 개수보다 작을 때 실행되는 함수
     */
    onMinSelectCount?(): void;
}

type PhotoListProps = PhotoListState & PhotoListActions & Pick<FlashListProps<Photo>, 'numColumns'>;
```

## hooks

### useCameraAlbum

```ts
const { currentSelectedPhoto, selectedPhotos } = useCameraAlbum();

type Photo = {
    /**
     * 이미지 uri
     */
    uri: string;
    /**
     * 이미지 이름
     */
    filename: string;
    /**
     * 이미지 width
     */
    width: number;
    /**
     * 이미지 height
     */
    height: number;
};

type CurrentSelectedPhoto = Photo;
type SelectedPhotos = Photo[];
```

### useCameraHandler

```ts
const { savePhoto, deletePhoto } = useCameraAlbumHandler();

// 기기 앨범에 사진 저장
savePhoto({ tag: 이미지_uri, options: { type: 'photo' } });

// 선택했던 사진 선택 해제
deletePhoto(이미지_uri);
```
