import moment from 'moment'

export default function time (value, { timeFormat, invalidTimeMessage } = {}) {
  const result = {
    isTypeValid: true,
    typedValue: null,
    value
  }
  if (typeof value === 'string' && value.length > 0) {
    const time = moment.utc(value, timeFormat, true)
    if (time.isValid()) {
      result.typedValue = (time.get('hour') * 60) + time.get('minute')
    } else {
      result.isTypeValid = false
      result.error = invalidTimeMessage
    }
  }
  return result
}
