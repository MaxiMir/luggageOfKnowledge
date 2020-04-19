const auth = async () => {
  const response = await fetch('https://vacancy-dev.erkapharm.com/api/mobile/auth', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phone: '79991234567', password: '123456'})
  })
  const j = await response.json()
}
