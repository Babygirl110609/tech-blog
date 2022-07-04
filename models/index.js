const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'comment_id',
});
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'post_id',
});
module.exports = { User, Post, Comment };
