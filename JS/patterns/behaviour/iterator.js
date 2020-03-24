class MyIterator {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {
                        value: this.data[this.index++],
                        done: false
                    }
                } else {
                    this.index = 0;
                    return {
                        done: true,
                        value: void 0
                    }
                }
            }
        }
    }
}



const iterator = new MyIterator(['this', 'is', 'iterator']);

for (const val of iterator) {
    console.log('Value', val);
} /* =>
Value: this
Value: is
Value: iterator
*/


// #2 Генератор:
function* Generator(collection) {
    let index = 0;

    while(index < collection.length) {
        yield collection[index++];
    }
}

const gen = new Generator(['this', 'is', 'iterator']);
for (const val of gen) {
    console.log('Value', val);
} /* =>
Value: this
Value: is
Value: iterator
*/

// или:
console.log(gen.next().value); // this
console.log(gen.next().value); // is
console.log(gen.next().value); // iterator
console.log(gen.next().value); // undefined
