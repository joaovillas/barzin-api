import mongoose from 'mongoose';
import keys from '../config/keys';

mongoose.connect(`mongodb+srv://${keys.MONGODB_USERNAME}:${keys.MONGODB_PASSWORD}${keys.MONGODB_HOST}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
module.exports = mongoose;