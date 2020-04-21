import Intl from 'intl'
import 'intl/locale-data/jsonp/ru-RU.js'


export default (value, currency = 'RUB') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(value);
}
