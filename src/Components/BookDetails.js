import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BasicRating from "./BasicRating";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";
import '../Styles/Books.css';

export default function BookDetails(){
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
    const [isAuthorExpanded, setisAuthorExpanded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const { getCollapseProps: getDescriptionCollapseProps, getToggleProps: getDescriptionToggleProps } = useCollapse({
        isExpanded: isDescriptionExpanded,
    });

    const { getCollapseProps: getAuthorCollapseProps, getToggleProps: getAuthorToggleProps } = useCollapse({
        isExpanded: isAuthorExpanded,
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/public/books/${id}`)
        .then(response => {
            console.log(response.data)
            setBookDetails(response.data)
        })
    },[id])
    return(
        <div>
            
             {bookDetails ? (
                <div class="container mt-5 ">
                    <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                            <li class="breadcrumb-item "><Link className="link" to="/home">Home</Link></li>
                            <li class="breadcrumb-item"><Link className="link" to="/books">Books</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Book details</li>
                    </ol>
                    </nav>
                <div class="row  mr-5 relative">
                 <div className="col-4 relative">
                    <div class="sticky ">
                    <svg class="bd-placeholder-img" width="400" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                    <Link to= "/offersByIsbn"
                                    state={{
                                        category: null,
                                        isbn: bookDetails.isbn,
                                        title: bookDetails.title
                                    }} class="text-decoartion-none"
                                    >
                    <button className="add-to-cart mb-3 mx-auto" 
                    >
                        Find offers  
                    </button>
                    </Link>
                    </div>
                </div>
                <div className="col">
                  <div class="mx-5 px-5">
                    <p className="details-company">{bookDetails.authors[0].name}</p>
                    <h1 className="details-product-name">{bookDetails.title}</h1>
                    <p><BasicRating value = {Number(bookDetails.rating || 0)} /></p>
                    <p class = "fw-lighter">{bookDetails.category.categoryName}</p>
           
                    <div className="expandable-description">
                        <div className="switch mb-3">
                            <div className="column">
                                <div role="button" {...getDescriptionToggleProps(
                                    { onClick: () => {
                                    setIsDescriptionExpanded(!isDescriptionExpanded);
                                    setisAuthorExpanded(isDescriptionExpanded);
                                    }}
                                )} className = {isDescriptionExpanded ? "underline-active" : "underline"}>Description</div>
                            </div>
                            <div className="column">
                            <div role="button" {...getAuthorToggleProps(
                                { onClick: () => {
                                setisAuthorExpanded(!isAuthorExpanded);
                                setIsDescriptionExpanded(isAuthorExpanded);
                                }}
                            )} className = {isAuthorExpanded ? "underline-active" : "underline"}>More about the author</div>
                            </div>
                        </div>
                        <section class=""{...getDescriptionCollapseProps()}> 
                            <p>{bookDetails.fullDescription}</p>
                            <p class="fw-lighter">First published in {bookDetails.published}</p>
                        </section>
                        <section class="" {...getAuthorCollapseProps()}>
                            <div >
                                {bookDetails ? bookDetails.authors.map (author => (
                                    <div class="mt-3 row" key = {author.id}>
        
                                        <div class = "col ">
                                            <h3 class="mb-3">{author.name}</h3>
                                            <p>{author.biography}</p>
                                        </div>

                                        <div class="col">
                                        <svg class="bd-placeholder-img rounded-circle my-3 " width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                                        </div>
                                    </div>
                                )):null}
                            </div>
                        </section>
                  </div>
                  <div>
                    <hr/>
                    <h3 class="my-4">More from this author</h3>
                    <div class="row ">
                        {bookDetails && bookDetails.authors && bookDetails.authors[0].books? bookDetails.authors[0].books.map(book => (
                            <div class="col-lg-4 col-md-6 col-sm-12 text-center mb-5 "  key = {book.id}>
                                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                                <h2 class="fw-normal fs-5 my-3">{book.title}</h2>
                                <p class="fw-lighter">{book.category}</p>
                                <Link to={`/books/2`} class="read-button" onClick={ window.scrollTo({ top: 0 })} >Read</Link>
                            </div>

                        )) : (<div>Loading...</div>)}
                    </div>
                    <hr/>

                  </div>
                    {bookDetails.reviews.map(review => (
                    <div key = {review.id}> 
                            <p>{review.date}</p>
                            <p>{review.client}</p>
                            <p>{review.content}</p>
                            <p><BasicRating value = {Number(review.stars || 0)} /></p>
                    </div>
                     ))}
                
                  </div>              
                </div>
                </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )}