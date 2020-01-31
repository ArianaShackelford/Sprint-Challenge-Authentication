const db = require('../database/dbConfig.js');
const Users = require('./authModel.js');


describe ('register and login', () => {
    
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('insert() is working for registering', () => {

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should insert a new user into the database', async () => {
            await Users.insert({username: 'ariana', password: 'devon'});
            await Users.insert({username: 'alec', password: 'oren'});

            const users = await db('users');

            expect(users).toHaveLength(2);
        });
    })
    describe('findBy() is working for login', () => {
        it('should find user from username', async () => {
           const user = await Users.findBy({username: 'ariana'});

           expect.arrayContaining(user);
        })
    })
   
})