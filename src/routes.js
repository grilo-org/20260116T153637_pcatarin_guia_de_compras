const express = require('express')
const userController = require('./controllers/user-controller')
const listController = require('./controllers/list-controller')
const itensController = require('./controllers/itens-controller')
const authController = require('./controllers/auth-controller')

const router = express.Router()

//Rotas de Usuário
router.get('/users', userController.viewUsers)
router.post('/users', userController.newUser)
router.get('/users/id',userController.checkUserById)
router.put('/users/:id', userController.editUser)
router.delete('/users/:id', userController.removeUser)

//Rota para login
router.post('/users/login', authController.login)

//Rotas de Lista
router.get('/users/:idUser/lists', listController.getListsUser)
router.post('/users/:idUser/lists', listController.saveNewListUser)
router.put('/users/:idUser/lists/:idList',listController.updateList)
router.delete('/users/:idUser/lists/:idList',listController.deleteList)

//Rotas de Itens
router.get('/users/:idUser/lists/:idList/itens', itensController.getItensList)
router.post('/users/:idUser/lists/:idList/itens', itensController.addItenInList)
router.put('/users/:idUser/lists/:idList/itens/:idIten', itensController.updateIten)
router.delete('/users/:idUser/lists/:idList/itens/:idIten', itensController.deleteIten)

module.exports = router