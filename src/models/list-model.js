// As listas serão compostas de:
// { id, name, itensQuantity, amountValue, status }

const userModel = require("./user-model")

let lists = []
let users = userModel.allUsers()

module.exports = {
    // Exibe todas as listas de um usuário
    showListsUserById: (id) => {
        const user = userModel.getUserById(id)
        return user.lists
    },

    // Verifica uma lista pelo ID
    showListById: (lists, listID) => {
        const list = lists.find(li => li.id === listID)

        return list
    },

    // Cria uma nova lista
    saveList: (name) => {
       
        const newList = {
            id: Math.floor(Math.random()*999999),
            name,
            itens: [],
            get itensQuantity () {
                return this.itens.reduce((sum, iten) => sum + iten.quantity, 0)
            }, 
            get amountValue() {
                return this.itens.reduce((sum, iten) => sum + iten.totalPrice, 0)
            },
            get status ()  { 
                const amountValue = this.amountValue
                const totalItensValue = this.itens.filter(it => it.price > 0)
                const totalItensQuantity = this.itens.filter(it => it.quantity > 0)

                if (this.itensQuantity === 0 && this.amountValue === 0)
                return this.status = "pendent";
                
                if (totalItensValue.length === this.itens.length && totalItensQuantity.length === this.itens.length) return this.status = "finished";

                if (amountValue > 0) return this.status = "current";
                if (amountValue === 0) return this.status = "pendent";   

                
            }
        }

    return newList

    },

    // Edita uma lista pelo ID
    editList: (list, newDates) => {
        const { name, itensQuantity, amountValue, status } = newDates
        

        if (name && typeof name === 'string') list.name = name;

        if (itensQuantity && typeof itensQuantity === 'number') list.itensQuantity = itensQuantity;

        if (amountValue && typeof amountValue === 'number') list.amountValue = amountValue;

        if (status && typeof status === 'string') list.status = status;

        return list
    },

    // Remove uma lista pelo ID
    removeList: (user,idList) => {
        return user.lists = lists.filter(li => li.id !== idList)
    }

}