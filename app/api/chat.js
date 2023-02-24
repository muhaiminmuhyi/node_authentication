const Chat = require('../models').Chat;

module.exports = {
    getById(req, res) {
        return Chat
        .findByPk(req.params.id, {
            include: [],
        })
        .then((doc) => {
            if (!doc) {
                return res.status(404).send({
                    status_response: 'Not Found',
                    errors: 'Chat Not Found'
                });
            }
            const chat = {
                status_response: 'OK',
                status: doc,
                errors: null
            }
            return res.status(200).send(chat);
        })
        .catch((err) => {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: err
            });
        });
    },

    add(req, res) {
        return Chat
        .create({
            id_user: req.userId,
            chatText: req.body.msg,
            toId_user: req.body.toIduser
        })
        .then((doc) => {
            const chat = {
                status_response: 'Chat has been send!',
                status: doc,
                errors: null,
            }
            return res.status(201).send(chat);
        })
        .catch((err) => {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: err
            });
        });
    },

    delete(req, res) {
        return Chat
        .findByPk(req.params.id)
        .then(chat => {
            if (!chat) {
                return res.status(400).send({
                    status_response: 'Bad Request',
                    errors: 'Chat Not Found',
                });
            }

            if (chat.id_user !== req.userId) {
                return res.status(403).send({
                    status_response: "Bad Request",
                    errors: "Different User Id"
                });
            }

            return chat
            .destroy()
            .then(() => res.status(204).send({
                status_response: 'No Content',
                errors: null
            }))
            .catch((err) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: err
                });
            });
        })
        .catch((err) => {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: err
            })
        })
    }
}