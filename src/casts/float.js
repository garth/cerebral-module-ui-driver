export default function float (value, { invalidNumberMessage } = {}) {
  const result = {
    isTypeValid: true,
    typedValue: null,
    value
  }
  if (typeof value === 'string' && value.length > 0) {
    const float = parseFloat(value)
    if (!isNaN(float)) {
      result.typedValue = float
    } else {
      result.isTypeValid = false
      result.error = invalidNumberMessage
    }
  }
  return result
}
