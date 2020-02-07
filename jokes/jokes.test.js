// const db = require('../database/dbConfig.js');
const jokes = require('../api/server.js');
const request = require('supertest');


describe('jokes', () => {
    it('runs tests', () => {
        expect(true).toBe(true);
    })

    describe('GET /jokes', () => {
        it('return status 200', async () => {
            const res = await request(jokes)
                .get('/api/auth/login')
                .send({
                    username: 'alec',
                    password: 'oren'
                });
            const users = await request(jokes)
                .get('/api/jokes')
                .set('token',[res.body.token])
                expect(users.token)
        })

        it('should return JSON', async () => {
            const res = await request(jokes).get('/api/jokes')
            expect(res.type).toMatch(/json/i);
        })
    } )
})