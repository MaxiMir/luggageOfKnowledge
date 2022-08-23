// Написать функцию, которая принимает строку как свой единственный параметр и возвращает true если строка содержит только уникальные символы.

func checkOnUniq(input: String) -> Bool {
    Set(input).count == input.count
}

func checkOnUniq(input: String) -> Bool  {
    var checkedSymbols = [Character]()
    
    for symbol in input {
        if checkedSymbols.contains(symbol) {
            return false
        }
        
        checkedSymbols.append(symbol)
    }
    
    return true
}


checkOnUniq(input: "ab")


// Написать функцию полиндром игнорируя регистр:

func checkOnPalindrom(input: String) -> Bool {
    let lowercased = input.lowercased()

    return String(lowercased.reversed()) == lowercased
}

checkOnPalindrom(input: "казак")


// Написать функцию, которая принмает две строки и возвращает true если эти строки содержат одни и теже символы в любом порядке с учетом регистра

func checkOnContains(input1: String, input2: String) -> Bool {
    var checkString = input2
    
    for letter in input1 {
        if let index = checkString.firstIndex(of: letter) { // сказывается на производительности
            checkString.remove(at: index)
            continue
        }
        
        return false
    }
    
    return checkString.count == 0
}

func checkOnContains(input1: String, input2: String) -> Bool {
    input1.sorted() == input2.sorted()
}

checkOnUniq(input1: "abc", input2: "bca")


// Написать функцию, которая принимает одну строку и возвращает true если она содержится в другой строке:

import Foundation

var input1 = "Hello, Swift"
input1.customContains("Swift") // -> true

extension String {
    func customContains(_ string: String) -> Bool {
        self.lowercased().contains(string.lowercased())
    }
}


// Написать функцию, которая принимает строку и символ, а далее возвращает количество раз, которое данные символ встречается в строке, с учетом регистра.

func getCount(input: String, character: Character) -> Int {
    var letterCount = 0

    for letter in input {
        if letter == character {
            letterCount += 1        
        }
    }

    return letterCount
}

func getCount(input: String, character: Character) -> Int {
    input.reduce(0) { // 0 - первоначальное значение
        $1 == character ? $0 + 1 : $0 // $0 - acc $1 - value
    }
}

getCount(input: "abaa", character: "a") // 3


// Написать функцию, которая принимает строку как свой единственный параметр и возвращает ту же саую строку только с удаленными повторяющимися символами:

func getUniqString(input: String) -> String {
    String(Set(input))
}

func getUniqString(string: String) -> String {
    var used = [Character]()

    for letter in string {
        if !used.contains(letter) {
            used.append(letter)
        }
    }

    return String(used)
}

getUniqString(input: "aaabcb") // abc


// Написать функцию, которая принимает две строки и возвращает true, если одна строка является вращением другой с учетом регистра:
import Foundation // для contains (тк он пришел из Objective C)


func checkOnRotate(input: String, rotated: String) -> Bool {
    guard input.count === rotated.count else { return false }
    let combined = input + input

    return combined.contains(rotated)
}

checkOnRotate(input: "Hello", rotated: "loHel") // -> true


// Написать функцию, которая проверяет на панграму:

func checkOnPangram() {
    let set = Set(input.lowercased())
    let letters = set.filter {
        $0 >= "a" && $0 <= "z"
    }
    
    return letterCount.count = 26
}


// Написать функцию, которая принимает две строки и возвращает true, если они одинаковы по длине, но различаются по содержанию не более, чем на 3 буквы.

func checkTheDifference(first: String, second: String) -> Bool {
    guard first.count == second.count else { return false }

    return first.filter {
        !second.contains($0)
    }.count <= 3
}

checkTheDifference(first: "Hello", second: "Hello")


// Поиск самого длинного префикса:

import Foundation

func prefix(input: String) -> String {
    let parts = input.components(separatedBy: " ")
    guard let first = parts.first else { return "" } // так массив может быть пустым

    var currentPrefix = ""
    var bestPrefix = ""

    for letter in first {
        currentPrefix.append(letter)

        for word in parts {
            if !word.hasPrefix(currentPrefix) {
                return bestPrefix
            }
        }

        bestPrefix = currentPrefix
    }

    return bestPrefix
}


// Развернуть слова в строке:

import Foundation

func reverse(input: String) -> String {
    let parts = input.components(separatedBy: " ")
    let reversed = parts.map { String($0.reversed()) }

    return reversed.joined(separator: " ")
}

// Сгенерировать случайное число из диапазона:

func random(min: Int, max: Int) -> Int {
    Int.random(in: min...max)
}


// Возводит первое число в степень второго:

import Foundation // pow

func power(number: Double, power: Double) -> Double {
    guard number > 0, power > 0 else { return 0 }

    return pow(number, power)
}


// Меняет значение 2-х аргументов:

var a = 5
var b = 3

swap(&a, &b)
(a, b) = (b, a)

// Проверить на простое число:

func checkOnPrimeNumber(number: Int) -> Bool {
    guard number >= 2 else { return false }

    for i in 2 ..< number  {
        if number % i == 0 {
            return false
        }
    }

    return true
}

// Бинарные числа:
let someNumber = 17
let binaryString = String(someNumber, radix: 2) // в бинарную строку -> 10001

// Radix или основание - число уникальных цифр, включая цифру ноль, используемых для представления чисел. Например, для десятичной системы основание равно десяти, потому что она использует десять цифрр от 0 дот 9, для двоичной системы основание равно двум, потому что она использует две цифры: 0 и 1.

let numberOfOnes = binaryString.filter { (char: Character) -> Bool in
    char == "1"
}.count

// Проверить строку на числа:

func strToInt(input: String) -> Bool {
    UInt(input) != nil // max 18446744073709551615
}

