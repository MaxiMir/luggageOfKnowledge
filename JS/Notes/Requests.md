+ [XMLHttpRequest](#XMLHttpRequest)
+ [ПОСЛЕДОВАТЕЛЬНАЯ ЗАГРУЗКА КАРТИНОК](#IMG)

### <a name="XMLHttpRequest"></a> XMLHttpRequest:
```html
<button id="loadButton">Загрузить</button>
<div id="result"></div>
```
```js
const loadButton = document.querySelector('#loadButton')
const result = document.querySelector('#result')

const createFriendDOM = friend => {
  const div = document.createElement('div')
  div.classList.add('friend')
  div.textContent = `${friend.name} ${friend.lastName}`

  return div
}

loadButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'friends.json')
  xhr.responseType = 'json' // тип принимаемых данных от сервера (*)

  xhr.send() // для POST в передаем JSON.stringify(someData)

  xhr.onload = () =>  {
    if (xhr.status >= 400) { // ошибки
      result.innerHTML('Ошибка на стороне сервера')
    } else {
      // Если прописан тип json в (*) то:
      const friends = xhr.response // если нет то JSON.parse(xhr.responseText)

      for (const friend of friends) {
        const friendDom = createFriendDOM(friend)
        result.appendChild(friendDom)
      }
    }
  })
})
```
```js
const requestURL = 'https://jsonplaceholder.typeicode.com/users'

const sendRequest = (method, url, body = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.setRequestHeader('Content-Type', 'application/json') // устанавливаем заголовки для отправки
    xhr.responseType = 'json' // устанавливаем тип получаемых данных

    xhr.open(method, url)

    xhr.onload = () =>  {
      if (xhr.status >= 400) { // ошибки
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }

      console.log(xhr.response)
    }

    xhr.onerror = () => { // ошибка
      reject(xhr.response)
    }

    xhr.send(JSON.stringify(body))
  })
}

const body = {
  name: 'maxim',
  age: 26
}

sendRequest("GET", requestURL, body)
  .then(data => console.log(data))
  .catch(err => console.log(err))
```
### <a name="IMG"></a> ПОСЛЕДОВАТЕЛЬНАЯ ЗАГРУЗКА КАРТИНОК:
```js
const urls = [
  'https://ya.ru/images/1.png',
  'https://ya.ru/images/2.png',
  'https://ya.ru/images/3.png'
]
const loadButton = document.querySelector('#loadButton')
const gallery = document.querySelector('#gallery')

const loadImage = url => {
  return new Promise(resolve => {
    const img = document.createElement('img')

    gallery.appendChild(img)
    img.src = url
    img.addEventListener('load', () => resolve())
  })
}

loadButton.addEventListener('click', () => {
  loadImage(urls[0])
    .then(() => loadImage(urls[1]))
    .then(() => urls[2])
})
```