# Typo

크롤에서 자주 사용하는 token으로 구성되어 있는 `Typography`입니다.

## Usage

```tsx
<Typo variant="body2" color="primary" textAlign="center">
    Typography
</Typo>
```

## Props

### variant

|                                                                                                   type                                                                                                    | default | required |                               description                                |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :------: | :----------------------------------------------------------------------: |
| 'heading1' \| 'heading1Bold' \| 'heading1Light'\| 'heading2'\| 'heading3'\|'heading4'\| 'title1'\| 'title2'\| 'title3'\| 'title4'\| 'title5'\| 'title6'\| 'body1'\| 'body2'\| 'body3'\| 'body4'\| 'body5' | 'body2' |    NO    | fontSize, lineHeight, fontWeight를 token으로 만들어서 사용되고 있습니다. |

### color

|                                                                                                        type                                                                                                        |  default  | required |              description               |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------: | :------: | :------------------------------------: |
| 'primary'\| 'secondary'\| 'light-placeholder'\| 'placeholder'\| 'sub-placeholder'\| 'error'\| 'surface'\| 'require'\| 'default'\| 'sub-default'\| 'error-toast'\| 'warning-toast'\| 'info-toast'\| 'success-toast' | 'default' |    NO    | 자주 사용되고 있는 색상의 token입니다. |

### textAlign

|          type          | default | required |    description     |
| :--------------------: | :-----: | :------: | :----------------: |
| TextStyle['textAlign'] | 'auto'  |    NO    | 텍스트의 가로 정렬 |

### textAlignVertical

|              type              | default | required |    description     |
| :----------------------------: | :-----: | :------: | :----------------: |
| TextStyle['textAlignVertical'] | 'auto'  |    NO    | 텍스트의 세로 정렬 |

### 나머지 Props

|           type           |  default  | required |                description                 |
| :----------------------: | :-------: | :------: | :----------------------------------------: |
| Omit<TextProps, 'style'> | undefined |    NO    | react native 텍스트의 style을 제외한 props |
