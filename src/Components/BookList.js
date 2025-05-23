
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Styles/Books.css';
export default function BookList({ selectedCategory}) {
    const [books, setBooks] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/public/books')
        .then(response => {
            console.log(response.data)
            setBooks(response.data)
        })
    },[])

    function categoryMatch(book, searchedCategory) {
        if(searchedCategory===null || searchedCategory === undefined){
            return false;
        }
      
        if (book.category.id === searchedCategory.id) {
          return true;
        }
      
        // Recursively check child categories
        if (searchedCategory.childCategories !== null && searchedCategory.childCategories !== undefined){
            for (let child of searchedCategory.childCategories) {
                if (categoryMatch(book, child)) {
                    return true;
                }
            }
        }
      
        return false;
      }

    const filteredBooks = books !== null? books.filter((book) => categoryMatch(book, selectedCategory)) : [];

  return (
    <div >
        {selectedCategory === null ? (
            <div class="container booklist">
                <h1>All books </h1>
                <hr></hr>
                <div class="mt-5 row">
                    {books !== null? books.map(book => (
                                
                                            <div class="col-lg-4 col-md-6 col-sm-12 text-center mb-5"  key = {book.id}>
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

            </div>
        ) : (
            <div class="container">
                <h1>Books in category {selectedCategory.categoryName} </h1>
                <hr></hr>
                <div class="row justify-content-center">
                    {filteredBooks !== null? filteredBooks.map(book => (
                        <div class="col-lg-4 col-md-6 col-sm-12 text-center mb-5"  key = {book.id}>
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
            </div>
        )}
    </div>
  );
}
