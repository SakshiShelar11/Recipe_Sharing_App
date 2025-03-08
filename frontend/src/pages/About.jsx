import React from 'react'
import img1 from '../Images/img1.png'


export default function About() {
  return (
    <>
    
    <section id="home" className='home'>
        
        <div className='image'>
            <img src={img1} alt='Food' width="100%"></img>
            
            <div id="about" className='about'>
                <h1 className="h1">Kitchen Tales</h1>
                <hr className="hr"></hr>
                <h3>A Recipe Sharing Website</h3>
                <h5>It is better than an Expensive cookery book.</h5>
                <p>Welcome to Kitchen Tales , a recipe sharing website.</p> 
                <p>Learn how to make your favourite dishes and also share your best recipes with us.</p>
                <p>You can find food recipes for all seasons, every mood and any age group.</p>
            </div>

        </div>
      
    </section>
    </>
  )
}
