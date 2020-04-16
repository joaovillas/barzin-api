
import dotenv from 'dotenv/';
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    'MONGODB_HOST': process.env.MONGODB_HOST,
    'MONGODB_USERNAME': process.env.MONGODB_USERNAME,
    'MONGODB_PASSWORD': process.env.MONGODB_PASSWORD,
    'JWT_SECRET': process.env.JWT_SECRET,  
}