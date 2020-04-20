import { Router } from 'express';
import User from '../schemas/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';

import auth from '../middlewares/auth';

const route = Router();

function generateToken(params = {}) {
    return jwt.sign({ params }, keys.JWT_SECRET, { expiresIn: 86400 });
}


route.post('/register', async (req, res) => {
    try {

        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).send({ error: 'Email já cadastrado!' });
        }

        if (await User.findOne({ phone: req.body.phone })) {
            return res.status(400).send({ error: 'Telefone já cadastrado!' })
        }

        const user = await User.create(req.body);
        return res.status(201).send({ user, token: generateToken(user._id) });
    } catch (exception) {
        // Treat error and send to discord
        console.log(exception)
        res.status(400).send({ error: exception });
    }
});

route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ 'error': 'Erro no email ou senha' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Erro no email ou senha' });
        }


        return res.send({ user, token: generateToken(user._id) });

    } catch (exception) {
        res.send(500).send({ error: 'erro desconhecido, avise ao suporte!' });
    }
});

route.get('/', auth, async (req, res) => {  
    const user = await User.findOne({ _id: req.user_id });
    res.send({ user });
});

module.exports = route;