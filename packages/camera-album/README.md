# `camera-album`

-   인스타 그램 같이 기기의 앨범을 리스트 형태로 보여줄 수 있습니다.
<!-- export { default as useCameraAlbum } from './hooks/useCameraAlbum';
export { default as useCameraAlbumHandler } from './hooks/useCameraAlbumHandler';
export { default as CameraAlbum } from './providers/CameraAlbum'; -->

## Usage

```tsx
import { CameraAlbum } from '@crawl/camera-album';

// 앨범 페이지
function AlbumPage() {
    <CameraAlbum>
        <AlbumList />
    </CameraAlbum>;
}

function AlbumList() {
    return <PhotoList />;
}
```
