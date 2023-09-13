import React from 'react'
import Subtotal from './Subtotal'
import './Checkout.css'
import { useStateValue } from './StateProvider'
import CheckOutProduct from './CheckOutProduct'

function Checkout() {
  const [{basket,user},dispatch] = useStateValue()
  return (
    <div className='checkout'>
      <div className="checkout_left">
        <img src="https://images.freekaamaal.com/post_images/1595322946.png" alt="" className="checkout_ad" />
        <div>
          <h3>Hello {user?user.email.substring(0,6):'Guest'}...</h3>
          <h2 className='checkout_title'>
            Your Shopping Basket
          </h2>
          {/* CheckOutProduct */}
          {basket.map((item)=>(<CheckOutProduct id = {item.id} title = {item.title} image = {item.image} price = {item.price} rating = {item.rating} />))}
        </div>
        </div>


         <div className="checkout_right">
           <Subtotal  />

      </div>
      
    </div>
  )
}

export default Checkout
