export function formatNumber(num: number): string {
    const formattedNumber = new Intl.NumberFormat('vi-VN').format(num);
    return formattedNumber;
}