const assert = require('assert');
const Comment = require('../models/Comment');

describe('Comment Test', () => {
    it('should create a new comment with the correct properties', () => {
        const req = {
            body: {
                content: 'Test Content'
            }
        };
        const { content } = req.body;
        const comment = new Comment({
            comment_text: content,
            post_id: '12345',
        });
        assert.strictEqual(comment.comment_text, 'Test Content');
    });

    it('should get all comments', () => {
        Comment.find()
            .then(comments => {
                assert.strictEqual(comments.length, 0);
            });
    });

    it('should get one comment', () => {
        Comment.findOne({ _id: '12345' })
            .then(comment => {
                assert.strictEqual(comment, null);
            });
    });

    it('should update a comment', () => {
        Comment.updateOne({ _id: '12345' }, { comment_text: 'Updated Content' });
        Comment.findOne({ _id: '12345' })
            .then(comment => {
                assert.strictEqual(comment.comment_text, 'Updated Content');
            });
    });

    it('should delete a comment', () => {
        Comment.deleteOne({ _id: '12345' });
        Comment.findOne({ _id: '12345' })
            .then(comment => {
                assert.strictEqual(comment, null);
            });
    });

});