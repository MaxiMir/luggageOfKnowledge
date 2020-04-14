import * as Font from 'expo-font' // библиотека для шрифтов
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({ // загрузка шрифтов
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
    })

    await DB.init()
  } catch (e) {
    console.log('Error:', error())
  }

}

// Элементы необходимые для приложения
