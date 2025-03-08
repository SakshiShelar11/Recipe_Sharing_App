// FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const Favourites = () => {
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const savedFavRecipes = JSON.parse(localStorage.getItem("fav")) ?? [];
    setFavRecipes(savedFavRecipes);
  }, []);

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`)
      .then((res) => console.log(res));

    // Remove deleted recipe from localStorage
    const updatedFavRecipes = favRecipes.filter(recipe => recipe._id !== id);
    setFavRecipes(updatedFavRecipes);
    localStorage.setItem("fav", JSON.stringify(updatedFavRecipes));
  };

  return (
    <div className="card-container">
      {favRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favRecipes.map((recipe) => (
          <div key={recipe._id} className="card">
            <img
              src={`http://localhost:5000/images/${recipe.coverImage}`}
              width="207px"
              height="150px"
              alt={recipe.title}
            />
            <div className="card-body">
              <div className="title">{recipe.title}</div>
              <div className="icons">
                <div className="timer">
                  <BsStopwatchFill /> {recipe.time}
                </div>
                <div className="action">
                  <Link to={`/EditRecipe/${recipe._id}`} className="editIcon">
                    <FaEdit />
                  </Link>
                  <MdDelete onClick={() => onDelete(recipe._id)} className="deleteIcon" />
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

