const assert = require('assert');
const supertest = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Post = require('../models/Post');

describe('Posts Router Test', () => {
    let saveStub;
    let findOneStub;
    let jwtSignStub;
    let jwtVerifyStub;

    beforeEach(() => {
        saveStub = sinon.stub(Post.prototype, 'save');
        findOneStub = sinon.stub(Post, 'findOne');
        jwtSignStub = sinon.stub(jwt, 'sign');
        jwtVerifyStub = sinon.stub(jwt, 'verify');
    });

    afterEach(() => {
        saveStub.restore();
        findOneStub.restore();
        jwtSignStub.restore();
        jwtVerifyStub.restore();
    });

    it('POST /posts - should create a new post', async () => {
        //Simuler la sauvegarde du post
        saveStub.resolves({
            _id: 5,
            title: 'Test Title',
            content: 'This is a test content for test post.',
            author: 1,
            tags: ['tag1', 'tag2']
        });

        //Simuler la génération du JWT pour l'authentification
        const fakeToken = 'fake-jwt-token';
        jwtSignStub.returns(fakeToken);

        console.log('Fake token:', fakeToken);

        // Simuler la vérification du JWT
        jwtVerifyStub.callsFake((token, secret, callback) => {
            console.log('JWT verify called with:', token, secret, callback);
            callback(null, { userId: '1', role: 'user' });
        });

        console.log('JWT before request:', fakeToken);

        await supertest(app)
            .post('/posts')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send({
                title: 'Test Title',
                content: 'This is a test content for test post.',
                author: 1,
                tags: ['tag1', 'tag2']
            })
            .expect(201)
            .then(response => {
                console.log('Response body:', response.body);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.message, 'Post enregistré !');
            });
    });

    it('GET /posts/:id - should get one post by id', async function () {
        this.timeout(5000);
        console.log('Début du test GET /posts/:id');
        //Simuler qu'un post existe
        findOneStub.resolves({
            _id: 5,
            title: 'Test Title',
            content: 'This is a test content for test post.',
            author: 1,
            tags: ['tag1', 'tag2']
        });

        console.log('findOneStub configuré');

        //Simuler la génération du JWT
        const fakeToken = 'fake-jwt-token';
        jwtSignStub.returns(fakeToken);

        console.log('JWT généré:', fakeToken);

        // Simuler la vérification du JWT avec le rôle "user"
        jwtVerifyStub.callsFake((token, secret, callback) => {
            console.log('JWT verify appelé avec:', token, secret);
            callback(null, { userId: '1', role: 'user' });
        });

        console.log('JWT verify configuré');

        await supertest(app)
            .get('/posts/5')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(200)
            .then(response => {
                console.log('Response body:', response.body);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.title, 'Test Title');
                assert.equal(response.body.content, 'This is a test content for test post.');
                assert.deepEqual(response.body.tags, ['tag1', 'tag2']);
            })
            .catch(error => {
                console.error('Error dans la requête supertest:', error);
                throw error;
            });

        console.log('Fin du test GET /posts/:id');
    });

    it('PUT /posts/:id - should update a post', async function () {
        this.timeout(5000);
        //Simuler la mise à jour du post
        findOneStub.resolves({
            _id: 5,
            title: 'Test Title',
            content: 'This is a test content for test post.',
            author: 1,
            tags: ['tag1', 'tag2']
        });

        //Simuler la génération du JWT
        const fakeToken = 'fake-jwt-token';
        jwtSignStub.returns(fakeToken);

        // Simuler la vérification du JWT avec le rôle "user"
        jwtVerifyStub.callsFake((token, secret, callback) => {
            console.log('JWT verify appelé avec:', token, secret);
            callback(null, { userId: '1', role: 'user' });
        });

        await supertest(app)
            .put('/posts/5')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send({ title: 'Updated Title', content: 'Updated content', tags: ['tag1', 'tag2'] })
            .expect(200)
            .then(response => {
                console.log('Response body:', response.body);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.message, 'Post modifié !');
            })
            .catch(err => {
                console.error('Erreur dans la requête supertest:', err);
                throw err;
            });
    });

    it('DELETE /posts/:id - should delete a post', async function () {
        this.timeout(5000);
        //Simuler la suppression du post
        findOneStub.resolves({
            _id: 5,
            title: 'Test Title',
            content: 'This is a test content for test post.',
            author: 1,
            tags: ['tag1', 'tag2']
        });

        //Simuler la génération du JWT
        const fakeToken = 'fake-jwt-token';
        jwtSignStub.returns(fakeToken);

        // Simuler la vérification du JWT avec le rôle "user"
        jwtVerifyStub.callsFake((token, secret, callback) => {
            console.log('JWT verify appelé avec:', token, secret);
            callback(null, { userId: '1', role: 'user' });
        });

        await supertest(app)
            .delete('/posts/5')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(200)
            .then(response => {
                console.log('Response body:', response.body);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.message, 'Post supprimé !');
            });
    });
})