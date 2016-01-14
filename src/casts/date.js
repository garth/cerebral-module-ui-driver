import moment from 'moment'

export default function date (value, { dateFormat, invalidDateMessage } = {}) {
  const result = {
    isTypeValid: true,
    typedValue: null,
    value
  }
  if (typeof value === 'string' && value.length > 0) {
    const date = moment.utc(value, dateFormat, true)
    if (date.isValid()) {
      result.typedValue = date.toDate()
    } else {
      result.isTypeValid = false
      result.error = invalidDateMessage
    }
  }
  return result
}
