const bcrypt = require('bcrypt')

async function encrypt (password) {
    return await bcrypt.hash(password, 10)
}



 

module.exports = encrypt