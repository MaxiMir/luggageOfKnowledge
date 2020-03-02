const {Strategy, ExtractJwt} = require('passport-jwt')
const {model} = require('mongoose') // вычленяет модели если они зарегистрированы
const keys = require('../keys')

const User = model('users')

const options = {
  // header -> Autherization: Bearer fks3143rdsf
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, // где находится токен (с фронтенда приходит в header)
  secretOrKey: keys.JWT // секретный ключ использованный для генерации
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await (await User.findById(payload.userId)).isSelected('id') // в payload данные из токена

    if (candidate) {
      done(null, candidate) // токен валидный -> ок
    } else {
      done(null, false) // запрещаем авторизацию для необходимого роута
    }

  } catch (e) {
    console.error(e)
  }
})
