import React, { useState, useEffect } from 'react';
import './land.css';

const categories = [
  {
    "id": 1,
    "name": "Electronics",
    "image": "https://cdn-icons-png.flaticon.com/128/2450/2450341.png",
    "subcategories": [
      "Smartphones",
      "Laptops",
      "Tablets"
    ]
  },
  {
    "id": 2,
    "name": "Clothing",
    "image": "https://cdn-icons-png.flaticon.com/128/11922/11922960.png",
    "subcategories": [
      "Men",
      "Women",
      "Kids"
    ]
  },
  {
    "id": 3,
    "name": "Home & Kitchen",
    "image": "https://rukminim2.flixcart.com/flap/96/96/image/ab7e2b022a4587dd.jpg?q=100",
    "subcategories": [
      "Furniture",
      "Appliances",
      "Cookware"
    ]
  }
];

const productImages = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/Apr/Shoes/Unrec/Canara/Alls/3000pc._CB558905583_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/GW/CML/New/April/PC_CML_2X._CB559496480_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/GW/Mar18/QC/PC_GW_Hero_3000x1200_01._CB579486410_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/march/brands/GW/Under_1499_Tallhero_3000x1200._CB561212093_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Jewellery/2024/April/GW/Unrec/Canara/Cat3/Updated/199_PC_3000._CB559437615_.png",
  
];

const Land = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = categories.reduce((acc, category) => {
      const matchingSubcategories = category.subcategories.filter(subcategory =>
        subcategory.toLowerCase().includes(term)
      );
      if (matchingSubcategories.length > 0) {
        acc.push({ category: category.name, subcategories: matchingSubcategories });
      }
      return acc;
    }, []);
    setSearchResults(results);
  };

  return (
    <div className="container">
      <h1 className="title"><marquee behavior="alternate" direction="left">Welcome to Our Shopping Website!</marquee></h1>
      <div className="background"></div>
      <div className="product-gallery">
        <h2>Featured Products</h2>
        <div className="product-images">
          {productImages.map((image, index) => (
            <img
              src={image}
              alt={`Product ${index + 1}`}
              key={index}
              className="product-image"
              style={{ transform: `translateX(-${currentProductIndex * 100}%)` }}
            />
          ))}
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <strong>{result.category}</strong>
                <ul>
                  {result.subcategories.map((subcategory, idx) => (
                    <li key={idx}>{subcategory}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <div
                className="category"
                onMouseEnter={() => toggleCategory(category.id)}
                onMouseLeave={() => toggleCategory(category.id)}
              >
                <img src={category.image} alt={category.name} className="category-image" />
                <span className="category-name">{category.name}</span>
                {expandedCategory === category.id ? ' -' : ' +'}
              </div>
              {expandedCategory === category.id && (
                <ul>
                  {category.subcategories.map(subcategory => (
                    <li key={subcategory}>{subcategory}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
     
    </div>
  );
};

export default Land;
