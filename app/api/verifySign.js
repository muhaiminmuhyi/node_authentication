const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User
const config = require('../config/configRoles');

module.exports = {
	signup(req, res) {
		return User
			.create({
				name_user: req.body.name_user,
				id: req.body.id,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8)
			}).then(() => {
				const status = {
					status_response: 'Created',
					status: "OK"
				}
				return res.status(201).send(status);
			}).catch(err => {
				res.status(500).send({
					auth: false,
					id: req.body.id,
					message: "Error",
					errors: err
				});
			})
	},

	signin(req, res) {
		return User
			.findOne({
				where: {
					id: req.body.id
				}
			}).then(user => {
				if (!user) {
					return res.status(404).send({
						auth: false,
						id: req.body.id,
						accessToken: null,
						message: "Error",
						errors: "User Not Found."
					});
				}

				var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
				if (!passwordIsValid) {
					return res.status(401).send({
						auth: false,
						id: req.body.id,
						accessToken: null,
						message: "Error",
						errors: "Invalid Password!"
					});
				}

				var token = 'Bearer ' + jwt.sign({
					id: user.id
				}, config.secret, {
					expiresIn: 86400 //24h expired
				});

				res.status(200).send({
					auth: true,
					id: req.body.id,
					accessToken: token,
					message: "Welcome to apps !",
					errors: null
				});
			}).catch(err => {
				res.status(500).send({
					auth: false,
					id: req.body.id,
					accessToken: null,
					message: "Error",
					errors: err
				});
			});
	}
}