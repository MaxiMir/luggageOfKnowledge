# LISP #

```common-lisp
// В () выражение
(+ 1 2) // => 3
(+ 2 4 6) // => 12
(+ (* 10 2) (* 2 4))  // => 28

(define pi2 3.14159)
pi2 // => 3.14159
( * pi2 (* 10 10)); // => 314.159...
(define radius 17)
(define circumference (* 2 pi radius)) 
circumference // => 106,814150022205297
```
#### Составные процедуры ####
```common-lisp
(define (square x) (* x x)) // x - параметр для процедуры, (* x x) - возврат процедуры
(square 2) // => 4
square // => <procedure: square>
(square (+ 1 3)) // => 16
(square (square 6)) // => 1296
(define (sum-of-squares x y) (+ (square x) (square y))) // сумма квадратов
(sum-of-squares 9 26) // => 757
(define (f a) (sum-of-squares (+ a 1) (+ a 2)))
(f 5) // 85
```
#### Предикат ####
```common-lisp
(define (abs x)
	(cond ((> x 0) x) // cond - условие
		  ((= x 0) 0)
		  ((< x 0) (- x))))		  


(abs 5) // => 5
(abs 0) // => 0

(> 10 12) // false => #f
(> 10 5) // true => #t
```

#### Cинтаксический сахар ####
```common-lisp
(define (abs x)
	(if (< x 0) (- x) x)) // if - только если 2 условия
	
(define (>= x y) // >= - название для процедуры
	(or (> x y) (= x y))) // or - или

// аналогично:
(define (>= x y)  
	(not (< x y)))


(>= 10 10) // => #t
```

#### Рекурсия ####
```common-lisp
(define (sqrt-iter guess x)
	(if (good-enough? guess x) guess
		(sqrt-iter (improve guess x) x)))

(define (improve guess x)
	(average guess (/ x guess)))

(degine (average a b)
	(/ (a + b) 2))

(define (good-enough? guess x)
	(< (abs (- (square guess) x)) 0.01))

(define (sqrt x)
	(sqrt-iter 1.0 x))

(sqrt 9) // => 3.0000915
```
