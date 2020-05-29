// @ МОДУЛИ:

// FOLDER: modules/module.js:
const privateVariable = 27;

export const color = "#fff";

export function sum(a, b) {
  return a + b;
}

export default {
  log() {
    console.log(privateVariable)
  }
}

// FOLDER: modules/index.js
import Logger, {color, sum} from "./module"; // #1
import * as Module from './module'; // #2

// #1:
sum(1, 2);
color;
Logger.log(); // объект с методом log, экспортируемый по дефолту

// #2:
Module.sum(1, 2);
Module.color;
Module.default.log(); // объект с методом log, экспортируемый по дефолту
