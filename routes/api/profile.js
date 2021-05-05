const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const normalize = require('normalize-url');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @DESC      GET MY CURRENT USERS PROFILE
// @ROUTE     GET /api/profile/me
// @ACCESS    PRIVATE
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      CREATE OR UPDATE A USER PROFILE
// @ROUTE     POST /api/profile
// @ACCESS    PRIVATE
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // SPREAD THE REST OF THE FIELDS SO WE DON'T HAVE TO CHECK
      ...rest
    } = req.body;

    // BUILD A PROFILE
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest,
    };

    // BUILD SOCIAL FIELDS
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // USE NORMALIZE TO ENSURE THAT A VALID URL IS RECIEVED
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, { forceHttp: true });
      }
    }
    // ADD TO PROFILE FIELDS
    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @DESC      GET ALL PROFILES
// @ROUTE     GET /api/profile
// @ACCESS    PUBLIC
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      GET USERS PROFILE BY ID
// @ROUTE     GET /api/profile/user/:user_id
// @ACCESS    PUBLIC
router.get('/user/:user_id', checkObjectId('user_id'), async (req, res) => {
  const id = req.params.user_id;
  try {
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      DELETE PROFILE, USER, AND POSTS
// @ROUTE     DELETE /api/profile
// @ACCESS    PRIVATE
router.delete('/', auth, async (req, res) => {
  const user = req.user.id;
  try {
    // REMOVE USERS POSTS
    // REMOVE PROFILE
    // REMOVE USER
    await Promise.all([
      Profile.findOneAndRemove({ user }),
      User.findOneAndRemove({ _id: user }),
    ]);
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      ADD PROFILE EXPERIENCE
// @ROUTE     PUT /api/profile/experience
// @ACCESS    PRIVATE
router.put(
  '/experience',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @DESC      DELETE PROFILE EXPERIENCE
// @ROUTE     DELETE /api/profile/experience/:exp_id
// @ACCESS    PRIVATE
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      ADD PROFILE EDUCATION
// @ROUTE     PUT /api/profile/education
// @ACCESS    PRIVATE
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @DESC      DELETE PROFILE EDUCATION
// @ROUTE     DELETE /api/profile/education/:edu_id
// @ACCESS    PRIVATE
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @DESC      GET A USERS REPOS FROM GITHUB
// @ROUTE     GET /api/profile/github/:username
// @ACCESS    PUBLIC
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });

    return res.json(gitHubResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
