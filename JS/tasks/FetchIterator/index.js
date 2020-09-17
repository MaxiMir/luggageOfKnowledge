/**
 Есть RESTful API, куда можно отправлять HTTP GET запрос раз в 500 ms только.
 Есть очередь из 100 подобных запросов.
 Нужна также статистика по удавшимся и неудавшимся запросам.
 */
const fetchIterator = {
    urns: [],
    delay: 500,
    set setUrns(urns) {
        this.urns = urns;
    },
    set setDelay(delay) {
        this.delay = delay;
    },
    [Symbol.asyncIterator]() {
        return {
            delay: this.delay,
            urns: this.urns,
            current: 0,
            last: this.urns.length - 1,

            async next() {
                let isSuccess = true;

                if (this.current > this.last) {
                    return {done: true};
                }

                const urn = this.urns[this.current];

                await new Promise(resolve => setTimeout(async () => {
                    try {
                        await fetch(urn);
                    } catch {
                        isSuccess = false;
                    } finally {
                        resolve();
                    }
                }, this.delay));

                this.current++;
                return {done: false, value: isSuccess};
            }
        }
    }
};

(async () => {
    const urns = [
        'htt1ps://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
    ];
    const result = {success: 0, error: 0};

    fetchIterator.setUrns = urns;

    for await (const isSuccess of fetchIterator) {
        const resultType = isSuccess ? 'success' : 'error';
        result[resultType]++;
    }

    console.log(result);
})();