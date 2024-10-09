const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');

describe('Router Test', () => {
    it('POST /users/register', async () => {
        await supertest(app)
            .post('/users/register')
            .send({ username: 'Alai Deloin', email: 'alai@example.com', password: 'azerty123' })
            .expect(201)
            .then(response => {
                console.log('Response body:', response.body.username, response.body.email, response.body.password);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.user.username, 'Alai Deloin');
                assert.equal(response.body.user.email, 'alai@example.com');
            });
    });

    // it('GET /users', async () => {
    //     await supertest(app)
    //         .get('/users')
    //         .expect(200)
    //         .then(response => {
    //             assert.equal(typeof response.body, 'object');
    //             assert.equal(response.body.length, 3);
    //         });
    // });

    // it('GET /users/:id', async () => {
    //     await supertest(app)

    //         .get('/users/4')
    //         .expect(200)
    //         .then(response => {
    //             assert.equal(typeof response.body, 'object');
    //             assert.equal(response.body.id, 1);
    //         });
    // });

    // it('PUT /users/:id', async () => {
    //     await supertest(app)
    //         .put('/users/4')
    //         .send({ name: 'Jane Doe' })
    //         .expect(200)
    //         .then(response => {
    //             assert.equal(typeof response.body, 'object');
    //             assert.equal(response.body.id, 4);
    //             assert.equal(response.body.name, 'Jane Doe');
    //         });
    // });

    // it('DELETE /users/:id', async () => {
    //     await supertest(app)
    //         .delete('/users/4')
    //         .expect(204);
    // });
});

