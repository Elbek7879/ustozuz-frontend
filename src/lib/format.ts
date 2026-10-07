export function formatPrice(amount: number) {
  const withSpaces = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${withSpaces} so'm`;
}