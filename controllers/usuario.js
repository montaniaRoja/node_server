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
    },
    async userLogin(req, res) {
        const { username, password } = req.params;
        if (!username || !password) {
            return res.status(400).send({ message: 'todos los campos son requeridos' });
        }
        try {
            const user = await Usuario.findOne({
                where: { username: username },
            });
            if (!user) {
                return res.status(404).send({ message: 'usuario no encontrado' });
            }
            const isMatch = await bcrypt.compare(req.params.password, user.password);
            if (!isMatch) {
                return res.status(401).send("Email o contraseña incorrecta!");
            } else {
                const payload = { id: user.id, nombre: user.username, password: user.password };
                return res.status(200).json({ user });
            }

        }catch(error) {
            console.log(error);
            return res.status(500).send("login: Hubo un error" + error);
    }
}
};
