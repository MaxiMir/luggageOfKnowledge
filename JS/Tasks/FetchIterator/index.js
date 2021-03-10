/**
 Есть RESTful API, куда можно отправлять HTTP GET запрос раз в 500 ms только.
 Есть очередь из 100 подобных запросов.
 Нужна также статистика по удавшимся и неудавшимся запросам.
 */

// @1:
const fetchIterator = {
    urls: [],
    delay: 500,
    setUrls(urls) {
        this.urls = urls;
    },
    setDelay(delay) {
        this.delay = delay;
    },
    [Symbol.asyncIterator]() {
        return {
            urls: this.urls,
            delay: this.delay,
            current: 0,
            last: this.urls.length - 1,

            async next() {
                let isSuccess = true;
                const currentDelay = !this.current ? 0 : this.delay;

                if (this.current > this.last) {
                    return {done: true};
                }

                const url = this.urls[this.current];

                await new Promise(resolve => setTimeout(async () => {
                    try {
                        await fetch(url);
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
    const result = {success: 0, error: 0};
    const urls = Array(100).fill('https://jsonplaceholder.typicode.com/posts');

    fetchIterator.setUrls(urls);

    for await (const isSuccess of fetchIterator) {
        const resultType = isSuccess ? 'success' : 'error';
        result[resultType]++;
    }

    console.log(`%cRESULT:`, 'color: green; font-size: small', result);
})();


// @2:
const urls = Array(100).fill('https://jsonplaceholder.typicode.com/posts');
const delay = 500;
let intervalId;
let success = 0;
let failed = 0;
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