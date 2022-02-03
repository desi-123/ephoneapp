const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'desalegnadmin@gmail.com',
    password: bcrypt.hashSync('123321', 15),
    isAdmin: true,
  },
  {
    name: 'Tesgi Tam',
    email: 'tsegi@gmail.com',
    password: bcrypt.hashSync('123321', 15),
  },
  {
    name: 'Desi wagaw',
    email: 'desi@gmail.com',
    password: bcrypt.hashSync('123321', 15),
  },
]

module.exports = users
