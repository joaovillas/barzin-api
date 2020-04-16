import auth from './auth';
import express from 'express';

const router = express();

router.use('/user', auth);

module.exports = router;