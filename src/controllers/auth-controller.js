const userModel = require("../models/user-model")
const token = require('jsonwebtoken')
const secrets = require("../config/enviroment")

module.exports = {
    register: (req, res) => {
        const { name, nickName, password } = req.body

        if (typeof name !== 'string' || typeof nickName !== 'string' || typeof password !== 'string') return res.status(400).json({ message: "Invalid Fields!"})
        
        const userExisting = userModel.getUserByNickName(nickName)
        if (userExisting) return res.status(400).json({ message: "Nickname already in use!"})

        const allUsers = userModel.allUsers()
        const newUser = userModel.save(name, nickName, password)
        allUsers.push(newUser)
        res.status(201).json(newUser)
    },

    login: (req, res) => {
        const { nickName, password } = req.body
        
        if (typeof nickName !== 'string' || typeof password !== 'string') return res.status(400).json({ message: "Invalid Fields!"})

        const allUsers = userModel.allUsers()
        const loginUser = allUsers.find(us => us.nickName === nickName)

        if (!loginUser || nickName !== loginUser.nickName || password !== loginUser.password) return res.status(400).json({ message: 'Nickname or Password inválid!'})
        
        const payLoad = { name: loginUser.name, nickName: loginUser.nickName }
        const tokenAuth = token.sign(payLoad, secrets.SECRET_KEY, { expiresIn: '5h' })
        const authHeader = req.headers

        console.log(authHeader)
        res.json({ tokenAuth })
    }

}