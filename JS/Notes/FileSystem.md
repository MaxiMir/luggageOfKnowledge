# FileSystem

+ [Import](#Import)

### <a name="Import"></a> Import:

```js
// FILE: modules/module.js:
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
```
**1 вариант:**
```js
import Logger, {color, sum} from "./module"

sum(1, 2);
color;
Logger.log(); // объект с методом log, экспортируемый по дефолту
```
**2 вариант:**
```js
// FILE: modules/index.js
import * as Module from './module'

Module.sum(1, 2);
Module.color;
Module.default.log(); // объект с методом log, экспортируемый по дефолту
```
