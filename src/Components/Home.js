
import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicRating from "./BasicRating";
import Quote from "./Quote";
import { Link } from 'react-router-dom';
import Search from "./Search";
import '../Styles/Books.css';
import '../Styles/Search.css';
export default function Home(){
    const [books, setBooks] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/public')
        .then(response => {
            setBooks(response.data)
            console.log(response.data)
        })
    },[])
    return(
        <div>
        <Search/>
        <div className="container">
            <h1 class="mt-5">Start reading</h1>
            <hr class="mb-5"></hr>
            <div class="row text-center">
                {books !== null? books[0].map(book => (
                        <div class="col" key={book.id}>
                            <svg class="bd-placeholder-img" width="180" height="230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                            <div className="book">
                            <h2 class="fw-normal fs-5 my-3">{book.title}</h2>
                            <p>{book.description}</p>
                            </div>
                            <p class="fw-lighter">{book.category}</p>
                            <p><BasicRating value = {Number(book.rating || 0)} /></p>
                            <p><Link to={`/books/${book.id}`} class="read-button" >Read &raquo;</Link></p>
                        </div>

                    )): (<div>Loading...</div>)} 
            </div>
        </div>
                    
             <div class="position-relative w-100 text-center quote">
                <div class="col-md-6 p-lg-5 mx-auto my-1 quote-inside">
                    <h3>“You are a wonderful creation. You know more than you think you know, just as you know less than you want to know.”</h3>
                    <p>Oscar Wilde</p>
                    <p class="fw-lighter"> The Picture of Dorian Gray </p>
                </div>
            </div>


        <div className="container">
            <h1 class ="mt-5">Meet the authors</h1>
            <hr class ="mb-5"></hr>
            <div class="row">
            {books !== null? books[1].map(author => (
                        <div class="col">
                            <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                            <h2 class="fw-normal fs-5 my-3">{author.name}</h2>
                            <p>{author.biography}</p>
                            
                            <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>

                    )): (<div>Loading...</div>)}
            </div>
        </div>
        
        </div>
    )
}