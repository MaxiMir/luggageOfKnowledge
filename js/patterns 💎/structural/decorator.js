class Server {
	constructor(ip, port) {
		this.ip = ip;
		this.port = port;
	}

	get url() {
		return `https://${this.ip}:${this.port}`;
	}
}

function aws(server) { // декоратор
	server.isAWS = true;
	server.awsInfo = function () {
		return server.url;
	};

	return server;
}

function azure(server) { // декоратор
	server.isAzure = true;
	server.port += 500;

	return server;
}

const s1 = aws(new Server('12.34.56.78', '8080'));
console.log(s1.isAWS); // => true
console.log(s1.awsInfo()); // => https://12.34.56.78:8080

const s2 = azure(new Server('98.87.76.12', '1000'));
console.log(s2.isAzure); // => true
console.log(s2.url); // => https://98.87.76.12:1500
