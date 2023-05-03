# SWIFT

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
            Spacer()
                .frame(width: 50, height: 50) // задание определенного размера

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
            }
            .padding()
            
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
            }
            .padding()
            .background(.green)
            .clipShape(RoundedRectangle(cornerRadius: 20))
            
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
            TextField("Enter your name", text: $name)
                .textFieldStyle(RoundedBorderTextFieldStyle()) // $ - можем изменять

            SecureField("Enter your password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())

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
            }
            .pickerStyle(.segmented)

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
                }
                .listStyle(GroupedListStyle())
                .listRowBackground(Color.yellow)
            }
        }
    }
}
```

### NavigationView:

```swift
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
                    }
                    .pickerStyle(SegmentedPickerStyle())
                }

                Toggle(isOn: $additaionalSettings) {
                    Text("Addintional settings")
                }

                Button(action: {
                    print("Send selectedColor: \(self.colors[selectedColor]); additaionalSettings: \(additaionalSettings)")
                }) {
                    Text("Save changes")
                }
                .disabled(!additaionalSettings)
            }
        }.navigationBarTitle("Settings")
    }
}
```

### Action Sheets:

```swift
import SwiftUI

struct ContentView: View {
    @State private var showingAlert = false
    @State private var showingDeleteAlert = false
    @State private var showingSheet = false

    var body: some View {
        VStack {
            Button("Show Alert") {
                self.showingAlert = true
            }
            .alert(isPresented: $showingAlert) {
                Alert(title: Text("HelloSwiftUI"), message: Text("Some detail message"), dismissButton: .default(Text("OK"))) // dismissButton: .cancel()
            }

            Button("Show Delete Modal") {
                self.showingDeleteAlert = true
            }
            .alert(isPresented: $showingDeleteAlert) {
                Alert(title: Text("Are you sure want to delete this?"), message: Text("There is no way back"), primaryButton: .destructive(Text("Delete")) {
                    print("Deleting...")
                }, secondaryButton: .cancel())
            }
            
            Button(action: {
                self.showingSheet = true
            }) {
                Text("Show Action Sheets")
            }
            .actionSheet(isPresented: $showingSheet) {
                ActionSheet(title: Text("What do you want to do?"), message: Text("There is only one choise..."), buttons: [.default(Text("Dismiss Action Sheet")), .cancel(), .destructive(Text("Delete"))])
            }
        }
        
    }
}
```

### Modifiers:

```swift
import SwiftUI

struct CustomText: View { // кастомный текст
    var name: String
    var useGreenText: Bool
    
    var body: some View {
        Text(name)
            .font(.largeTitle)
            .padding()
            .foregroundColor(useGreenText ? .green : .red)
    }
}

struct customModifier: ViewModifier { // кастомный модификатор
    func body(content: Content) -> some View {
        content.font(.largeTitle).foregroundColor(.white)
            .padding()
            .background()
    }
}

extension View { // добавляем модификтор во View
    func customM() -> some View {
        self.modifier(customModifier())
    }
}

struct ContentView: View {
    @State private var useGreenText = false

    var body: some View {
        VStack(spacing: 30) {
            Button("Hello, World") {
                self.useGreenText.toggle()
            }

            CustomText(name: "First", useGreenText: useGreenText)

            CustomText(name: "Second", useGreenText: useGreenText)
            
            Text("Custom Modifier")
                .modifier(customModifier())
            
            Text("Custom Modifier from extenstion")
                .customM()
        }
    }
}
```

### @ObservedObject / @Published / @EnvironmentObject:

```swift
import SwiftUI

struct User {
    var firstName = "Max"
    var lastName = "Maximir"
}

class UserFromClass: ObservableObject { // подписываем на ObservableObject могут быть использованы в нескольких View
    @Published var firstName = "Max" // @Published - свойства меняются -> Изменить View
    @Published var lastName = "Maximir"
}

struct ContentView: View {
    
    @State private var user = User()
    
    @ObservedObject var userFromClass = UserFromClass()

    var body: some View {
        VStack {
            Text("Your name is \(user.firstName) \(user.lastName)")
            TextField("First name", text: $user.firstName)
            TextField("Last name", text: $user.lastName)
        }
    }
}

// @ObservedObject - для связи нескольких View
```

```swift
import SwiftUI

// в другом месте:
class UserSettings: ObservableObject {
    @Published var score = 0
}

struct ContentView: View {
    
    @State private var settings = UserSettings()

    var body: some View {
        VStack {
            Text("Your score is \(settings.score)")
            Button(action: {
                self.settings.score += 1
            }) {
                Text("Increase Score")
            }
        }
    }
}

// @EnvironmentObject - поделится данными со всеми View
```

### Переходы между View:

```swift
import SwiftUI

// Вынести в отдельный файл
struct DetailView: View {
    var body: some View {
        Text("This is the detail view")
    }
}

struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack {
                NavigationLink(destination: DetailView()) {
                  Text("Go to Detail View")
                }
                .navigationBarTitle("Navigation")
            }
        }
    }
}
```

```swift
import SwiftUI

struct Dog: Identifiable {
    var id = UUID()
    var name: String
}

struct DogRow: View {
    var dog: Dog
    
    var body: some View {
        Text(dog.name)
    }
}

struct DogView: View {
    var dog: Dog
    
    var body: some View {
        Text("Come and choose a \(dog.name)")
            .font(.largeTitle)
    }
}

struct ContentView: View {
    var body: some View {
        let first = Dog(name: "🐕")
        let dogs = [first]
        
        return NavigationView {
            List(dogs) { dog in
                NavigationLink(destination: DogView(dog: dog)) {
                    DogRow(dog: dog)
                }
            }
            .navigationBarTitle("Choose a dog")
        }
    }
}
```

```swift
import SwiftUI

struct DetailView: View {
    @Environment(\.presentationMode) var presentationMode // для кнопки назад

    var body: some View {
        VStack {
            Text("DetailView")

            Button("Back") {
                self.presentationMode.wrappedValue.dismiss() // кнопка вернуться назад
            }
        }
    }
}

struct ContentView: View {
    @State private var showingDetail = false
    
    var body: some View {
        Button(action: {
            self.showingDetail.toggle()
        }) {
            Text("Show detail")
        }
        .sheet(isPresented: $showingDetail) { // всплывающее View
            DetailView() // куда переходим
        }
    }
}
```

### UserDefaults:

```swift
import SwiftUI

// UserDefaults - хранит небольшое количество пользовательских данных в приложении

struct User: Codable { // структура для UserDefaults
    var firstName: String
    var lastName: String
}



struct ContentView: View {
    @State private var tapCount = UserDefaults.standard.integer(forKey: "Tab") // получение
    
    @State private var user = User(firstName: "Max", lastName: "Maximir")
    
    var body: some View {
        VStack {
            Button("Tab count: \(tapCount)") {
                self.tapCount += 1
                UserDefaults.standard.set(self.tapCount, forKey: "Tap") // установка
            }

            Button("Save user") {
                let encoder = JSONEncoder()
                
                if let data = try? encoder.encode(self.user) {
                    UserDefaults.standard.set(data, forKey: "UserData")
                }
            }
        }
        
    }
}

```

### Внешний вид View:

```swift
import SwiftUI


struct ContentView: View {
    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            Image("banana")
                .resizable()
                .aspectRatio(contentMode: .fit)

            Text("This photo was made by 📱")
                .padding(4)
                .background(.black)
                .foregroundColor(.white)
                .border(.red, width: 5) // или
                .overlay(RoundedRectangle(cornerRadius: 15).stroke(.green, lineWidth: 5)) // закругленная рамка
                .offset(x: -7, y: -7) // враво - +x | вниз y+

            Circle()
                .stroke(.red, lineWidth: 5) // рамка половина width идет внутрь, половина наружу
                .strokeBorder(.red, lineWidth: 5) // width идет внутрь
                .frame(width: 100, height: 100) // рамка

            Circle()
                .stroke(.red, style: StrokeStyle(lineWidth: 5, dash: [10, 1])) // круг пунктиром

            Text("Hello, Swift")
                .padding()
                .shadow(color: .red, radius: 5, x: 10, y: -10) // тень
                .border(.red, width: 5) // граница

            Button(action: {
                print("Button tapped")
            }) {
                Image(systemName: "cloud.fill")
                    .foregroundColor(.white)
                    .padding()
                    .background(.orange)
                    .clipShape(Capsule()) // обрезаем как овал
            }
            
            Text("Rotation Effect")
                .rotationEffect(.degrees(90)) // поворачиваем текст на 90 градусов | .radians(.pi/2) - радианы
        }
    }
}
```
```swift
import SwiftUI

struct ContentView: View {
    @State private var rotation = 0.0

    var body: some View {
        VStack() {
            Slider(value: $rotation, in: 0...360, step: 1.0)

            Text("Rotating Text")
                .rotationEffect(.degrees(rotation), anchor: .topLeading) // anchor - точка вращения

            Text("Rotating 3D Text")
                .font(.largeTitle)
                .rotation3DEffect(.degrees(45), axis: (x: 0, y: 1, z: 0))

            Text("Scale Text")
                .scaleEffect(3, anchor: .bottomLeading) // в 3 раза увеличили

            Text("Corner Text")
                .padding()
                .background(.green)
                .cornerRadius(20) // скругление View
                .opacity(0.5) // прозрачность
                .blur(radius: 15) // размытие
                
            Image("banana")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .colorMultiply(.red) // заливка картинок цветов
                .saturation(0.5) // насыщенность
                .contrast(0.5) // контрастность
        }
    }
}
```

### Анимации:
```swift
import SwiftUI

struct ContentView: View {
    @State private var scale: CGFloat = 1 // CGFloat - Core Graphics | применяется для работы с графикой
    @State private var angle: Double = 0
    @State private var borderThickness: CGFloat = 1
    
    var body: some View {
        VStack {
            Button(action: {
                self.scale += 1
            }) {
                Text("Tap me")
                    .scaleEffect(scale)
                    .animation(.linear(duration: 5)) // .animation(.spring())
            }
            Button(action: {
                self.angle += 45
                self.borderThickness += 1
            }) {
                Text("Tap me")
                    .padding()
                    .border(.red, width: borderThickness)
                    .rotationEffect(.degrees(angle))
                    .animation(.interpolatingSpring(mass: 1, stiffness: 1, damping: 0.5, initialVelocity: 20)) // анимация при каждом нажатии скорость будет анимации будет увеличиваться
            }
            
        }
        
    }
}
```
```swift
import SwiftUI

struct ContentView: View {
    @State private var showLabel: Bool = false
    private let timer = Timer.publish(every: 3, on: .main, in: .default).autoconnect()
    
    var body: some View {
        VStack {
            if showLabel {
                Text("Hello, Swift 🎃")
                    .font(.largeTitle)
                    .transition(.opacity) // описываем как Text будет появляться или скрываться на экране
            }
        }.onReceive(timer) { input in // при появлении ContentView подключаем таймер
            // С анимацией автоматически скрываем или показываем Text
            withAnimation {
                showLabel.toggle()
            }
        }
    }
}
```
