const assert = require('assert');
const User = require('../models/User');

describe('User', () => {
    it('should create a new user with the correct properties', () => {
        const req = {
            body: {
                email: 'xelaj@test.com',
                username: 'xelaj',
                password: 'password'
            }
        };
        const { email, username, password } = req.body;
        const user = new User({
            email: email,
            username: username,
            password: password
        });
        assert.strictEqual(user.email, 'xelaj@test.com');
        assert.strictEqual(user.username, 'xelaj');
        assert.strictEqual(user.password, 'password');
    });

    it('should get all users', () => {
        User.find()
            .then(users => {
                assert.strictEqual(users.length, 0);
            });
    });

    it('should get one user', () => {
        User.findOne({ _id: '12345' })
            .then(user => {
                assert.strictEqual(user, null);
            });
    });

    it('should update a user', () => {
        User.updateOne({ _id: '12345' }, { email: 'newmail@test.com' });
        User.findOne({ _id: '12345' })
            .then(user => {
                assert.strictEqual(user.email, 'newmail@test.com');
            }
            );
    });

    it('should delete a user', () => {
        User.deleteOne({ _id: '12345' });
        User.findOne({ _id: '12345' })
            .then(user => {
                assert.strictEqual(user, null);
            });
    });
});