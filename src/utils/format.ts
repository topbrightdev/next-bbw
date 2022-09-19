const formatCurrency = (value: number) => {
  if (value < 1000 || value >= 1000000000) return `${value}`;
  else if (value < 1000000) return `${(value / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })}k`;
  else if (value < 1000000000) return `${(value / 1000000).toLocaleString("en-US", { maximumFractionDigits: 2 })}M`;
};

export { formatCurrency };
