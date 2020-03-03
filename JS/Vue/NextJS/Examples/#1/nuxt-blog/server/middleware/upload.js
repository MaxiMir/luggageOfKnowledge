const path = require('path')
const multer = require('multer')
const moment = require('moment')


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../', 'static')) // место куда складываем файл
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${moment().format('DDMMYYYY-HHmmss_SSS')}`) // название файла; moment() - текущий момент
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.export = multer({
  storage,
  fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}
})


