import React from 'react'
import './CheckOutProduct.css'
import { useStateValue } from './StateProvider'

function CheckOutProduct({id,image,title,price,rating}) {
    const [{basket},dispatch] = useStateValue()
    const removefromBasket = ()=>{
         dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
         })
    }
  return (
    <div className='checkoutproduct'>
      <img className='checkoutproduct_image' src = {image}/>

      <div className='checkoutproduct_info'>
            <p className='checkoutproduct_title'>{title}</p>
            <p className='checkoutproduct_price'><small>$</small><strong>{price}</strong></p>
            <div className="checkoutproduct_rating">
            {Array(rating).fill().map(()=>(
               <p className='fa fa-star checked'></p>
            ))}
            </div>
            <button style = {{cursor:'pointer'}}onClick={removefromBasket}>Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckOutProduct
