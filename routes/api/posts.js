const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @DESC      CREATE A NEW POST
// @ROUTE     POST /api/posts
// @ACCESS    PRIVATE
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @DESC      GET ALL POSTS
// @ROUTE     GET /api/posts
// @ACCESS    Private
router.get('/', auth, async (req, res) => {
  try {
    posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      GET A POST BY IT'S ID
// @ROUTE     GET /api/posts/:id
// @ACCESS    PRIVATE
router.get('/:id', auth, async (req, res) => {
  try {
    post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      DELETE A POST
// @ROUTE     DELETE /api/posts/:id
// @ACCESS    PRIVATE
router.delete('/:id', auth, async (req, res) => {
  try {
    post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // CHECK IF USER IS AUTHORIZED TO DELETE
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json('Post removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      LIKE A POST
// @ROUTE     PUT /api/posts/like/:id
// @ACCESS    PRIVATE
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // CHECK IF THE POST HAS ALREADY BEEN LIKED
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have already liked this post' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      UNLIKE A POST
// @ROUTE     PUT /api/posts/unlike/:id
// @ACCESS    PRIVATE
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // CHECK IF THE POST HAS NOT BEEN LIKED
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have not liked this post yet' });
    }

    // REMOVE THE LIKE
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
