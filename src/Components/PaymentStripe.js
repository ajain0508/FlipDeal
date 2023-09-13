import React from 'react'
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise  = loadStripe('pk_test_51Ndu4aSHISAZYuCyExlv3w6rKbqgFYAfHOJKedM2xXFCpuEd0FVDRwNmPwWHwhNskeERFHTHw7Ps936mLRww4zWe00RJUipCNM') 


function PaymentStripe() {
  return (
    <div>
      <Elements stripe={promise}>
      <Payment/>
      </Elements>
      
    </div>
  )
}

export default PaymentStripe;
