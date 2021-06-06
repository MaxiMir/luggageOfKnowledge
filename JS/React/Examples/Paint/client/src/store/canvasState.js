import {makeAutoObservable} from "mobx"

class CanvasState {
	canvas = null
	socket = null
	sessionid = null
	undoList = []
	redoList = []
	username = ""

	constructor() {
		makeAutoObservable(this) // делает данные класса отслеживаемыми
	}

	setSessionId(id) {
		this.sessionid = id
	}

	setSocket(socket) {
		this.socket = socket
	}

	setUsername(username) {
		this.username = username
	}

	setCanvas(canvas) {
		this.canvas = canvas
	}

	pushToUndo(data) {
		this.undoList.push(data)
	}

	pushToRedo(data) {
		this.redoList.push(data)
	}

	undo() {
		let ctx = this.canvas.getContext('2d')

		if (!this.undoList.length) {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth)
			return
		}

		this.redoList.push(this.canvas.toDataURL())
		let img = new Image()

		img.src = this.undoList.pop()
		img.onload = () => {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
		}
	}

	redo() {
		let ctx = this.canvas.getContext('2d')

		if (!this.redoList.length) {
			return
		}

		this.undoList.push(this.canvas.toDataURL())
		let img = new Image()

		img.src = this.redoList.pop()
		img.onload = () => {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
		}
	}

}

export default new CanvasState()
