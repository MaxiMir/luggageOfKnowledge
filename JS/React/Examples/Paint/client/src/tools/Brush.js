import Tool from "./Tool"

export default class Brush extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id)
		this.listen()
	}

	listen() { // добавляем слушатели события на наш canvas
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
				type: 'finish',
			}
		}))
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath() // начало рисования новой линии
		this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop) // перемещение курсора
	}

	mouseMoveHandler(e) {
		if (!this.mouseDown) {
			return
		}

		// this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
		this.socket.send(JSON.stringify({
			method: 'draw',
			id: this.id,
			figure: {
				type: 'brush',
				x: e.pageX - e.target.offsetLeft,
				y: e.pageY - e.target.offsetTop
			}
		}))
	}

	static draw(ctx, x, y) {
		ctx.lineTo(x, y) // рисует линии
		ctx.stroke() // обводка линии
	}
}
