const assert = require('assert');
const supertest = require('supertest');
const sinon = require('sinon');
const app = require('../app');
const User = require('../models/User');

describe('Router Test', () => {
    let findOneStub;
    let saveStub;

    beforeEach(() => {
        //stubber mongoose model
        findOneStub = sinon.stub(User, 'findOne');
        saveStub = sinon.stub(User.prototype, 'save');
    });

    afterEach(() => {
        //restore mongoose model
        findOneStub.restore();
        saveStub.restore();
    });

    it('POST /users/register', async () => {
        //Simuler qu'auncun utilisateur n'existe
        findOneStub.resolves(null);

        //Simuler la sauvegarde de l'utilisateur
        saveStub.resolves({
            username: 'John Doe',
            email: 'john@example.com',
            password: 'hashedpassword'
        });

    })

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

