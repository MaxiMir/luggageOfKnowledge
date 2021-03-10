// ДО ES6:
function Server(name, ip) {
    this.name = name;
    this.ip = ip;
}

Server.prototype.getUrl = function () {
    return `https://${this.ip}:80`;
}

const aws = new Server('AWS German', '82.21.21.32');
console.log(aws.getUrl()); // => https://82.21.21.32:80

// ES6:
class Server {
    constructor(name, ip) {
        this.name = name;
        this.ip = ip;
    }

    getUrl() {
        return `https://${this.ip}:80`;
    }
}