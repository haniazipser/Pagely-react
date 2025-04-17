
import React, { useEffect, useState } from "react";
import axios from "axios";
import Offer from "./Offer";
import '../Styles/Offers.css';
export default function OfferList({ selectedCategory, selectedIsbn, selectedTitle}) {
    const [offers, setOffers] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/public/offers')
        .then(response => {
            console.log(response.data)
            setOffers(response.data)
        })
    },[])

    function categoryMatch(offer, searchedCategory) {
        if(searchedCategory===null || searchedCategory === undefined){
            return false;
        }
        console.log("z jakiegos powodu sprzawdzamy")
      
        if (offer.category.id === searchedCategory.id) {
          return true;
        }
      
        // Recursively check child categories
        if (searchedCategory.childCategories !== null && searchedCategory.childCategories !== undefined){
            for (let child of searchedCategory.childCategories) {
                if (categoryMatch(offer, child)) {
                    return true;
                }
            }
        }
      
        return false;
      }


      function isbnMatch(offer, isbn){
        if (isbn === null || isbn === undefined){
            return false;
        }
        for (let i of isbn){
            console.log("szukamy isbnu", i)
            if (i === offer.isbn){
                console.log("udalo sie")
                return true
            }
        }
      }

    const filteredOffers = offers !== null? offers.filter((offer) => categoryMatch(offer, selectedCategory) || isbnMatch(offer, selectedIsbn)) : [];

  return (
    <div className="conatiner px-5">
        {selectedCategory == null && selectedIsbn == null? (
            <div>
                <h1 class="mb-5">All Offers </h1>
                <div class="row ">
                    {offers !== null? offers.map(offer => (
                        <Offer offer = {offer} />
                    )): (<div>Loading...</div>)} 
                </div>

            </div>
        ) : (
            <div>
                {selectedIsbn? (
                    <h1 class="mb-5">Offers for {selectedTitle} </h1>
                ):(
                    <h1 class="mb-5">Offers in category {selectedCategory.categoryName} </h1>
                )}
                <div class="row ">
                    {filteredOffers !== null && filteredOffers.length > 0? filteredOffers.map(offer => (
                       <Offer offer = {offer} />                                
                    )): (<div>Unfortunately there are no offers for this book...</div>)} 
                </div>
            </div>
        )}
    </div>
  );
}
