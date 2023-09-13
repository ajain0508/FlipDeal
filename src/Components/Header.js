import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import {auth} from './firebase'
function Header() {
  //  for updating basket Count
    const [{basket,user},dispatch] = useStateValue();
    
    const handleAuthentication = ()=>{
      if(user){
        auth.signOut();
      }
    }

  return (
    <div className='header'>
      <Link to='/'><img className = 'header_logo' src="https://www.thesun.co.uk/wp-content/uploads/2022/02/Amazon-Logo-1024x426-1.png" alt="" /></Link>
      <div className="header_search">
        <input className='header_searchInput' type='text'></input>
        <SearchIcon className='header_searchIcon'/>
      </div>
      <div className="header_nav">
      <Link style = {{textDecoration:'none'}} to = {!user && '/login'}>
         <div onClick = {handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
                Hello {user?user.email.substring(0,6):'Guest'}
            </span>
            
            <span className="header_optionLineTwo">{(user) ? 'Sign Out':'Sign in'}</span>
           
         </div>
         </Link>
            
         <div className="header_option">
         <span className="header_optionLineOne">
                Returns
            </span>
            <span className="header_optionLineTwo">
                &Orders
            </span>
         </div>
         <div className="header_option">
         <span className="header_optionLineOne">
                Your
            </span>
            <span className="header_optionLineTwo">
                Prime
            </span>
         </div>
         <Link to = '/checkout'>
         <div className="header_basketOption">
          
          <ShoppingBasketIcon/>
          <span className='header_optionLineTwo header_basketCount'>
            {/* it gives no of items in basket */}
            {basket.length !==0 ? basket.length:0}
          </span>
          </div>
         </Link>
      </div>
    </div>
  )
}

export default Header
