const multer = require('multer')

const storage = multer.diskStorage({ // куда и как сохранять файл
  destination(req, file, cb) {
    cb(null, 'images') // 1-й параметр ошибка, 2-й папка куда складываем
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname) // 1-й параметр ошибка, 2-й название файла
  }
})

const fileFilter = (req, file, cb) => { // валидация файлов
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true) // 1-й параметр ошибка
  } else {
    cb(null, false) // 1-й параметр ошибка
  }
}

module.exports = multer({ storage, fileFilter })
