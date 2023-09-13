import React from 'react'
import './Home.css'
import Product from './Product'


function Home() {
  return (
    <div className='home'>
        <div className="home_container">
            <img className="home_image" src="https://vertexbazaar.com/wp-content/uploads/2022/04/amazon-prime-video-banner.jpg" alt="" />
        <div className="home_row">
            {/* product component */}
            <Product id="12321341" title='Lean Start Up: How business creates rapid Success paperback' price={19.99} image="https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UF1000,1000_QL80_.jpg" rating = {5}/>
            <Product id="49538094" title='KenWood kMix Stand Mixer for baking,stylish Kitchen mixer with k-Beater ' price={239.99} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXh3IAxxi2OSyTgxu3O3OXeofIq3zYZDUyw&usqp=CAU" rating = {3}/>
            
        </div>
        <div className="home_row">
        <Product id="4903850" title='Samsung LCenf3uie39 Curved LED Gaming monitor' price={199.99} image="https://m.media-amazon.com/images/I/41Zdso6F5RL.jpg" rating = {4}/>
        <Product id="23445930" title='Amazon Echo 3rd generation Smart speaker' price={109.99} image="https://www.compareprix.in/images/product/large/amazon-all-new-echo-3rd-gen-large.jpg" rating = {2}/>
        <Product id="3254354345" title='New Apple iPad pro (12.9 inch,wi-fi, 128GB)' price={598.99} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzgJZcCvMIxfYX8secxmJywxY7VZE1TksrtsILyJm33-gU-5IjE13jE7KWpZmvvyMFqxU&usqp=CAU" rating = {3}/>
        

        </div>
        <div className="home_row">
        <Product id="90829332" title='Samsung Cureved LED Gaming Monitor Super Ultra Wide5120 x 1440' price={19.99} image="https://m.media-amazon.com/images/I/71MlcO29QOL.jpg" rating = {4}/>
            
            
        </div>

        </div>
        
    </div>
  )
}

export default Home
