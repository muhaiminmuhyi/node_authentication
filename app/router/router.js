const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;

module.exports = function (app) {

	//User Auth
	app.post('/signup',
		[verifySignUpController.checkDuplicateUserNameOrEmail],
		verifySignController.signup);

	app.post('/signin', verifySignController.signin);
}