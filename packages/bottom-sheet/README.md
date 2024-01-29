# `bottom-sheet`
- 바텀 시트 형태 제공
- 부드러운 제스처 및 snap 애니메이션 제공
- Reanimated v3 사용

## Preview
<p>
  <img src="https://github.com/ReptalieRegion/react-native-monorepo/assets/96051437/f2c16302-7c25-489a-83e3-0eeebd80646b" width="295" height="640" />
  <img src="https://github.com/ReptalieRegion/react-native-monorepo/assets/96051437/19aa294a-ba42-4990-8042-b84c7df592ce" width="360" height="640" />
</p>


## Installation
```
yarn workspace <설치할 패키지 이름> add @crawl/bottom-sheet
```
### Dependencies
```
yarn workspace <설치할 패키지 이름> add @crawl/design-system @crawl/overlay-manager react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

## Usage
간단하게 BottomSheet 사용하는 방법입니다.
```typescript
// useTestBottomSheet.tsx
import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';

export default function useTestBottomSheet() {
    const overlay = useOverlay();

    const openBottomSheet = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            overlay.open(({ isOpen, close, exit }) => (
                <BottomSheet
                    headerTitle="바텀 시트"
                    onClose={() => {
                        close();
                        exit();
                        resolve(true);
                    }}
                    snapInfo={{ startIndex: 0, pointsFromTop: [35] }}
                >
                    {isOpen ? (
                        <View>
                            <Text>Bottom Sheet</Text>
                        </View>
                    ) : null}
                </BottomSheet>
            ));
        });
    }, [overlay]);

    return openBottomSheet;
}

// App.tsx
import React from 'react';
import { Button, StyleSheet } from 'react-native';

export default function App() {
    const openTestBottomSheet = useTestBottomSheet();

    return (
      <View style={styles.container}>
        <Button title="바텀 시트 열기" onPress={openTestBottomSheet} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
});
```
## Props

### snapInfo
바텀 시트에 스냅할 정보입니다.
| type | default | required |
|:---:|:---:|:---:|
| SnapInfo | undefined | YES |
#### snapInfo.startIndex
시작할 스냅 포인트 인덱스입니다.
| type | default | required |
|:---:|:---:|:---:|
| number | undefined | YES |
#### snapInfo.pointsFromTop
스냅 포인트 배열, 숫자 또는 문자열 배열 단, 문자열은 {숫자}% 형태여야합니다.
| type | default | required |
|:---:|:---:|:---:|
| number \| string | undefined | YES |


### headerTitle
바텀 시트 헤더 제목입니다.
| type | default | required |
|:---:|:---:|:---:|
| string \| undefined | undefined | NO |

### header
바텀 시트 헤더입니다.
| type | default | required |
|:---:|:---:|:---:|
| () => React.JSX.Element \| undefined | undefined | NO |

### backDropStyle
backDrop 스타일입니다.
| type | default | required |
|:---:|:---:|:---:|
| BackDropStyle | undefined | NO |
#### backDropStyle.backgroundColor
backDrop 배경 색입니다.
| type | default | required |
|:---:|:---:|:---:|
| ColorValue \| undefined | undefined | NO |

## hooks
### useBottomSheet
바텀 시트의 close methods를 제공합니다.
```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useBottomSheet } from '@crawl/bottom-sheet';

function BottomSheetContent() {
  const { bottomSheetClose } = useBottomSheet();

  return (
    <View>
      <Button title="바텀 시트 닫기" onPress={bottomSheetClose}>
    </View>
  )
}
```
