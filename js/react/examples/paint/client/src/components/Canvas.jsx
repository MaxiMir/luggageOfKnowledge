import React, {useEffect, useRef, useState} from 'react'
import {useParams} from "react-router-dom"
import {Modal, Button} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import axios from 'axios'
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import Rect from "../tools/Rect"
import "../styles/canvas.scss"

const Canvas = observer(() => { // observer - отслеживание изменений в store
	const canvasRef = useRef()
	const usernameRef = useRef()
	const [modal, setModal] = useState(true)
	const params = useParams()

	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d')
		canvasState.setCanvas(canvasRef.current) // сохраняем в store ссылку на DOM элемент canvas

		axios.get(`http://localhost:5000/image?id=${params.id}`)
			.then(response => {
				const img = new Image()
				img.src = response.data
				img.onload = () => {
					ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
					ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
				}
			})
	}, [])

	useEffect(() => {
		if (!canvasState.username) {
			return
		}

		const socket = new WebSocket(`ws://localhost:5000/`)
		canvasState.setSocket(socket)
		canvasState.setSessionId(params.id)
		toolState.setTool(new Brush(canvasRef.current, socket, params.id))

		socket.onopen = () => {
			console.log('Подключение установлено')
			socket.send(JSON.stringify({
				id: params.id,
				username: canvasState.username,
				method: "connection"
			}))
		}

		socket.onmessage = (event) => {
			const msg = JSON.parse(event.data)

			switch (msg.method) {
				case "connection":
					console.log(`пользователь ${msg.username} присоединился`)
					break
				case "draw":
					drawHandler(msg)
					break
			}
		}
	}, [canvasState.username])

	const drawHandler = (msg) => {
		const {figure} = msg
		const ctx = canvasRef.current.getContext('2d')

		switch (figure.type) {
			case "brush":
				Brush.draw(ctx, figure.x, figure.y)
				break
			case "rect":
				Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
				break
			case "finish":
				ctx.beginPath()
				break
		}
	}

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
		axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
			.then(response => console.log(response.data))
	}

	const connectHandler = () => {
		canvasState.setUsername(usernameRef.current.value)
		setModal(false)
	}

	return (
		<div className="canvas">
			<Modal show={modal} onHide={() => {
			}}>
				<Modal.Header>
					<Modal.Title>Введите ваше имя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input type="text" ref={usernameRef}/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => connectHandler()}>
						Войти
					</Button>
				</Modal.Footer>
			</Modal>
			<canvas ref={canvasRef} width={600} height={400} onMouseDown={mouseDownHandler}/>
		</div>
	)
})

export default Canvas
