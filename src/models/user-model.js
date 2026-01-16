// Os users não podem ter acesso a outros usuários, e somente ter acesso ao seu próprio perfil

let users = [ 
    {
        id: 1,
        name: 'Paulo Catarin',
        nickName: 'pcatarin',
        password: '123456',
        role: 'admin',
        lists: [
            {
                id: 1,
                name: 'junho',
                itens: [
                   { 
                        id: 1, 
                        name: 'arroz', 
                        mark: 'tarumã',
                        quantity: 2, 
                        price: 10.00, 
                        get totalPrice () {
                           return this.quantity * this.price
                        } 
                    }
                ], 
                get itensQuantity () {
                    return this.itens.reduce((sum, iten) => sum + iten.quantity, 0)
                }, 
                get amountValue() {
                    return this.itens.reduce((sum, item) => sum + item.totalPrice, 0)
                }, 
                get status ()  { 
                    const amountValue = this.amountValue
                    const totalItensValue = this.itens.filter(it => it.price > 0)
                    const totalItensQuantity = this.itens.filter(it => it.quantity > 0)

                    if (this.itensQuantity && this.amountValue === 0)
                    return this.status = "pendent";

                    if (totalItensValue.length === this.itens.length && totalItensQuantity.length === this.itens.length) return this.status = "finished";

                    if (amountValue === 0) return this.status = "pendent";

                    if (amountValue > 0) return this.status = "current";

                }
            }
        ]
    }
]


module.exports = {  
    // Mostra todos os usuários
    allUsers: () =>  users,

    // Cria Novo Usuário
    save: (name, nickName, password, lists = []) => {
        
        const newUser = {
            id: Math.floor(Math.random()*9999),
            name,
            nickName,
            password,
            role: 'standard',
            lists: lists
        }

        users.push(newUser)
        return newUser
    },

    // Obtem Usuário pelo ID
    getUserById: (id) => {
        const userId = users.find(user => user.id === id)

        return userId
    },

    // Obtem usuário pelo nickName
    getUserByNickName: (nickName) => {
        const users = this.allUsers()

        const checkNickName = users.find(us => us.nickName === nickName)
        if (!checkNickName) return null

        return checkNickName
    },

    // Atualiza Usuário
    updateUser: (id, userAtualizado) => {
        const user = users.find(iten => iten.id === id)
        const { name, nickName } = userAtualizado

        if (name) user.name = name
        if (nickName) user.nickName = nickName
        
        return user
    },

    // Deleta usuário pelo ID
    deleteUser: (id) => {
       // Usando Filter
       return users =  users.filter(iten => iten.id !== id)
    }
}