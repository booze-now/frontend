import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DrinkCard from './basics/DrinkCard';


const DrinksPage = () => {
  const location = useLocation();
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    setSearchQuery(query);
    fetchDrinks(query);
  }, [location.search]);

  const fetchDrinks = async (query) => {
    try {
      const response = await axios.get(`/drinks-search/${query}`);
      setDrinks(response.data);
    } catch (error) {
      console.error('Error fetching drinks:', error);
    }
  };
  
  return (
    <div>
      {searchQuery ? (
        <div className="drink-cards">
          {drinks.map(drink => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        "Sorry we cant find anithyng"
      )}
    </div>
  );
};

export default DrinksPage;
