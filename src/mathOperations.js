export function complexMath(a, b, c) {
    if (a > 10 && b < 5) {
      return a * b + c;
    } else if (b > 8 && c < 3) {
      return a + b * c;
    } else {
      if (c === 0) {
        throw new Error('Division by zero error');
      }
      return (a + b) / c;
    }
  }