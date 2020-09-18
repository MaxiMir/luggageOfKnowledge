/**
 Есть RESTful API, куда можно отправлять HTTP GET запрос раз в 500 ms только.
 Есть очередь из 100 подобных запросов.
 Нужна также статистика по удавшимся и неудавшимся запросам.
 */

// @1:
const fetchIterator = {
    urls: [],
    delay: 500,
    set setUrls(urls) {
        this.urls = urls;
    },
    set setDelay(delay) {
        this.delay = delay;
    },
    [Symbol.asyncIterator]() {
        return {
            delay: this.delay,
            urls: this.urls,
            current: 0,
            last: this.urls.length - 1,

            async next() {
                let isSuccess = true;
                const currentDelay = !this.current ? 0 : this.delay;
                console.log(currentDelay);
                if (this.current > this.last) {
                    return {done: true};
                }

                const urn = this.urls[this.current];

                await new Promise(resolve => setTimeout(async () => {
                    try {
                        await fetch(urn);
                    } catch {
                        isSuccess = false;
                    } finally {
                        resolve();
                    }
                }, currentDelay));

                this.current++;
                return {done: false, value: isSuccess};
            }
        }
    }
};

(async () => {
    const urls = [
        'htt1ps://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
    ];
    const result = {success: 0, error: 0};

    fetchIterator.setUrls = urls;

    for await (const isSuccess of fetchIterator) {
        const resultType = isSuccess ? 'success' : 'error';
        result[resultType]++;
    }

    console.log(result);
})();


// @2:
const delay = 500;
const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
];
let success = 0;
let failed = 0;
let intervalId;
let fetchedUrls = [...urls];

const fetcher = () => {
    const [url, ...restUrls] = fetchedUrls

    const onSuccess = () => {
        success += 1;
    }

    const onError = () => {
        failed += 1;
    }

    const onFinally = () => {
        fetchedUrls = restUrls;

        if (!fetchedUrls.length) {
            clearInterval(intervalId);
            console.log(`%cSUCCESS:`, 'color: green; font-size: small', success);
            console.log(`%cERRORS:`, 'color: red; font-size: small', failed);
        }
    }

    try {
        fetch(url)
            .then(onSuccess)
            .catch(onError)
            .finally(onFinally)
    } catch {
        onError();
    }
}

intervalId = setInterval(fetcher, delay);
