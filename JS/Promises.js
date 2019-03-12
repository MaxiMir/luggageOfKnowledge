/****** PROMISES ******/

// Promise - предоставляет удобный способ организации асинхронного кода.

/** СТАТУСЫ:
 * pending - ожидание
 * resolved - исполнено
 * rejected - отклонено
 */

const willGift = new Promise(
    (resolve, reject) => {
        let win = Math.random().toFixed(1);

        if (win > 0.5)
            resolve('Win!');
        else
            reject('Lost!');
    }
);

const writeOnFb = () => Promise.resolve('I Win!');
// <-> new Promise((resolve, reject) => resolve('I Win!'))

const buyTicket = () => {
    console.log('buy ticket');
    willGift
        //.then(writeOnFb) // можно использовать несколько then
        .then(result => console.log(result)) // произойдет в случае успеха (в result попадет Win!)
        .catch(error => console.log(error)); // произойдет в случае неуспеха (в result попадет Lost!)
    console.log('sleep');
};

buyTicket(); // !асинхронность =>
// buy ticket
// sleep
// Win!


