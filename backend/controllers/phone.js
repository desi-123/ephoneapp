const asyncHandler = require('../middleware/async')
const Phone = require('../models/Phone')

const getPhones = asyncHandler(async(req, res, next) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const ephones = await Phone.find({...keyword})

  res.json(ephones)

})

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

const createPhoneReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const ephone = await Phone.findById(req.params.id)

  if (ephone) {
    const alreadyReviewed = ephone.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('ePhone already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    ephone.reviews.push(review)

    ephone.numReviews = ephone.reviews.length

    ephone.rating =
      ephone.reviews.reduce((acc, item) => item.rating + acc, 0) /
      ephone.reviews.length

    await ephone.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('ephone not found')
  }
})

module.exports = {
  getPhones,
  getPhone,
  createPhones,
  updatePhone,
  deletePhone,
  createPhoneReview
}
