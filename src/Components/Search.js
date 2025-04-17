import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import book_pile1 from'../assets/book_pile1.png'
import '../Styles/Search.css';
export default function Search(){
    const navigate = useNavigate();
    const [query, setQuery] = useState(null);

    const handleClick = () => {
        navigate("/books", {state:query});  // Replace with your actual route
    }

    return(
        <div class="row search py-3 px-5">
            <div class="col-7 d-flex justify-content-center align-items-center px-5">
                <div class="p-5">
                <h1 class="my-3 display-3"> Find your next favourite book</h1>
                <h4 class="fw-lighter"> Explore thousands of books in one place. Bestsellers, hidden gems and timeless classics, all waiting for you!</h4>
                <div class="my-5">
                    <input type="text" class="search-bar" placeholder="Search"
                     onChange={(e) => {setQuery(e.target.value)
                    }
                    } 
                    />
                    <button type="button" 
                    onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search fw-bolder" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        </button>
                </div>
                </div>
            </div>
            <div class="col">
                <img src={book_pile1} alt="book pile" className="book-pile"/>
            </div>
            
        </div>
    )}