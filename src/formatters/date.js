import moment from 'moment'

export default function dateFormat (value, { dateFormat } = {}) {
  return value === null || value === undefined ? '' : moment(value).format(dateFormat)
}
