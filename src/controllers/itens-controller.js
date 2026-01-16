//Aqui faremos todo controle dos itens de uma lista exibição, adicionar, editar ou excluir, usando os métodos do itens model

const itenModel = require("../models/iten-model")
const listModel = require("../models/list-model")
const userModel = require("../models/user-model")

module.exports = {
    // GET /users/:idUser/lists/:idList/itens
    getItensList: (req, res) => {
        const{ idUser, idList } = req.params

        const itens = itenModel.showItensListUser(+idUser, +idList)

        res.status(200).json(itens)
    },

    // POST /users/:idUser/lists/:idList/itens
    addItenInList: (req, res) => {
        const { idUser, idList } = req.params
        let { name, mark, quantity, price } = req.body

        const user = userModel.getUserById(+idUser)
        if(!user) res.status(404).json({ message: 'User not found'})
        const lists = user.lists
        if(!lists) res.status(404).json({ message: 'List not found'})
        const list = listModel.showListById(lists, +idList)
        if (!price || price === 0) price = 0
        if (!quantity) quantity = 0 

        const newIten = itenModel.createItem(list,name, mark, quantity, price)
        //itenModel.saveItenInList(+idUser, +idList, newIten)

        res.status(201).json(newIten)
    },

    // PUT /users/:idUser/lists/:idList/itens/:idIten
    updateIten: (req, res) => {
        const { idUser, idList, idIten } = req.params
        const { name, mark, quantity, price } = req.body

        
        
        const user = userModel.getUserById(+idUser)
        if (!user) res.status(404).json({ message: 'User not Found!' })
            
        const list = user.lists.find(li => li.id === +idList)
        if (!list) res.status(404).json({ message: 'List not Found!'})
                
        const iten = list.itens.find(it => it.id === +idIten)
        if (!iten) res.status(404).json({ message: 'Iten not Found!'})
                    
        const updateIten = {}
        if (name) updateIten.name = name
        if (mark) updateIten.mark = mark
        if (quantity || quantity === 0) updateIten.quantity = quantity
        if (price || price === 0) updateIten.price = price

        const updatedItens = itenModel.editItem(iten, updateIten)

        res.status(200).json(updatedItens) 
    },

    // DELETE /users/:idUser/lists/:idList/itens/:idIten
    deleteIten: (req, res) => {
        const { idUser, idList, idIten } = req.params

        const user = userModel.getUserById(+idUser)
        if (!user) res.status(404).json({ message: 'User Not Found!'})

        const listIndex = user.lists.findIndex(li => li.id === +idList)
        if (listIndex === -1) res.status(404).json({ message: 'List not Found!'})

        
        itenModel.removeItem(+idUser, +idList, +idIten)

        res.status(200).json(user.lists[listIndex])
    }
}