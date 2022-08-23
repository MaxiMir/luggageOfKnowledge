```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .center, spacing: 50) { // вертикальный стек элементов | HStack - горизонтальный | ZStack - по оси Z
            Text("Hello, Apple")
                .kerning(5) // расстояние между символами | должен быть 1
                .tracking(5) // расстояние между символами + не добавляет пробел в конце | должен быть 1
                .font(.largeTitle)
                .foregroundColor(.white) // цвт текста
                .background(Color.init(#colorLiteral(red: 0.292, green: 0.081, blue: 0.6, alpha: 255)))
                .lineLimit(1) // сокращение строки до кол-во линий
                .truncationMode(.middle) // при сокращении ... будет в середине
                .multilineTextAlignment(.center) // выравнивание текста
                .lineSpacing(50) // межстрочный интервал
            
            Divider() // полоска
            
            Spacer() // занимает все доступное пространство
            Spacer().frame(width: 50, height: 50) // задание определенного размера

            Text("It's, Swift baby! 😎")
                .padding(.bottom, 25) // если просто число со всех
            
            Image("apple") // в folder assets
            
            Text("What's up? 🪬")
                .font(.largeTitle)
                .padding()
                .background(Color.yellow) // padding будет с yellow
                .padding() // padding будет за background
                .background(Color.red) // новый padding будет с red
        }
    }
}
```

### Изображения:

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Image("apple") // добавлять в Assets.xcassets
            .resizable() // чтобы помещалось в экран
            .aspectRatio(contentMode: .fit) // заполнение
        
        Image(systemName: "cloud.sun.fill") // .fill - полная заливка | иконки из приложения SF Symbols (developer.apple.com/sf-symbols)
            .font(.largeTitle) // можем редактировать как шрифт
            .padding(30)
            .background(Color.green)
            .foregroundColor(.blue)
            .clipShape(Circle()) // обрезать по кругу | RoundedRectangle(cornerRadius: 20) - прямоугольник с прямоугольными краями | Capsule() - овальные края
        
        Text("Hello, Apple 🍎")
            .background(
                Image("apple")
                    .resizable()
                    .frame(width: 200, height: 200)
            ) // background картинка
        
        Text("Hello, Developer 👨🏻‍💻!")
            .background(
                Circle()
                    .fill(Color.red)
                    .frame(width: 200, height: 200)
            ) // background круг
    }
}
```