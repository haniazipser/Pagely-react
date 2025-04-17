import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import OfferList from "./OfferList";
import { useLocation } from "react-router-dom";
import '../Styles/Offers.css';

export default function Offers(){
    const [offers, setOffers] = useState(null);
    const [categories, setCategories] = useState(null);
    
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
      axios.get('http://localhost:8080/public/categories')
      .then(response => {
          console.log(response.data)
          setCategories(response.data)
      })
  },[])

  const handleCategorySelect = (category) => {
    //console.log("przed ustawieniem "+categoryId)
    setSelectedCategory(category);
};
    return(
        <div class="mt-5 mx-3">
             <div >
                <div className="row " >
                  <div className="col-sm-auto">
                  <h3 class="px-5">Categories</h3>
                      <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />
                  </div>
                  <div className="col">
                    <OfferList selectedCategory={selectedCategory} selectedIsbn={null}/>
                  </div>
                </div>
              </div>
        </div>
    )}