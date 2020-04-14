import React, {useState} from 'react'
import { AppLoading } from 'expo'

import { initAppHandler } from './src/initAppHandler'
import { AppNavigation } from './src/navigation/AppNavigation'

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

  return <AppNavigation />;
}
