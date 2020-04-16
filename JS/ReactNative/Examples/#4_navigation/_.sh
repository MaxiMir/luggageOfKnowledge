$ expo init rn-self-posts # генерация шрифтов

$ npm install react-navigation@^4 # React Navigation v4
# или
$ npm install @react-navigation/native # React Navigation v5
# docs: https://reactnavigation.org/docs/getting-started/

$ npm i expo-font # для установки шрифтов
$ expo install react-native-gesture-handler react-native-reanimated react-native-screens # для React Navigation v4
$ npm i react-navigation-tabs # используется для нижнего меню
$ npm i react-navigation-material-bottom-tabs react-native-paper # создает отдельную нижнюю навигацию для ANDROID в стиле material design
$ npm i react-navigation-stack

$ npm i react-navigation-drawer # боковое меню с навигацией

$ npm i react-navigation-header-buttons # для установки иконок в навигации
$ npm i @expo/vector-icons # набор иконок

$ npm i redux react-redux # redux
$ npm i redux-thunk # для диспатча асинхронных actions

$ expo install expo-image-picker # пакет для фото
$ expo install expo-permissions # библиотека для доступов

$ expo install expo-sqlite # БД

$ expo install expo-file-system # библиотека для работы с файловой системой


$ expo publish # публикация приложения
$ expo build:android -t app-bundle # билд для android
$ expo fetch:android:keystore # после сближенного приложения -> возвращает Keystore password | Key alias | Key password
$ expo upload:android # заливка приложения в Play Market

$ expo build:ios
$ expo upload:ios # заливка приложения в AppStore
