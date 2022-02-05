import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cart from './screens/Cart'
import Home from './screens/Home'
import Login from './screens/Login'
import Checkout from './screens/Checkout'
import SinglePhone from './screens/SinglePhone'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import Shipping from './screens/Shipping'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'
import About from './components/About'

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/ephone/:id" component={SinglePhone} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
