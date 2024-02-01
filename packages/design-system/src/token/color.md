# color

미리 정의해둔 색상 팔레트 입니다.

## Getters

```ts
// 색상 Hex 문자열을 얻을 수 있습니다.
color.Red[500].toString();

// 색상 rgb 문자열을 얻을 수 있습니다.
color.Red[500].rgb();
```

## Manipulation

```ts
// 색상의 투명도를 조절해서 Hex 문자열을 얻을 수 있습니다.
color.Red[500].alpha(0.5).toString();

// 색상의 투명도를 조절해서 rgb 문자열을 얻을 수 있습니다.
color.Red[500].alpha(0.5).rgb();
```
