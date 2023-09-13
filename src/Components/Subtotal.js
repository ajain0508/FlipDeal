import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import React from 'react'
import {useStateValue} from './StateProvider'
import { getBasketTotal } from './Reducer';
import {useNavigate} from 'react-router-dom'

function Subtotal() {
  const navigate = useNavigate()
    const [{basket,user},dispatch] = useStateValue();
    // let a  = 0;
    // for (let i=0;i<basket.length;i++){
    //     a = a+basket[i].price;
    // }
    // rather than above code we use selector
  return (
    <div className='subtotal'>
      <CurrencyFormat
      renderText = {(value)=>(
        <>
        <p>
            Subtotal ({basket.length?basket.length:0} items)  : <strong>{value}</strong>
        </p>
        <small className="subtotal_gift">
            <input type="checkbox" /> This order contains a gift
        </small>
        </>

      )}
      decimalScale = {2}
      value = {getBasketTotal(basket)}
      displayType = {"text"}
      thousandSeparator = {true}
      prefix = {'$'}
      />
      {!basket.length?<div>Add some items in the Basket</div>:""}
      {basket.length?<button style = {{cursor:'pointer'}} onClick = { e =>navigate('/payment')} >Proceed to Checkout</button>:""}
    </div>
  )
}

export default Subtotal;
