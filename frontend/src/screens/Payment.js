import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../redux/action/cart_item'

const Payment = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const { shippingAddress } = useSelector((state) => state.cart)

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeOrder')
  }

  return (
    <section className="form">
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
        </Form.Group>

        <button className="btn " type="submit" >
          Continue
        </button>
      </form>
    </section>
  )
}

export default Payment
