export class Http {
  static HEADERS = {
    'Content-Type': 'application/json'
  }

  static async get(url) {
    try {
      return request(url)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async post(url, data) {
    try {
      return request(url, 'POST', data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async delete(url) {
    try {
      return request(url, 'DELETE', data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async patch(url, data) {
    try {
      return request(url, 'PATCH', data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

async function request(url, method = 'GET', data) {
  let config = {
    method,
    headers: Http.HEADERS,
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(url, config)

  return await response.json()
}
