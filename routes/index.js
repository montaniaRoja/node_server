const userController = require('../controllers/usuario');
const personController = require('../controllers/persons');
const authMiddleware = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api', (_req, res) => res.status(200).send({
        message: 'Example project did not give you access to the API web services',
    }));

    app.post('/api/user/create', userController.create); // Corregido aquí
    app.get('/api/user/login/:username/:password', userController.userLogin);

    app.post('/api/person/create', authMiddleware,personController.create);
    app.get('/api/person/list', authMiddleware, personController.getAll);
    app.get('/api/person/:id',authMiddleware, personController.getById);
    app.put('/api/person/:id',authMiddleware, personController.update);
    app.delete('/api/person/:id',authMiddleware, personController.delete);
};
