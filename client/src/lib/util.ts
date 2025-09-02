export const currencyFormat = (amount: number) => {
  return `$${(amount / 100).toFixed(2)}`;
};

export function filterEmptyValues(values: object){
  return Object.fromEntries(
    Object.entries(values).filter(([, v]) => v != null && v !== "" && v !== undefined && v.length != 0)
  )
}