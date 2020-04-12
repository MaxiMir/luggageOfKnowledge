import * as Font from 'expo-font' // библиотека для шрифтов

export async function bootstrap() {
  await Font.loadAsync({ // загрузка шрифтов
    'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
  })
}

// Элементы необходимые для приложения
