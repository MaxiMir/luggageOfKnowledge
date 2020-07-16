class MyPromise {
    constructor(executor) {
        this.queue = []
        executor()
    }

    then(fn) {
        return new self
    }

    catch(fn) {

    }

    finally(fn) {

    }
}

module.exports = MyPromise