const { req, res } = require('express')
const userModel = require('../models/user-model')
const encrypt = require('../utils/crypt')

module.exports = {
    // GET /users
    viewUsers: (req, res) => {
        const users = userModel.allUsers()
        //const authHeader = req.headers.authorization
        //console.log(authHeader)
        res.status(200).json(users)
    },

    // GET /users/id
    checkUserById: (req, res) => {
        const { id } = req.body

        const verifyUser = userModel.getUserById(id)

        if(!verifyUser) {
            res.status(404).json({ message: 'User not found'})
        }

        const { password:_, ...datas } = verifyUser

        res.status(200).json(verifyUser)
    },

    // POST /users
    newUser: async (req, res) => {
        const { name, nickName, password } = req.body
        const users = userModel.allUsers()
        
        if (typeof name !== 'string' || !name || name === '') return res.status(400).json({ message: 'Precisa de um Nome...'})
            
        if (typeof nickName !== 'string' || !nickName || nickName === '') return res.status(400).json({ message: 'Precisa de um Nickname...'})
        
        if (typeof password !== 'string' || !password || password === '') return res.status(400).json({ message: 'Precisa de uma senha...'})

        const existingUser = users.find(us => us.nickName === nickName)
        if (existingUser) return res.status(400).json({ message: 'Nickname its already in use!'})

        const hashPass = await encrypt(password)

        userModel.save(name, nickName, hashPass)
        console.log(hashPass)

        res.status(201).json({ message: `Usuário ${nickName} adicionado com sucesso!`})
    },

    // PUT /users/:id
    editUser: (req, res) => {
        const { id } = req.params
        const { name, nickName } = req.body
        const dadosAtualizados = { name, nickName }

        let findUser = userModel.getUserById(+id)

        if(!findUser) {
            res.status(404).json({ message: 'User not found' })
        }

        findUser = userModel.updateUser(+id, dadosAtualizados)

        
        
        res.status(201).json(findUser) 

    },

    // DELETE /users/:id
    removeUser: (req, res) => {
        const { id } = req.params

        const userExisting = userModel.getUserById(+id)
        if (!userExisting) {
            return res.status(404).json({ message: 'User not found!' })
        }
        const users = userModel.deleteUser(+id)
        res.status(200).json({ message: `Usuário ${userExisting.nickName} removido com sucesso!`})
    }
}