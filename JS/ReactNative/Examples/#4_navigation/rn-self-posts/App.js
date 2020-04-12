import React, { useState } from 'react'
import { AppLoading } from 'expo' // only in EXPO
import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return <AppNavigation />
}
