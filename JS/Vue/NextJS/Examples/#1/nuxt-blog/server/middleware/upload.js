const path = require('path')
const multer = require('multer') // пакет для загрузки файлов
const moment = require('moment') // пакет для работы с датами


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../', 'static')) // место куда складываем файл, когда он загрузится
  },
  filename(req, file, cb) {
    cb(null, `${ moment().format('DDMMYYYY-HHmmss_SSS') }-${ file.originalname }`) // название файла; moment() - текущий момент
  }
})

const fileFilter = (req, file, cb) => { // валидация файлов
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.export = multer({ // конфигурация для multer
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // ограничение по размеру файла
})


