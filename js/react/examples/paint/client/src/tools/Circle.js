import Tool from "./Tool"


export default class Circle extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		const canvasData = this.canvas.toDataURL()
		this.ctx.beginPath()
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = canvasData
	}

	mouseUpHandler(e) {
		this.mouseDown = false
	}

	mouseMoveHandler(e) {
		if (!this.mouseDown) {
			return
		}

		const currentX = e.pageX - e.target.offsetLeft
		const currentY = e.pageY - e.target.offsetTop
		const width = currentX - this.startX
		const height = currentY - this.startY
		const r = Math.sqrt(width ** 2 + height ** 2)
		this.draw(this.startX, this.startY, r)
	}

	draw(x, y, r) {
		const img = new Image()
		img.src = this.saved
		img.onload = async function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.arc(x, y, r, 0, 2 * Math.PI)
			this.ctx.fill()
			this.ctx.stroke()
		}.bind(this)
	}
}
