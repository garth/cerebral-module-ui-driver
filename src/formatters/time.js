import moment from 'moment'

export default function dateFormat (value, { dateFormat } = {}) {
  return value === null ? '' : moment(value).format(dateFormat)
}
