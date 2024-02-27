export const formatToKRW = (amount: number): string => {
    const formattedAmount = amount.toLocaleString('ko-KR');
    return formattedAmount + '원';
};
