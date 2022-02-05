import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { formatPrice } from '../utils/helper'
import { single_phone } from '../redux/action/single_phone'

function SinglePhone({ history, match }) {
  const dispatch = useDispatch()
  const { ephone, loading, error } = useSelector((state) => state.single_phone)

  const [amount, setAmount] = useState(1)

  useEffect(() => {
    dispatch(single_phone(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?amount=${amount}`)
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <section className="ephone-details">
      <div className="ephone-detail">
        <img src={ephone.image} alt="ephone" className="ephone__img" />
      </div>
      <div className="ephone__rating">
        <h2>{ephone.category}</h2>
        <h3>{formatPrice(ephone.price)}</h3>
        <p>{ephone.description}</p>
        <Rating value={ephone.rating} text={`${ephone.numReviews} reviews`} />
        <Link to="/">
          <button className="btn btn--go-back">go back</button>
        </Link>
      </div>
      <div className="cart">
        <div className="total">
          {ephone.countInStock > 0 ? (
            <div className="article">
              <h3>Number of Items</h3>
              <select
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              >
                {[...Array(ephone.countInStock).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
              <div className="add-to-cart">
                <button className="btn" onClick={addToCartHandler}>
                  add to cart
                </button>
              </div>
            </div>
          ) : (
            'Out of Stock'
          )}
        </div>
      </div>
    </section>
  )
}

export default SinglePhone
