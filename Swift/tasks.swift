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

func checkOnUniq(input1: String, input2: String) -> Bool {
    var checkString = input2
    
    for letter in input1 {
        if let index = checkString.firstIndex(of: letter) {
            checkString.remove(at: index)
            continue
        }
        
        return false
    }
    
    return checkString.count == 0
}

checkOnUniq(input1: "abc", input2: "bca")
