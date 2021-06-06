import Tool from "./Tool"

export default class Rect extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id)
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseUpHandler(e) {
		this.mouseDown = false
		this.socket.send(JSON.stringify({
			method: 'draw',
			id: this.id,
			figure: {
				type: 'rect',
				x: this.startX,
				y: this.startY,
				width: this.width,
				height: this.height,
				color: this.ctx.fillStyle
			}
		}))
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL() // сохраняем изображение с canvas
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft
			let currentY = e.pageY - e.target.offsetTop
			this.width = currentX - this.startX
			this.height = currentY - this.startY
			this.draw(this.startX, this.startY, this.width, this.height)
		}
	}

	draw(x, y, w, h) {
		const img = new Image()
		img.src = this.saved // переменная с сохраненным изображением
		img.onload = () => { // cb изображение установилось
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // полная очистка canvas от нарисованных фигур
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height) // рисуем сохраненное изображение
			this.ctx.beginPath() // рисование новой фигуры
			this.ctx.rect(x, y, w, h)
			this.ctx.fill() // заполняем
			this.ctx.stroke() // обводим
		}
	}

	static staticDraw(ctx, x, y, w, h, color) {
		ctx.fillStyle = color
		ctx.beginPath()
		ctx.rect(x, y, w, h) // рисуем прямоугольник
		ctx.fill() // заполнение фигуры
		ctx.stroke() // обводка фигуры
	}
}
