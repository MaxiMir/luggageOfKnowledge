// @ LOOKBEHIND-СОПОСТАВЛЕНИЯ (сопоставление с предыдущими символами) ES2018

// В тех средах исполнения, которые это поддерживают, вы теперь можете писать регулярные выражения, которые ищут символы до того, что вы сопоставляете. Например, чтобы найти все числа, перед которыми стоит знак доллара:

const regex = /(?<=\$)\d+/;
const text  = 'This cost $400';
text.match(regex) === ['400'];

// Всё дело в новой lookbehind-группе, близнеце lookahead-групп:
/**
 Look ahead:  (?=abc)
 Look behind: (?<=abc)

 Look ahead negative:  (?!abc)
 Look behind negative: (?<!abc)
 */



// @ ИМЕНОВАННЫЕ ГРУППЫ ЗАХВАТА ES2018:

// Теперь регулярные выражения могут выбирать подвыборки и использовать для простого парсинга. До недавнего времени мы могли ссылаться на такие фрагменты только по числам, например:
const getNameParts  = /(\w+)\s+(\w+)/g;
const name          = "Weyland Smithers";
const subMatches    = getNameParts.exec(name);

subMatches[1]     === 'Weyland';
subMatches[2]     === 'Smithers';

// А теперь есть синтаксис присвоения имён этим подвыборкам (или группам записи): внутри скобок в начале ставим ?<titlе>, если хотим присвоить группе имя:

const getNameParts  = /(?<first>\w+)\s(?<last>\w+)/g;
const name          = "Weyland Smithers";
const subMatches    = getNameParts.exec(name);

const {first, last} = subMatches.groups;
first === 'Weyland';
last === 'Smithers';



// @ УНАРНЫЙ ПОБИТОВЫЙ ОПЕРАТОР:
// проверка на −1:
const str = "Проверка";

if (~str.indexOf("верка")) { // если найдено , т.к. ~n = -(n+1)
  alert( 'найдено!' );
}

// <-> str.includes("верка")



// @ РАБОТА СО СТРОКАМИ:
const string = "Hello!";
string.startsWith("He"); // определяет, начинается ли строка с символов другой строки
string.endsWith("He"); // определяет, заканчивается ли строка с символов другой строки
string.includes('llo'); // определяет, содержит ли строка подстроку
string.repeat(3); // конструирует и возвращает новую строку, содержащую указанное количество соединённых вместе копий строки
string.trim();
string.trimEnd();
string.trimStart();
str.padStart(10, '1234'); // заполняет текущую строку другой строкой => 12341Hello
str.padStart(8, 'abc'); // => Helloabc



// @ ПОВТОРЕНИЕ СТРОКИ:
new Array(4).join("ля"); // ляляля



// @ ТЕГОВЫЕ ШАБЛОНЫ:

function tag(strings, ...expressions) {
  console.log(strings)
  console.log(expressions)
}

const string = tag`This is a string with ${true} and ${false} and ${100} interpolated inside.`

/* =>
["This is a string with ", " and ", " and ", " interpolated inside."]
[true, false, 100]
*/

function bold(strings, ...expressions) {
  let finalString = ''

  // Проходимся по всем выражениям
  expressions.forEach((value, i) => {
    finalString += `${strings[i]}<strong>${value}</strong>`
  })

  // Добавляем последний строковой литерал
  finalString += strings[strings.length - 1]

  return finalString
}

const string = bold`This is a string with ${true} and ${false} and ${100} interpolated inside.`

console.log(string) // =>
// This is a string with <strong>true</strong> and <strong>false</strong> and <strong>100</strong> interpolated inside.


const rawString = String.raw`I want to write /n without it being escaped.` // стандартный метод String.raw, чтобы предотвратить обработку управляющих последовательностей:

console.log(rawString) // =>
// I want to write /n without it being escaped.