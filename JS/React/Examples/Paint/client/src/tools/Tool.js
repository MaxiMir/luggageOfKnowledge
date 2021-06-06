export default class Tool {
	constructor(canvas, socket, id) {
		this.canvas = canvas
		this.socket = socket
		this.id = id
		this.ctx = canvas.getContext('2d') // ctx - позволяет выполнять различные манипуляции с canvas
		this.destroyEvents()
	}

	set fillColor(color) { // цвет заполнения
		this.ctx.fillStyle = color
	}

	set strokeColor(color) { // цвет обводки
		this.ctx.strokeStyle = color
	}

	set lineWidth(width) { // толщина линии
		this.ctx.lineWidth = width
	}

	destroyEvents() { // обнуляет слушатели (для смены инструмента)
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup = null
	}
}
