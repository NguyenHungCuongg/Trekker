export function snakeToCamel(obj: Record<string, any>) {
  const res = {};
  for (const key in obj) {
    const camel = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    res[camel] = obj[key];
  }
  return res;
}
