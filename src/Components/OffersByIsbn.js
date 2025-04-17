import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import OfferList from "./OfferList";
import { useLocation } from "react-router-dom";


export default function OffersByIsbn(){
    const [offers, setOffers] = useState(null);

    const location = useLocation();

    const initialIsbn = location.state?.isbn ?? null;
    const initialTitle = location.state?.title ?? null;

    const [selectedIsbn, setSelectedIsbn] = useState(initialIsbn);
    const [selectedTitle, setSelectedTitle] = useState(initialTitle);

    return(
        <div class="mt-5 container">
                  <div className="col">
                    <OfferList selectedCategory={null} selectedIsbn={selectedIsbn} selectedTitle={selectedTitle}/>
                  </div>
        </div>
    )}