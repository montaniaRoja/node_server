const { Usuario } = require('../models');
const bcrypt = require("bcryptjs");

module.exports = {
    async create(req, res){
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).send({ message: 'Todos los campos son requeridos' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const usuarioCreado = await Usuario.create({
                username,
                password: hash
            });

            if (!usuarioCreado) {
                return res.status(404).send({ message: 'Error al crear el usuario' });
            }

            return res.status(200).send({ message: 'Usuario creado exitosamente' });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
};
