import React, { useState } from 'react' // useState - для локального state
import * as Font from 'expo-font' // библиотека для шрифтов
import { AppLoading } from 'expo'

import { ScreenState } from './src/context/screen/ScreenState'
import { TodoState } from './src/context/todo/TodoState';
import { MainLayout } from './src/MainLayout';

/**
  * StyleSheet - класс для создания стилей для блоков. Производит оптимизации (объёдинение|удаление лишних стилей) + делает валидацию свойств

  * View - аналог <div>

  * ScrollView - аналог View только со скроллом

  * FlatList - отображает скролящийся лист данных, которые могут изменятся
*/

async function loadApplication() {
  await Font.loadAsync({ // загрузка шрифтов
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'), // название шрифта
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf') // название шрифта
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) { // приложение не будет отрисовываться, пока приложение не будет готово
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )

    // startAsync - старт асинхронной функции в фоне
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}

// В app.json  "orientation": "portrait" -> "orientation": "default" чтобы переворачивался экран
