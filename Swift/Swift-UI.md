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


### Градиенты:

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, Developer 👨🏻‍💻!")
            .font(.largeTitle)
            .padding()
            .foregroundColor(.white)
            .background(LinearGradient(gradient: Gradient(colors:   [.black, .white]), startPoint: .leading, endPoint: .trailing)) // линейный градиент
    }
}
```
```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        let colors = Gradient(colors: [.red, .yellow, .green])
        let gradient = RadialGradient(gradient: colors, center: .center, startRadius: 50, endRadius: 200)
        // радиальный градиент
        return Circle().fill(gradient).frame(width: 400, height: 400)
    }
}
```
```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        let colors = Gradient(colors: [.red, .yellow, .green])
        let gradient = AngularGradient(gradient: colors, center: .center, startRadius: 50, endRadius: 200)
        // угловой градиент
        return Circle().strokeBorder(gradient, lineWidth: 100)
    }
}
```

### @State + Toggle:

```tsx
import SwiftUI

struct ContentView: View {
    
    @State private var showHello = true // @State - property wrapper
    
    var body: some View {
        VStack { // max 10 view решение - убернуть в Group
            Toggle(isOn: $showHello) { // switch
                Text("Show Hello")
            }.padding()
            
            if showHello {
                Text("Hello developer 🪬!")
            }
        }

    }
}
```


### @State + Button:

```swift
import SwiftUI

struct ContentView: View {
    
    @State private var showDetails = false // @State - property wrapper
    
    var body: some View {
        VStack {
            Button(action: {
                self.showDetails.toggle() // toggle boolean variable
            }) {
                Text("Show details ⚙️")
            }.padding().background(.green).clipShape(RoundedRectangle(cornerRadius: 20))
            
            if showDetails {
                Text("Some details 🔮").font(.largeTitle)
            }
        }

    }
}
```

### @State + TextField:

```swift
import SwiftUI

struct ContentView: View {
    
    @State private var name = ""
    @State private var password = ""
    
    var body: some View {
        VStack {
            TextField("Enter your name", text: $name).textFieldStyle(RoundedBorderTextFieldStyle()) // $ - можем изменять
            SecureField("Enter your password", text: $password).textFieldStyle(RoundedBorderTextFieldStyle())
            Text("Hello, \(name)")
        }
    }
}
```

### @State + Slider:
```swift
import SwiftUI

struct ContentView: View {
    
    @State private var celsius: Double = 0
    
    var body: some View {
        VStack {
            Slider(value: $celsius, in: -100...100, step: 0.1)
            Text("\(celsius) Celsius is \(celsius * 9/5 + 32) Fahrenheit")
        }
    }
}
```

### @State + Picker:

```swift:
import SwiftUI

struct ContentView: View {

    enum Colors: String, CaseIterable, Identifiable {
        case black, white, red
        var id: Self { self }
    }

    
    @State private var selectedColor: Colors = .red
    
    var body: some View {
        VStack {
            Picker("Choose a color 🧪:", selection: $selectedColor) {
                ForEach(Colors.allCases) {
                    Text($0.rawValue.capitalized)
                }
            }.pickerStyle(.segmented)
            Text("You selected: \(selectedColor.rawValue)")
        }
    }
}
```

### @State + Stepper


```swift
import SwiftUI

struct ContentView: View {

    @State private var age = 18
    
    var body: some View {
        VStack {
            Stepper("Enter your age", value: $age, in: 0...130)
            Stepper("Enter your age", onIncrement: {
                self.age += 1
            }, onDecrement: {
                self.age -= 1
            })
            Text("Your age is \(age)")
        }
    }
}
```

### Нажатия и жесты:

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Tap me ❤️")
            Spacer()
            Image("apple")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .onTapGesture(count: 2) { // кол-во нажатий для выполнения кода
                    print("Double tapped!")
                }
                .gesture(
                    LongPressGesture(minimumDuration: 2)
                        .onEnded { _ in
                            print("Pressed!")
                        }
                ) // нажатие 2 секунды
                .gesture(
                    DragGesture(minimumDistance: 50)
                        .onEnded { _ in
                            print("Dragged!")
                        }
                ) // удержание и перемещение
        }
        .contentShape(Rectangle()) // с этим модификатором по любой области будет отрабатывать
        .onTapGesture { // ! отработает по нажатию на элементы внутри, но не на пустой блок
            print("Tapped!")
        }
    }
}
```

### List (Список):

```swift
import SwiftUI

// static list
struct MusicRow: View {
    var name: String

    var body: some View {
        Text("Music: \(name)")
    }
}

struct Restaurant: Identifiable { // Identifiable - для уникальных id
    var id = UUID()
    var name: String
}

struct RestaurantRaw: View {
    var restaurant: Restaurant

    var body: some View {
        Text("Come and eat at: \(restaurant.name)")
    }
}

struct TaskRow: View {
    var body: some View {
        Text("Some task")
    }
}

struct ContentView: View {
    var body: some View {
        let first = Restaurant(name: "First")
        let second = Restaurant(name: "Second")
        let third = Restaurant(name: "Third")
        let restaurants = [first, second, third]

        return VStack {
            // Static list:
            List {
                MusicRow(name: "Rock")
                MusicRow(name: "Rap")
                MusicRow(name: "Classical")
            }
            // Dynamic list:
            List(restaurants) { restaurant in
                RestaurantRaw(restaurant: restaurant)
            }
            // Group list:
            List {
                Section(header: Text("important tasks"), footer: Text("-- End --")) {
                    TaskRow()
                    TaskRow()
                    TaskRow()
                }
                Section(header: Text("Other tasks")) {
                    TaskRow()
                    TaskRow()
                    TaskRow()
                }.listStyle(GroupedListStyle())
                .listRowBackground(Color.yellow)
            }
        }
    }
}
```

### NavigationView:

```tsx
import SwiftUI

struct ContentView: View {
    @State private var users = ["Max", "Maria", "Matt", "Alex"]
    
    var body: some View {
        NavigationView {
            List {
                ForEach(users, id: \.self) { user in
                    Text(user)
                }
                .onDelete(perform: delete)
                .onMove(perform: move)
            }
            .navigationBarTitle("Names 💀", displayMode: .inline) // <-> h1 | inline - в шапке
            .navigationBarItems(trailing: EditButton()) // элементы в шапке
        }
    }
    
    func delete(at offsets: IndexSet) {
        users.remove(atOffsets: offsets)
    }
    
    func move(from source: IndexSet, to destination: Int) {
        users.move(fromOffsets: source, toOffset: destination)
    }
}
```

### TabView:

```swift
import SwiftUI

struct ContentView: View {
    @State private var selectedView = 1

    var body: some View {
        TabView(selection: $selectedView) {
            Text("First View")
                .tabItem { // footer
                    Image(systemName: "1.circle")
                    Text("First")
                }.tag(1)
            Text("Second View")
                .tabItem {
                    Image(systemName: "2.circle")
                    Text("Second")
                }.tag(2)
        }
    }
}
```

### Form:

```swift 
import SwiftUI

struct ContentView: View {
    @State private var colors = ["Red", "Green", "Blue"]
    @State private var selectedColor = 0
    @State private var additaionalSettings = false

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Colors")) {
                    Picker(selection: $selectedColor, label: Text("Select a color")) {
                        ForEach(0..<colors.count, id: \.self) {
                            Text(self.colors[$0])
                        }
                    }.pickerStyle(SegmentedPickerStyle())
                }
                Toggle(isOn: $additaionalSettings) {
                    Text("Addintional settings")
                }
                Button(action: {
                    print("Send selectedColor: \(self.colors[selectedColor]); additaionalSettings: \(additaionalSettings)")
                }) {
                    Text("Save changes")
                }.disabled(!additaionalSettings)
            }
        }.navigationBarTitle("Settings")
    }
}
```

### Action Sheets: