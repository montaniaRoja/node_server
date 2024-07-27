const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).send({ message: 'No autorizado' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    try {
        const usuario = await Usuario.findOne({ where: { username } });

        if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
            return res.status(401).send({ message: 'No autorizado' });
        }

        req.user = usuario;
        next();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
