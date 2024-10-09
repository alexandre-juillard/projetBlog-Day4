const assert = require('assert');
const Post = require('../models/Post'); // Assurez-vous que le modèle Post est correctement importé

describe('Post Model', () => {
    it('should create a new post with the correct properties', () => {
        const chai = import('chai');

        const req = {
            auth: {
                userId: '12345'
            },
            body: {
                title: 'Test Title',
                content: 'Test Content',
                tags: ['tag1', 'tag2']
            }
        };

        const { title, content, tags } = req.body;

        // Créer un nouvel objet Post
        const post = new Post({
            title: title,
            content: content,
            tags: tags
        });

        // Vérifier que les propriétés sont correctement définies
        assert.strictEqual(post.title, 'Test Title');
        assert.strictEqual(post.content, 'Test Content');
        assert.deepStrictEqual(post.tags, ['tag1', 'tag2']);
    });

    it('should get all posts', () => {
        Post.find()
            .then(posts => {
                assert.strictEqual(posts.length, 0);
            });
    });

    it('should get one post', () => {
        Post.findOne({ _id: '12345' })
            .then(post => {
                assert.strictEqual(post, null);
            });
    });

    it('should update a post', () => {
        Post.updateOne({ _id: '12345' }, { title: 'Updated Title' });
        Post.findOne({ _id: '12345' })
            .then(post => {
                assert.strictEqual(post.title, 'Updated Title');
            });
    });

    it('should delete a post', () => {
        Post.deleteOne({ _id: '12345' });
        Post.findOne({ _id: '12345' })
            .then(post => {
                assert.strictEqual(post, null);
            });
    });
});