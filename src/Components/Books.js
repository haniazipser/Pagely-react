import React, { useEffect, useState } from "react";
import axios from "axios";
import MainCategories from "./MainCategories";
import { useLocation, Link } from "react-router-dom";
import '../Styles/Books.css';
export default function Books(){

    const location = useLocation();
    const initialQuery = location.state ? location.state : null;

    const [books, setBooks] = useState(null);
    const [query, setQuery] = useState(initialQuery);


    useEffect(() => {
        axios.get(`http://localhost:8080/public/books`)
        .then(response => {
            setBooks(response.data)
        }
        )
    },[])

    const matchAuthor = (book, authorName) => {
        for (let author of book.authors){
            if (author.name.toLowerCase().includes(authorName.toLowerCase())){
                return true;
            }
        }
        return false;
    }

    const filteredBooks = books && query? (books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) || matchAuthor(book, query)
    )) : [];


    return(
        <div>
            <div className="container mt-5">
                <div class="search-container w-50 my-5 mx-auto">
                    <input type="text" class="form-control search-input " placeholder={"Search for author or title..."} value={query}
                    onChange={(e) => {setQuery(e.target.value)
                    }
                    } />
                    <i class="search-icon"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search fw-bolder" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </i>
            </div>  
            <MainCategories/>      
                {query ? (
                <div class="row  ">
                    {filteredBooks !== null? filteredBooks.map(book => (
                        <div class="col-lg-3 col-md-4 col-sm-12 text-center mb-5"  key = {book.id}>
                        <Link to={`/books/${book.id}`} >
                        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                        <div className="book-short">
                            <h2 class="fw-normal fs-5 my-3 text-black">{book.title}</h2>
                            {book.authors.map(a =>(
                                <p class="details-company">{a.name}</p>
                            ))}
                            </div>
                        </Link>
                        </div>
             
                                 )): (<div>Loading...</div>)} 
                </div>
                ) : (
                    <div class="row ">
                    {books !== null? books.map(book => (
            
                        <div class="col-lg-3 col-md-4 col-sm-12 text-center mb-5"  key = {book.id}>
                        <Link to={`/books/${book.id}`} >
                        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                        <div className="book-short">
                            <h2 class="fw-normal fs-5 my-3 text-black">{book.title}</h2>
                            {book.authors.map(a =>(
                                <p class="details-company">{a.name}</p>
                            ))}
                            </div>
                        </Link>
                        </div>
                        
             
                                 )): (<div>Loading...</div>)} 
                </div>
                )}
            </div>
        </div>
    )}

    