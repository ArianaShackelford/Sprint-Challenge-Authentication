const db = require('../database/dbConfig.js');
const Users = require('./auth-router.js');


describe ('register and login', () => {
    beforeEach(async () => {
        await db('users').truncate;
    });

    describe('insert()', () => {
        it('should insert a new user into the database', async () => {
            await Users.insert({name: 'ariana'});
            await Users.insert({name: 'alec'});

            const users = await db('users');

            expect(users).toHaveLength(2);
        });
    });
})