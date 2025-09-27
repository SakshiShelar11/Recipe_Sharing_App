import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const Favourites = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavRecipes = JSON.parse(localStorage.getItem("fav")) || [];
    setFavRecipes(savedFavRecipes);
  }, []);

  const onDelete = async (id, e) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`http://localhost:5000/recipe/${id}`)
        const updatedFavRecipes = favRecipes.filter(recipe => recipe._id !== id);
        setFavRecipes(updatedFavRecipes);
        localStorage.setItem("fav", JSON.stringify(updatedFavRecipes));
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe");
      }
    }
  };

  const handleCardClick = (recipeId) => {
    navigate(`/view-recipe/${recipeId}`)
  }

  return (
    <div className="card-container">
      {favRecipes.length === 0 ? (
        <div className="no-favorites">
          <h2>No favorite recipes yet</h2>
          <p>Start adding recipes to your favorites to see them here!</p>
        </div>
      ) : (
        favRecipes.map((recipe) => (
          <div 
            key={recipe._id} 
            className="card recipe-card"
            onClick={() => handleCardClick(recipe._id)}
          >
            <img
              src={`http://localhost:5000/images/${recipe.coverImage}`}
              width="207px"
              height="150px"
              alt={recipe.title}
              style={{objectFit: 'cover'}}
            />
            <div className="card-body">
              <div className="title">{recipe.title}</div>
              <div className="icons">
                <div className="timer">
                  <BsStopwatchFill /> {recipe.time}
                </div>
                <div className="action">
                  <button 
                    className="editIcon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-recipe/${recipe._id}`);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <MdDelete 
                    onClick={(e) => onDelete(recipe._id, e)} 
                    className="deleteIcon" 
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;