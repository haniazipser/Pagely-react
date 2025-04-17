import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import axios from "axios";
import ShippingMethods from "./ShippingMethods";
import { Link } from "react-router-dom";
export default function CartContent() {
    const { order, removeFromCart } = useContext(CartContext);
    

    if (!order || !order.items) {
        return <p>Cart is empty</p>;
    }


    return (
        <div className="mx-5 mt-5">
            <h1 className="mb-5"> Shopping Cart</h1>
            {order?.items?.length === 0 ? <p>Cart is empty</p> : (
            
            <div className="row">
                <div className="products-cart col-8">
                    <div className = "row cart-heading">
                            <div className = "col-6">
                                Offer
                            </div>
                            <div className = "col">
                                Price
                            </div>
                            <div className="col">
                                Remove      
                            </div>

                    </div>
                            {order.items.map((item) => (
                                <div className="cart-item">
                                <div className = "row">
                                    <div className="col">
                                        <svg class="bd-placeholder-img" width="100" height="100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
                                    </div>
                                    <div className = "col">
                                        <p className="fw-bolder">{item.offerDto.title}</p>
                                        <p className="fw-lighter">{item.offerDto.author}</p>
                            
                                    </div>
                                    <div className = "col fw-bolder">
                                        ${item.offerDto.price}
                                    </div>
                                    <div className="col">
                                        <div role="button" onClick={() => removeFromCart(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                        </svg></div>
                                        
                                        
                                    </div>
                                </div>
                                </div>
                            ))}

                </div>
                <div className=" col order-total">
                    <h3>Order summary</h3>
                        <p className="fw-bolder">Available shipping methods</p>
                        <div>
                            <ShippingMethods/>
                        </div>
                        <hr></hr>
                                                   
                        <p>Order total: <span className="fw-bolder">${order.orderTotal}</span></p>
                        <Link className="link" to="/checkout" ><button className="add-to-cart mb-3" >Check out</button></Link>

                </div>
            </div>
            )}
            {/*cart.length > 0 && <button onClick={checkout}>Checkout</button>*/}
        </div>
    );
}