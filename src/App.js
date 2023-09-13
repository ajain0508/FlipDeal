import {useEffect} from 'react'
import './App.css';
import Header from './Components/Header'
import Home from './Components/Home'
import Checkout from './Components/Checkout'
import Login from './Components/Login'
import Orders from './Components/Orders'
import PaymentStripe from './Components/PaymentStripe'
import Payment from './Components/Payment';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import 'react-router-dom'
import {auth} from './Components/firebase'
import { useStateValue } from './Components/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const promise  = loadStripe('pk_test_51Ndu4aSHISAZYuCyExlv3w6rKbqgFYAfHOJKedM2xXFCpuEd0FVDRwNmPwWHwhNskeERFHTHw7Ps936mLRww4zWe00RJUipCNM')

function App() {
  const [{},dispatch] = useStateValue()
  useEffect(()=>{
    // it will only run once when an app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log("The user>>",authUser)

      if(authUser){
        // the user is just logged in OR the user was logged in 
        dispatch ({
          type:'SET_USER',
          user:authUser
        })
      }
      else{
        // the user is logged out
        dispatch ({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])

  return (
    <div className="App">
    <Router>
      <Header />
    <Routes>
    <Route exact path = '/checkout'
       element = {<Checkout/>}>
    </Route>
    <Route exact path = '/Orders'
    element = {<Orders/>}>
      </Route>
    <Route exact path='/login'
      element = {<Login/>}>
    </Route>
    <Route exact path='/payment'
       element = {<Elements stripe={promise}>
                      <Payment/>
                  </Elements>}>
    </Route>
    <Route exact path= '/'
       element = {<Home/>}>
    </Route>
    
    </Routes>
    
    </Router>
    </div>
  );
}

export default App;
