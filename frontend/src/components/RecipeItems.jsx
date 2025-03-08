import React, { useState } from 'react'
// import img from '../Images/img.jpg'
import {BsStopwatchFill} from "react-icons/bs"
import {FaHeart} from "react-icons/fa6"
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom'
import axios from 'axios'

// import axios from 'axios';

const RecipeItems = ({ recipes }) => {

  let favRecipe=JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipes,setIsFavRecipes]=useState(false)

  const onDelete=async(id)=>{
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    .then((res)=>console.log(res))}

  const favRecipes=(recipe)=>{ 
    let filterRecipe=favRecipe.filter(recipe=>recipe._id !==recipe._id)
    favRecipe=favRecipe.filter(recipe=>recipe._id===recipe._id).length=== 0 ?[...favRecipe,recipe]: filterRecipe
    localStorage.setItem("fav",JSON.stringify(favRecipe))
    setIsFavRecipes(pre=>!pre)
  }
  

    return (
      <div className='card-container'>
        {recipes.map((recipe) => (
          <div key={recipe.title} className='card'>
            <img src={`http://localhost:5000/images/${recipe.coverImage}`} width="207px" height="150px" alt={recipe.title} />
            <div className='card-body'>
                <div className='title'>{recipe.title}</div>
                <div className='icons'>
                    <div className='timer'><BsStopwatchFill />{recipe.time}</div>
                    <FaHeart onClick={()=>favRecipes(recipe)} style={{color:(favRecipe.some(res=>res._id===recipe._id))? "red" :" "}}/>
                    <div className='action'>
                    <Link to={`/EditRecipe/${recipe._id}`} className="editIcon"><FaEdit/></Link>
                    <MdDelete onClick={()=>onDelete(recipe._id)} className='deleteIcon'/>
                    </div>
                </div>
                {/* <p>{recipe.ingredients}</p> */}
          </div>
          </div>
        ))}
      </div>
    );
  };
  
  
  export default RecipeItems;