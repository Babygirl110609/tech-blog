const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
               },
      ],
    });

    const galleries = dbPostData.map((Post) =>
      Post.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Post
// Use the custom middleware before allowing the user to access the Post
router.get('/Post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
         
        },
      ],
    });

    const Post = dbPostData.get({ plain: true });
    res.render('Post', { Post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Comment
// Use the custom middleware before allowing the user to access the Comment
router.get('/Comment/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);

    const Comment = dbCommentData.get({ plain: true });

    res.render('Comment', { Comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
