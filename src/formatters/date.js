import moment from 'moment'

export default function dateFormat (value, { timeFormat } = {}) {
  return value === null ? '' : moment(value * 1000 * 60).utcOffset(0).format(timeFormat)
}
