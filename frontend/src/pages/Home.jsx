import React from 'react'
import img from '../Images/img.jpg'
import '../App.css'

import { Link } from 'react-router-dom'
import RecipeItems from '../components/RecipeItems'
import { useState, useEffect } from "react";
import axios from "axios";






export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <>
    
    <section id="home" className='home'>
        
        <div className='image'>
            <img src={img} alt='Food' width="100%"></img>
            
            <div id="about" className='about'>
                <h1 className="h1">Kitchen Tales</h1>
                <hr className="hr"></hr>
                <h3>A Recipe Sharing Website</h3>
                <h5>It is better than an Expensive cookery book.</h5>
                <p>Learn how to make your favourite dishes and also share your best recipes with us.</p>
                <Link to="/AddRecipe">
                <button >Share your recipe</button>
                </Link>
            </div>

        </div>

        {/* <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul> */}
      
    </section>

    <div className='recipe'>
      <RecipeItems recipes={recipes}/>
    </div>

  <div className='footer'>
    <p>@copyright all rights reserved</p>
 </div>
  

    
    </>
  )
}
