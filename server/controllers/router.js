const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/register', controller.newUser);
router.post('/login', controller.loginUser);
router.post('/newSchool', controller.newSchool);
router.get('/getSchool/:id', controller.getSchool);
router.post('/newClass', controller.newClass);
router.get('/getClassesList/:id', controller.getClassesList);
router.post('/newStudent', controller.newStudent);

// router.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

module.exports = router;
