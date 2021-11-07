# BROWSER API

+ [Как считать время в браузере](#time)

### <a name="time"></a> Как считать время в браузере:

При задании в setTimeout ms равным **0** или больше **2147483647** (24,8551348 дней), то это значение заменится на 1 ms

```js
const currentDate = new Date()
const timestamp = currrentDate.getTime()
```

При вызове `getTime` в движке V8 дергается `gettimeofday` в POSIX простыми словами выполняет обращение к кусочку памяти и получает его значение (vsyscall, vDSO - более современный - системный вызов, который позволяет обратиться к виртуальной странице в памяти)
Кварцевый генератор тактовой частоты 10МГц === 10.000.000 колебаний в секунду === 1 секунде.
И "припаивая" генератор к устройству и замеряя кол-во колебаний в виде прямоугольных сигналов до нас дошло, c помощью VHDL кода можно будет считать кол-во секунд

```js
// Пробуем реализовать открытие модалки через worker:

// FILE: worker.js:

const start = Date.now()

while (true) {
	if (Date.now() - start > 1500) {
		postMessage('killme')
        break
    }
}

// FILE: main.js:
function go() {
	const worker = new Worker('/worker.js')
  
    worker.onmessage = message => {
		if (message.data === 'killme') {
			worker.terminate() // убиваем воркер (убъет если вкладка в этот момент была активна, если нет так и будет висеть!)
        }
    }
}

// Пробуем реализовать открытие модалки через requestAnimationFrame:
let start
const timeout = 15000

function check(timestamp) {
	if (!start) {
		start = timestamp
    }
	
	const elapsed = timestamp - start
  
    if (elapsed < timeout) {
    	requestAnimationFrame(check) // запланировать перерисовку на следующем кадре анимации
    } else {
    	showPopup()
    }
}

requestAnimationFrame(check)
```

> **NTP Daemon** - Network Time Protocol daemon - демон, который лезет в сеть и синхронизирует локальное время со временем в интернете.

> **QPC** - QueryPerformanceCounter - считает тики (ticks) и он позволяет внедрить в браузер DOMHighResTimeStamp 

> **DOMHighResTimeStamp** - считает количество тиков (ticks) преобразованное во время (точность 5 микросекунд). Его возвращают performance.now() и requestAnimationFrame()

> Как выбрать?

Точность важна:
* performance.now() в исходниках это монотонно увеличивающееся время `g_platform->MonotonicallyIncreasingTime()` и считает системные тики(ticks), то ему будет все-равно если пользователь изменит системное время. 

* requestAnimationFrame (если что выполняется до setTimeout)

Точность не важна?

* Date.now
* setTimeout

> Состояния страниц:

* active
* passive
* hidden
* frozen
* terminated
* discarded

**Не фризит если...**

* Играет аудио | видео
* Используется WebRTC
* Обновляется title или фавиконка
* Показывается alert
* Отправляется push-нотификация

> Wake Lock API:

```js
let wakeLock = null

const requestWakeLock = async () => {
	try {
      wakeLock = await navigator.wakeLock.request() // спрашиваем через popup
	} catch (err) {
	  console.log(`${err.name}, ${err.message}`)	
    }
}

await requestWakeLock()
window.setTimeout(() => {
	wakeLock.release() // просим систему не засыпать
    wakeLock = null
}, 5000)

// если страничка стала невидимой, нужно еще раз запросить:
const handleVisibilityChange = async () => {
	if (wakeLock && document.visibilityState === 'visible') {
		await requestWakeLock()
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange)
```

> Web Animation API:
 
```js
function ownSetTimeout(callback, duration) {
	const div = document.createElement('div')
    const keyframes = new KeyframeEffect(div, [], {
    	duration,
        iterations: 1
    })
    const animation = new Animation(keyframes, document.timeline)
    animation.play()
    animation.addEventListener('finish', () => callback)
}
```
