# OTHER

+ [Logical Assigment](#Logical_Assigment)

### <a name="Logical_Assigment"></a> Logical Assigment:
```js
let a = 1
let b = 42

a &&= b // <-> a && (a = b)  a будет 42
a ||= b // <-> a && (a = b)  a будет 1
a ??= b // <-> a ?? (a = b)  a будет 1
```
