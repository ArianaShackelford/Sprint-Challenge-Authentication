const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');

describe ('register and login', () => {
    
    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

  describe ('register with username and password', () => {
    beforeEach(async () => {
            await db('users').truncate();
        })

      it('should add user to database', () => {
          return request(server)
          .post('/api/auth/register')
          .send({
              username: 'ariana',
              password: 'devon'
          })
          .then(res => {
              expect(res.status).toBe(201)
          })
      })
  })

    describe('you cannot register if missing password', () => {
        it('should return error', () => {
        
        return request(server)
          .post('/api/auth/register')
          .send({
              username: 'ariana'
          })
          .then(res => {
              expect(res.status).toBe(500)
          })
        })
    })
   
   describe('logging in and getting a token', () => {
       it('should create a token', () => {
           return request(server)
           .post('/api/auth/login')
           .send({
                username: 'ariana',
                password: 'devon'
           })
           .then(res => {
               expect(res.body.token).toBeTruthy()
           })
       })
   })

   describe('logging in with incorrect credentials', () => {
    it('res status to be 404', () => {
        return request(server)
        .post('/api/auth/login')
        .send({
             username: 'ariana',
             password: 'soienn'
        })
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})
})

///tests for GET request for jokes in jokes.test.js .... I could probably have done them all in the same folder.