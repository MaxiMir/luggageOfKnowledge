const MyPromise = require('./promise')

const t = setTimeout

describe('My promise', () => {
    let promise
    let executorSpy

    const successResult = 42

    beforeEach(() => {
        executorSpy = jest.fn(r => t(() => r(successResult), 150))
        promise = new MyPromise(executorSpy)
    })

    test('should exists and to be type of function', () => {
        expect(MyPromise).toBeDefined()
        expect(typeof MyPromise).toBe('function')
    })

    test('instance should have methods: then, catch, finally', () => {
        expect(promise.then).toBeDefined() // .not.toBeUndefined()
        expect(promise.catch).toBeDefined()
        expect(promise.finally).toBeDefined()
    })

    test('should call executor function', () => {
        expect(executorSpy).toHaveBeenCalled() // функция была вызвана
    })

    test('should get data in then block and chain them', async () => {
        const result = await promise
            .then(num => num)
            .then(num => num * 2)

        expect(result).toBe(successResult * 2)
    })
})

// $ npm run test