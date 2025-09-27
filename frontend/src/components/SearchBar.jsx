import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search recipes by name or ingredients..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input"
                />
            </div>
        </div>
    );
};

export default SearchBar;