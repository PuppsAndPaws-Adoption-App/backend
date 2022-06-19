const {Dog} = require('./dog');
const {sequelize} = require('../db');

describe('Dog Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a Dog', async() => {
		const testDog = await Dog.create({name : 'Snowflake'})
		expect(testDog.name).toBe('Snowflake')
	})


})
