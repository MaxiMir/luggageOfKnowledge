const { Strategy, ExtractJwt } = require('passport-jwt')
const { model } = require('mongoose') // вычленяет модели если они зарегистрированы #model
const keys = require('../keys')
const User = model('users') // создаем модель User из коллекции users (использование #model)

const options = {
  // header -> Autherization: Bearer fks3143rdsf
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, // где находится токен (с фронтенда приходит в header)
  secretOrKey: keys.JWT // секретный ключ, использованный для генерации jwt
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload.userId).selected('id') // в payload данные из токена (что шифровали в jwt.sign)

    if (candidate) {
      done(null, candidate) // токен валидный -> ок
    } else {
      done(null, false) // запрещаем авторизацию для необходимого роута
    }

  } catch (e) {
    console.error(e)
  }
})
