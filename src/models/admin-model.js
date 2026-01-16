const userModel = require("./user-model")

//modos de administrador
module.exports = {
    //Cria um novo usuário admin
    saveNewAdmin: (name, nickName, password, role, lists = []) => {
        const users = userModel.allUsers()
        const existingUser = users.find(us => us.nickName === nickName)
        
        if (existingUser) return null

        const newUser = {
            name,
            nickName,
            password,
            role,
            lists
        }

        users.push(newUser)

        return newUser
    }, 
}