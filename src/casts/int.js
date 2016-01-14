export default function int (value, { invalidNumberMessage } = {}) {
  const result = {
    isTypeValid: true,
    typedValue: null,
    value
  }
  if (typeof value === 'string' && value.length > 0) {
    const int = parseInt(value, 10)
    if (!isNaN(int)) {
      result.typedValue = int
    } else {
      result.isTypeValid = false
      result.error = invalidNumberMessage
    }
  }
  return result
}
