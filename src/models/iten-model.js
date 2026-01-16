// Os itens terão o seguinte formato:

const userModel = require("./user-model")
const listModel = require("./list-model")

// { id, nameIten, quantityIten, valueIten, amountValue }
let itens = []

module.exports = {
    showItensListUser: (userId, listId) => {
        const user = userModel.getUserById(userId)
        const list = user.lists.findIndex(li => li.id === listId)

        return user.lists[list].itens
    },

    createItem: (list, name, mark, quantity, price) => {
        const newIten = {
            id: Math.floor(Math.random()*9999), 
            name,
            mark,
            quantity,
            price,
            get totalPrice () {
                return this.quantity * this.price
            } 
        }
        list.itens.push(newIten)

        return newIten

    },

    saveItenInList (idUser, idList, iten) {
        const user = userModel.getUserById(idUser)
        const list = user.lists.findIndex(li => li.id ===idList)

        user.lists[list].itens.push(iten)
        return iten
    },

    editItem: (iten, updatedValues) => {
        const { name, mark, quantity, price } = updatedValues

        if (name && typeof name === 'string') iten.name = name;
        if (mark && typeof mark === 'string') iten.mark = mark;
        if (quantity && typeof quantity === 'number' || quantity === 0) iten.quantity = quantity;
        if (price && typeof price === 'number' || price === 0) iten.price = price; 

        return iten
    },

    removeItem: (idUser, idList, idIten) => {
        const user = userModel.getUserById(idUser)
        const listIndex = user.lists.findIndex(li => li.id === idList)

        return user.lists[listIndex].itens = user.lists[listIndex].itens.filter(it => it.id !== idIten)
    }
}