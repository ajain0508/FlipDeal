import './Product.css'
import React from 'react'
import { useStateValue } from './StateProvider'

function Product({id,title,image,price ,rating}) {
  const [{basket},dispatch] = useStateValue()
  // baset is inside state and it gets updated everytime an item is added or removed
  // console.log("this is the basket ",basket)
  const addToBasket = ()=>{
    // dispatch items into data later
    dispatch({
      type: 'ADD_TO_BASKET',
      item:{
        id :id,
        title:title,
        image:image,
        price:price,
        rating:rating
      }
    })
  }
  return (
    <div className='product'>
      <div className="product_info">
        <p>{title}</p>
        <p className='product_price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className="product_rating">
            {/* for stars */}
            {Array(rating).fill().map((_,i)=>(
               <p className='fa fa-star checked'></p>
            ))}
            
            
        </div>
        </div>
        <img src={image} alt="" />
        {/* addToBasket will dispatch item  */}
        <button className="product_button" style = {{cursor :'pointer'}} onClick = {addToBasket}>Add to Basket</button>
      
    </div>
  )
}

export default Product

