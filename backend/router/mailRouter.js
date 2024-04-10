const {Router} = require('express');
const router = Router();

const mailController = require('../controller/mailController');
const userauthentication = require('../middleware/auth')

router.post('/sent-mail', userauthentication.authenticate,mailController.addmail);
router.get('/get-mail', userauthentication.authenticate,mailController.receivedmail );
router.put('/mark-read/:id', mailController.markedmail );
router.delete('/deletemail/:id', mailController.deletemail );
router.get('/get-sent-mail', userauthentication.authenticate,mailController.sentmail );

module.exports = router;
