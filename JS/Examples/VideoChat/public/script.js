let myVideoStream
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
const showChat = document.querySelector('#showChat')
const backBtn = document.querySelector('.header__back')
const text = document.querySelector('#chat_message')
const send = document.getElementById('send')
const messages = document.querySelector('.messages')
const inviteButton = document.querySelector('#inviteButton')
const muteButton = document.querySelector('#muteButton')
const stopVideo = document.querySelector('#stopVideo')
myVideo.muted = true

const user = prompt('Enter your name')

const peer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})

peer.on('open', (id) => socket.emit('join-room', ROOM_ID, id, user)) // socket.on('join-room', ... в server.js

navigator.mediaDevices.getUserMedia({audio: true, video: true}).
  then((stream) => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)

    peer.on('call', (call) => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
      })
    })

    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream)
    })
  })

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream)

  call.on('stream', (userVideoStream) => {
    addVideoStream(document.createElement('video'), userVideoStream)
  })
}

const addVideoStream = (video, stream) => { // пользовательский поток к видеоэлементу
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
    videoGrid.append(video)
  })
}

socket.on('createMessage', (message, userName) => {
  messages.innerHTML += `
    <div class="message">
      <b><i class="far fa-user-circle"></i> <span> ${userName === user
    ? 'me'
    : userName}</span> </b>
      <span>${message}</span>
    </div>
  `
})

backBtn.addEventListener('click', () => {
  document.querySelector('.main__left').style.display = 'flex'
  document.querySelector('.main__left').style.flex = '1'
  document.querySelector('.main__right').style.display = 'none'
  document.querySelector('.header__back').style.display = 'none'
})

showChat.addEventListener('click', () => {
  document.querySelector('.main__right').style.display = 'flex'
  document.querySelector('.main__right').style.flex = '1'
  document.querySelector('.main__left').style.display = 'none'
  document.querySelector('.header__back').style.display = 'block'
})

send.addEventListener('click', (e) => {
  if (text.value.length) {
    socket.emit('message', text.value)
    text.value = ''
  }
})

text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && text.value.length) {
    socket.emit('message', text.value)
    text.value = ''
  }
})

muteButton.addEventListener('click', () => {
  const [{enabled}] = myVideoStream.getAudioTracks()

  myVideoStream.getAudioTracks()[0].enabled = !enabled
  muteButton.classList.toggle('background__red')
  muteButton.innerHTML = `<i class="fas fa-microphone${!enabled
    ? ''
    : '-slash'}"></i>`
})

stopVideo.addEventListener('click', () => {
  const [{enabled}] = myVideoStream.getVideoTracks()

  myVideoStream.getVideoTracks()[0].enabled = !enabled
  stopVideo.classList.toggle('background__red')
  stopVideo.innerHTML = `<i class="fas fa-video${!enabled
    ? ''
    : '-slash'}"></i>`
})

inviteButton.addEventListener('click',
  () => prompt('Copy this link and send it to people you want to meet with',
    window.location.href))
