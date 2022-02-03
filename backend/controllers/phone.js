const asyncHandler = require('../middleware/async')
const Phone = require('../models/Phone')
const ApiFeatures = require('../utils/apiFeatures')

const getPhones = (req, res, next) => {
  // const resPerPage = 4
  const ephoneCount = Phone.countDocuments()
  const apiFeatures = new ApiFeatures(Phone.find(), req.query).search().filter()
  // .pagination(resPerPage)
  apiFeatures.query
    .then((ephones) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(ephones)
    })
    .catch((err) => next(err))
}

const getPhone = asyncHandler(async (req, res, next) => {
  const ephone = await Phone.findById(req.params.id)

  if (ephone) {
    res.json(ephone)
  } else {
    res.status(404)
    throw new Error('ephone not found')
  }
})

const createPhones = asyncHandler(async (req, res, next) => {
  const ephone = new Phone({
    name: 'ephone name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdEphone = await ephone.save()
  res.status(201).json(createdEphone)
})

const updatePhone = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const ephone = await Phone.findById(req.params.id)

  if (ephone) {
    ephone.name = name
    ephone.price = price
    ephone.description = description
    ephone.image = image
    ephone.brand = brand
    ephone.category = category
    ephone.countInStock = countInStock

    const updatedEphone = await ephone.save()
    res.json(updatedEphone)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deletePhone = asyncHandler(async (req, res, next) => {
  const ephone = await Phone.findByIdAndDelete(req.params.id)
  if (ephone) {
    await ephone.remove()
    res.json({ message: 'phone removed' })
  } else {
    res.status(404)
    throw new Error('phone not found')
  }
})

module.exports = {
  getPhones,
  getPhone,
  createPhones,
  updatePhone,
  deletePhone,
}
