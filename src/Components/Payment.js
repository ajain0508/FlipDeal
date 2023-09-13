import './Payment.css'
import React from 'react'
import { useState,useEffect } from 'react'
import { useStateValue } from './StateProvider'
import CheckOutProduct from './CheckOutProduct'
import { Link } from 'react-router-dom'
import { getBasketTotal } from './Reducer'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import axios from './axios'
import {db} from './firebase'
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js'

function Payment() {
    const navigate = useNavigate()
    const [{basket,user},dispatch] = useStateValue()

    // for payment
    const stripe = useStripe();
    const elements = useElements();

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true)

    const [succeeded,setSucceeded]= useState(false);
    const [processing,setProcessing] = useState("");
    const [clientSecret,setClientSecret] = useState("")

    useEffect(()=>{
    //  generate special stripe secret that allows us to charge customer whenever basket changes
        const getClientSecret = async()=>{
            const response = await axios({
                    method:'post',
                    // Stripe expects a total in currency subunits therfore *by100
                    url : `/payments/create?total=${getBasketTotal(basket) * 100}`
                })
                
                setClientSecret(response.data.clientSecret)
           }
       getClientSecret(); 
    },[basket])

    console.log("Client Secret  ",clientSecret)
    
    const handleSubmit = async(e) => {
        // handle stripe stuff
        e.preventDefault();
        setProcessing(true)
  
        
       const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:elements.getElement(CardElement)
        }
       }).then(({paymentIntent})=>{
        // PaymentIntent is payment confirmation
        
        // for orders page
        // push into db
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket:basket,
            amount:paymentIntent.amount,
            created:paymentIntent.created
        })


        setSucceeded(true);
        setProcessing(false);
        setError(null)

        // now empty the basket after payment is confirmed
        dispatch({
            type: "EMPTY_BASKET"
        })
        
        // replacing payments page and directing user to orders page
        navigate('/orders',{replace:true})
       })
    }

    


    const handleChange = (event) =>{
        //   listen for chenges in card element
        //   display any errors as cutomer type their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message:"")
    }

  return (
    <div className='payment'>
      <div className="payment_container">
      <h1>
            Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        {/* payment-section-Delivery Address */}
        <div className="payment_section">
            <div className="payment_title">
                <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
                <p>{user?.email}</p>
                <p>PICT College</p>
                <p>PUNE , MH</p>
            </div>
        </div>
        {/* payment-section-Review items */}
        <div className="payment_section">
            <div className="payment_title">
                <h3>Review items and Delivery</h3>
            </div>
            <div className='payment_items'>
                {/* Products */}
                {basket.map((item)=>(
                    <CheckOutProduct id={item.id} title={item.title} price={item.price} rating={item.rating} image={item.image}/>
                ))}
            </div>
        </div>

        {/* payment-section-payment Method */}
        <div className="payment_section">
            <div className="payment_title">
                <h3>Payment Method</h3>
            </div> 
            <div className="payment_details">
                {/* Stripe Magic */}
                <form action="" onSubmit = {handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className="payment_priceContainer">
                            <CurrencyFormat
                                renderText = {(value)=>(
                                    <>
                                    <h3>Order Total : {value}</h3>
                                    </>

                                )}
                                decimalScale = {2}
                                value = {getBasketTotal(basket)}
                                displayType = {"text"}
                                thousandSeparator = {true}
                                prefix = {'$'}
                            />
                        
                        <button className='payment_button' disabled={!user||processing || disabled || succeeded}>
                        <span >{processing? <p>Processing</p>:"Buy Now"}</span>
                        </button>
                    </div>
                    {/* erros */}
                    <strong>{!user && <Link to='/login' style={{textDecoration:'none',color:'black'}}>Please click here to SIGN IN</Link>}</strong>
                    {error&& <div style={{color:'red'}}>{error}</div>}
                </form>
            </div>   
        </div>
      </div>
    </div>
  )
}

export default Payment

