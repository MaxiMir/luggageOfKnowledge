import Intl from 'intl'
import 'intl/locale-data/jsonp/ru-RU.js'


export default (value, format = 'date') => {
  const options = {};

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'short'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const date = new Date(value)

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
}
