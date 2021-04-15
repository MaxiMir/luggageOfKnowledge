#### ЗАГРУЗКА КАРТИНКИ ####
```js
async function myFetch() {
  try {
    const response = await fetch('coffee.jpg')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
      return
    }

    const myBlob = await response.blob()
    const objectURL = URL.createObjectURL(myBlob)
    const image = document.createElement('img')
    image.src = objectURL
    document.body.appendChild(image)
  } catch (e) {
    console.error(e)
  }
}

myFetch()
```
