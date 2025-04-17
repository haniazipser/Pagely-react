import React , { useState,useContext } from "react";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart";
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/Offers.css';
export default function Offer({offer}) {
      const notify = (message) => toast(message);
    
      const { cartItems, addToCart, isInCart } = useContext(CartContext)

  const handleClick = (offer) => {
    addToCart(offer);
    if (isInCart(offer)){
      notify("You already added this offer to your cart");
    }else{
      notify("Added offer to the cart");
    }
    
    console.log(isInCart(offer));
  }

  return (
    <div class="container my-3">
    <div className="row">
                        <div className="col-3">
                        
                          <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
                          </svg>
                        </div>
                        <div className="col">
                       
                        {/*<div class="mb-1 text-body-secondary">{offer.date}</div>*/}
                        <p class="details-company mb-0">{offer.author}</p>
                        <h3 class="details-product-name mt-0 py-1">{offer.title}</h3>
                        <div class="mb-1">State: <span class="fw-lighter">{offer.state}</span> </div>
                        <div class="mb-1">Language: <span class="fw-lighter">{offer.language}</span></div>
                        <div class="mb-1">Published: <span class="fw-lighter">{offer.published}</span></div>
                        <div class="mb-2">Category: <span class="fw-lighter">{offer.category.categoryName}</span></div>
                        {offer.keyWords !== null?offer.keyWords.map(k =>(
                          <span class="fw-lighter">#{k}  </span>
                        )): <span></span>}               
                        </div>
                        <div class="col-sm py-5">
                          <h3 class="fw-bolder">${offer.price}</h3>
                          {offer.shippingMethods !== null?offer.shippingMethods.map(m =>(
                          <div class=" d-flex justify-content-between lh-condensed">
                          <p>{m.shippingMethod}</p>
                          <span class="fw-bolder">${m.price}</span>
                        </div>  
                         )): <span></span>}
                         <div class="row">
                         <div class="col">
                         <button className="add-to-cart-small" 
                            onClick={() => handleClick(offer)}
                          >ADD TO CART</button>
                          </div>
                          <div class="col">
                          <Link to={`/offers/${offer.id}`} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
                          </Link>
                          </div>
                          </div>
                         </div> 
                      </div>
                      </div>

  )}