const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const statusController = require('../api').status;
const chatController = require('../api').chat;
const verifyJwtTokenController = require('../api').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup',
		[verifySignUpController.checkDuplicateUserNameOrEmail,
			verifySignUpController.checkRolesExisted
		],
		verifySignController.signup);

	app.post('/api/auth/signin', verifySignController.signin);
}