const DEFAULT_DECIMALS = 9;
export const roundDownIfExceedsDecimals = (
  value: number,
  decimals = DEFAULT_DECIMALS
) => {
  const valueStr = value.toString();
  const [, fraction] = valueStr.split(".");
  if (!fraction || fraction.length <= decimals) return value;
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
};
