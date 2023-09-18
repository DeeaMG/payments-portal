export function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys;
  const tx = typeof x;
  const ty = typeof y;

  if (x && y && tx === "object" && tx === ty) {
    const xKeys = ok(x);
    const yKeys = ok(y);

    if (xKeys.length !== yKeys.length) {
      return false;
    }

    for (const key of xKeys) {
      if (!deepEqual(x[key], y[key])) {
        return false;
      }
    }

    return true;
  }

  return x === y;
}
