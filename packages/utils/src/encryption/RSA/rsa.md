# encryptionRSA

첫번째 인자인 공개키로 두번째 인자인 data를 암호화 합니다.

```ts
function encryptionRSA(publicKey: string, data: unknown): string;
```

## Usage

```ts
const data = {
    id: '123',
    pw: '456',
};

encryptionRSA(공개키, data); // 암호화된 문자열
```
