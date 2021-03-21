export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(from, to) {
  return new Array(Math.abs(from - to) + 1)
      .fill('')
      .map((_, index) => index + Math.min(from, to));
}
