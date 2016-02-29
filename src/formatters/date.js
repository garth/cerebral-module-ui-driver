import moment from 'moment'

export default function dateFormat (value, { dateFormat } = {}) {
  return value === null || value === undefined ? '' : moment(value).utcOffset(0).format(dateFormat)
}
