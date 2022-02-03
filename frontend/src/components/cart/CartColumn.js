import React from 'react'

const CartColumn = () => {
    return (
        <section>
            <div className="cart-column">
                <h6 className="cart-column--item">Item type</h6>
                <h6 className="cart-column--price">Item price</h6>
                <h6 className="cart-column--amount">Number</h6>
                <h6 className="cart-column--subtotal">remove</h6>
            </div>
        </section>
    )
}

export default CartColumn
