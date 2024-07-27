const { Person } = require('../models');

module.exports = {
    async create(req, res) {
        const { personname, address } = req.body;

        try {
            if (!personname || !address) {
                return res.status(400).send({ message: 'Todos los campos son requeridos' });
            }

            const personCreated = await Person.create({
                personname,
                address
            });

            return res.status(201).send(personCreated);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const persons = await Person.findAll();
            return res.status(200).send(persons);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async getById(req, res) {
        const { id } = req.params;

        try {
            const person = await Person.findByPk(id);

            if (!person) {
                return res.status(404).send({ message: 'Persona no encontrada' });
            }

            return res.status(200).send(person);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { personname, address } = req.body;

        try {
            const person = await Person.findByPk(id);

            if (!person) {
                return res.status(404).send({ message: 'Persona no encontrada' });
            }

            person.personname = personname || person.personname;
            person.address = address || person.address;

            await person.save();

            return res.status(200).send(person);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const person = await Person.findByPk(id);

            if (!person) {
                return res.status(404).send({ message: 'Persona no encontrada' });
            }

            await person.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
};
