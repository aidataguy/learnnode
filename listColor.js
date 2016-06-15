var faker = require('faker');

console.log('Hi Welcome to mein Shoppe')
for (var i = 0; i < 10; i++) {
	console.log(faker.commerce.productName() + " - " + faker.commerce.color() + " - " + faker.commerce.price());
}

