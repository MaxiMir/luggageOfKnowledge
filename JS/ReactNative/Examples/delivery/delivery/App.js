import React, {useState} from 'react'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'

import { initAppHandler } from './src/initAppHandler'
import { AppNavigation } from './src/navigation/AppNavigation'
import store from './src/store'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={initAppHandler}
        onFinish={() => setIsReady(true)}
        onError={console.log}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
