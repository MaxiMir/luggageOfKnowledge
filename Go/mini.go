// FILE: project.go:
package main

import "fmt"

func main () { // выполянется при старте программы
	var number int = 12 // создание переменной + указание типа (необязательно)
	var float float32 = 2.3456 // или float64
	var str string = "Hello World"
	fmt.Println (number, float) // печатаем переменные на экран

	// если переменная/константа объявлена, но не используется -> ошибка declared and not used

	var res int
	res = 10 % 2

	const pi int = 3.14 // создание константы

	var web string = "progger"
	len(web) // длина строки
	web + " is cool profession\n Love it" // конкатенация строки

	var float float64 = 4.3254357
	fmt.Printf("%.2f \n", float) // .2 - 2 символа после запятой
	fmt.Printf("%T \n", float) // тип переменной -> float64

	var isDone bool = true
	fmt.Printf("%t \n", isDone) // выведет значение переменной -> true



	// @ условный оператор if:
	var age = 8
	if age < 5 {
		fmt.Println("Вам пора в десткий сад")
	} else if age < 18 {
		fmt.Println("Вам пора в школу")
	} else {
		fmt.Println("Вам пора в университет")
	}



	// @ switch:
	switch age {
		case 5: "Вам 5 лет"
		case 18: "Вам 18 лет"
		default: "Неизвестный возраст"
		// break не нужен
	}



	// @ цикл for:
	var i = 1
	for i <= 3 {
		fmt.Println(i)
		i++
	}
	// -> 1		2 		3

	// или так:
	for i := 1; i <= 3; i++ {
		fmt.Println(i)
	}



	// @ массив:
	var arr[3] int // создание массива с 3 элементами (int)
	arr[0] = 3
	arr[1] = 7
	arr[2] = 9
	fmt.Println(arr[1]) // обращение по индексу к массиву -> 7

	number := [3]float64 {4.23, 5.23, 98.1} // создание массива с элементами (float64)
	for i, value := range nums { // перебор массива
		fmt.Println(value, i)
	}
	// 4.23 0 		5.23 1 		98.1 2


	// @ карта (map):
	webSites := make(map[string]float64) // создание карты string тип данных для значений, float64 - тип данных для ключей

	webSites["vk"] = 0.8 // создание значения
	webSites["yandex"] = 0.99
	fmt.Println(webSites["vk"]) // обращение по ключу ->  0.8



	// @ замыкания:
	var num = 3
	multiple := func() int {
		num *= 2
		return num
	}
	fmt.Println(multiple()) // 6



	// @ отложенные фунции:
	defer printTwo() // выполнится после выполнения main()
	printOne()
	// -> 1 	2


	// @ указатели:
	var x = 0
	pointer (&x) // & - передаем ссылку на переменную
	fmt.Println(x) // -> 2


	// @ структура:
	bob := Man{"Bob", 7, 0.87} // создание структуры
	fmt.Println("Bob age is", bob.age) // обращение к ключу из структуры
	fmt.Println("Bob age happiness is", bob.getAgeHappines ())


	// @ пользовательская функция:
	var a = 29
	var b = 1
	sum, diff = foo(a, b)

}

// $ go run project.go	# выполняет project.go
// $ godoc fmt command 	# выводит информацию о fmt



func printOne() {
	fmt.Println("1")
}

func printTwo() {
	fmt.Println("2")
}

func pointer (x *int) { // * - ссылку на переменную
	*x = 2 // * - ссылка на переменную
}

func foo (num1 int, num2 int) (int, int) { // создание функции (возвращает 2 int)
	var sum int = num1 + num2
	var diff int = num1 - num2

	return res, diff
}


// @ Структура
type Man struct { // описание структуры
	name string,
	age int,
	happiness float64
}

func (man *Man) getAgeHappines() float64{ // функция со структурой
	return float64(man.age) * man.happiness
}
