# reactnative.dev/docs/getting-started
# expo.io библиотека для разрабоки приложений (абстракция над react native)
# docs.expo.io - дока (Managed Workflow)
# draw.io # создание схем

# IOS -> Swift | Android -> Java


$ sudo npm install expo-cli --global
# если выдает ошибку то ввести:
$ sudo npm install --unsafe-perm -g expo-cli

$ expo init react-native-demo # создание проекта
# > Choose a template: blank
# > Please enter a few initial configuration values: name -> "First React Native"
# > Yarn v1.17.3 found. Use Yarn to install dependencies? N
$ cd react-native-demo
$ code . # запуск текущей директории в VSC
$ npm start

$ npm i expo-font # пакет для загрузки шрифтов


# ПОСЛЕ УСТАНОВКИ ANDROID STUDIO:
$ nano ~/.bash_profile
# export ANDROID_SDK=/Users/maksimmincenko/Library/Android/sdk
# export PATH=/Users/maksimmincenko/Library/Android/sdk/platform-tools:$PATH
# export PATH=$PATH:~/.npm-global/bin

# @ CONFIGURE -> SDK Manager
# SDK Platforms: ->
# + Android 9.0 (Pie)

# SDK Tools: ->
# + Android SDK Build-Tools
# + Android Emulator
# + Android SDK Platform-Tools
# + Android SDK Tools
# + Google Play Services
# + intel x86 Emulator Accelerator

# @ CONFIGURE -> AVD Manager -> + Create Virtual Device


# ПОСЛЕ УСТАНОВКИ XCODE:
# -> Preferences -> Locations
# Command Line Tools: Xcode

