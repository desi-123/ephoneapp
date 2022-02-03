const colors = require('colors');
const dotenv = require('dotenv');
const Phone = require('./models/Phone');
const connectDB = require('./config/db')
const ephones = require('./data/ephones')
const users = require('../data/users');
const User = require('./models/User');



dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Phone.deleteMany()
    await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
    const samplePhone = ephones.map((ephone) => {
      return { ...ephone, user: adminUser }
    })

    await Phone.insertMany(samplePhone)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Phone.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
