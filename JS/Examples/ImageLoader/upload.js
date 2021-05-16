const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (!bytes) {
    return '0 Byte'
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content
  }

  return node
}

const noop = () => {}

export function upload(selector, options = {}) {
  let files = []
  const input = document.querySelector(selector)
  const onUpload = options.onUpload ?? noop
  const preview = element('div', ['preview'])
  const open = element('button', ['btn'], 'Открыть')
  const upload = element('button', ['btn', 'primary'], 'Загрузить')

  upload.style.display = 'none'

  if (options.multi) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', preview)
  input.insertAdjacentElement('afterend', upload)
  input.insertAdjacentElement('afterend', open)

  const triggerInput = () => input.click() // по клику на кнопку инициируем клик по инпуту

  const changeHandler = event => {
    if (!event.target.files.length) {
      return
    }

    files = Array.from(event.target.files)
    preview.innerHTML = '' // очищаем предыдущие картинки
    upload.style.display = 'inline' // показываем кнопку загрузить

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()

      reader.onload = ev => { // readAsDataURL асинхронна, добавляем обработчик на результат ее работы
        const src = ev.target.result // картинка в base64

        preview.insertAdjacentHTML('afterbegin', `
          <div class="preview-image">
            <div class="preview-remove" data-name="${file.name}">&times;</div>
            <img src="${src}" alt="${file.name}" />
            <div class="preview-info">
              <span>${file.name}</span>
              ${bytesToSize(file.size)}
            </div>
          </div>
        `)
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandler = event => {
    if (!event.target.dataset.name) {
      return
    }

    const {name} = event.target.dataset
    files = files.filter(file => file.name !== name)

    if (!files.length) {
      upload.style.display = 'none' // скрываем кнопку загрузить
    }

    const block = preview.querySelector(`[data-name="${name}"]`).
      closest('.preview-image') // блок с картинкой, который удаляем

    block.classList.add('removing')
    setTimeout(() => block.remove(), 300)
  }

  const clearPreview = el => {
    el.style.bottom = '4px'
    el.innerHTML = '<div class="preview-info-progress"></div>'
  }

  const uploadHandler = () => {
    preview.querySelectorAll('.preview-remove').forEach(e => e.remove()) // удаляем крестики, чтобы не было возможности удалить при загрузке
    const previewInfo = preview.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview)
    onUpload(files, previewInfo)
  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)
  preview.addEventListener('click', removeHandler)
  upload.addEventListener('click', uploadHandler)
}
