import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/Quote.css';
export default function Quote(){
    const [quote, setQuote] = useState(null);

    return(
         <div class="position-relative w-100 text-center quote-no-margin">
            <div class="col-md-6 p-lg-5 mx-auto my-1 quote-inside">
                <h3>“You are a wonderful creation. You know more than you think you know, just as you know less than you want to know.”</h3>
                    <p>Oscar Wilde</p>
                    <p class="fw-lighter"> The Picture of Dorian Gray </p>
            </div>
        </div>
    )}