import React , { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCollapse } from "react-collapsed";
import { CartContext } from "../context/cart";
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/Offers.css';



export default function OfferDescrpition({id}) {
    const notify = (message) => toast(message);
  
    const { cartItems, addToCart, isInCart } = useContext(CartContext)
    const [offer, setOffer] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
    const [isShippingExpanded, setIsShippingExpanded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const { getCollapseProps: getDescriptionCollapseProps, getToggleProps: getDescriptionToggleProps } = useCollapse({
        isExpanded: isDescriptionExpanded,
    });

    const { getCollapseProps: getShippingCollapseProps, getToggleProps: getShippingToggleProps } = useCollapse({
        isExpanded: isShippingExpanded,
    });

    const handleClick = (offer) => {
      addToCart(offer);
      setIsClicked(true);
      if (isInCart(offer)){
        notify("You already added this offer to your cart");
      }else{
        notify("Added offer to the cart");
      }
      
      console.log(isInCart(offer));
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/public/offers/${id}`)
        .then(response => {
            console.log(response.data)
            setOffer(response.data)
        })
    },[])
    return(
        <div>
        {offer ? (
                 <div className="details-wrapper">
                 <p className="details-company">{offer.author}</p>
                 <h1 className="details-product-name">{offer.title}</h1>
           
                 <div className="price">
                   <h2 className="price-new">
                     {offer.price}$
                   </h2>
                 </div>
           
                 <div className="buy">
                   <button className="add-to-cart mb-3" 
                     onClick={() => handleClick(offer)}
                   >
                     Add to cart  
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                   </button>
                 </div>
                 <div className="expandable-description">
                  <div className="switch mb-3">
                    <div className="column">
                      <div role="button" {...getDescriptionToggleProps(
                        { onClick: () => {
                          setIsDescriptionExpanded(!isDescriptionExpanded);
                          setIsShippingExpanded(isDescriptionExpanded);
                        }}
                      )} className = {isDescriptionExpanded ? "underline-active" : "underline"}>Description</div>
                    </div>
                    <div className="column">
                      <div role="button" {...getShippingToggleProps(
                        { onClick: () => {
                          setIsShippingExpanded(!isShippingExpanded);
                          setIsDescriptionExpanded(isShippingExpanded);
                        }}
                      )} className = {isShippingExpanded ? "underline-active" : "underline"}>Shipping methods</div>
                    </div>
                 </div>
                 <section {...getShippingCollapseProps()}> 
                            <p className="details-description">
                                {offer.shippingMethods !== null? offer.shippingMethods.map(m =>(
                              <div class="row">
                                <p class="col">{m.shippingMethod}</p>
                                <p class="col  fw-bolder">{m.price}$</p>
                              </div> 
                            )): null}
                          </p>
                  </section>
                  <section {...getDescriptionCollapseProps()}> 
                            <p className="details-description">
                            <p><span class= "fw-bolder"> Stan :  </span>{offer.state}</p>
                            <p> <span class= "fw-bolder">Published : </span>{offer.published}</p>
                            <p> <span class= "fw-bolder">Language : </span>{offer.language}</p>
                            <p> <span class= "fw-bolder">Category :</span> {offer.category.categoryName}</p>
                        </p>
                  </section>
                  </div>
                  <section>
                  {offer.keyWords !== null?offer.keyWords.map(k =>(
                          <span class="fw-lighter">#{k}  </span>
                        )): null}
                  </section>
                

               </div>
        ) : null}
        </div>
    )
}