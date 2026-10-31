export function formatCurrency(price: number) {
  return `Rs. ${price.toFixed(2)}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
