import { Router } from 'express';
import models from '../src/models';

const { User } = models;

const router = new Router();

router.get('/gamelobby',async (req, res) => {
  try {
  	const user = await User.findById(req.session.loggedInUserId);
  	res.json(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
