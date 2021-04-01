const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
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
router.get('/user/:user_id', async (req, res) => {
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
module.exports = router;
