const db = require('../database/dbConfig.js');
const jokes = require('./jokes-router.js');
const request = require('supertest');


describe('jokes', () => {
    it('runs tests', () => {
        expect(true).toBe(true);
    })

    describe('Get /jokes', () => {
        it('return status 200', () => {
            return request(jokes).get('/api/jokes')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    } )
})