import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import BookList from "./BookList";
import { useLocation } from "react-router-dom";


export default function Categories(){
    const [categories, setCategories] = useState(null);

    const location = useLocation();
    console.log(location);
    const initialCategory = location.state?.category ?? null;

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
          console.log("inicjalizujemy" + initialCategory);
          setSelectedCategory(initialCategory)
      }, [initialCategory]);

    useEffect(() => {
        axios.get('http://localhost:8080/public/categories')
        .then(response => {
            console.log(response.data)
            setCategories(response.data)
        })
    },[])

    
    return(
        <div >
            {categories?  (
                <div>
                    <div className="row mt-5" >
                        <div  class="col-3">
                            <h3 class="px-5">Categories</h3>
                            <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />
                        </div>
                        <div className="col">
                            <BookList selectedCategory={selectedCategory}/>
                        </div>
                        <div id="c"></div>
                    </div>
                </div>
            ): (
                <div></div>
            )}
                       
        </div>
    )}

    