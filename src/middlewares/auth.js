import jwt, { decode } from 'jsonwebtoken';
import keys from '../config/keys';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({error: 'No token Provided!'});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token Error!'});

    
    const [scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: 'Token Malformatted!'});
    }

    jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'invalid token'});
        req.user_id = decoded.params;
        next();
    });

}