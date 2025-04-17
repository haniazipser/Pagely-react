import React , { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery";
import OfferDescrpition from "./OfferDescription";
import { Link } from "react-router-dom";
import '../Styles/Offers.css';
export default function OfferDetails() {
    const { id } = useParams();
    return (
        <div className="container mt-5">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item "><Link className="link" to="/home">Home</Link></li>
                <li class="breadcrumb-item"><Link className="link" to="/offers">Offers</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Offer details</li>
            </ol>
            </nav>
            <div className="row">
            <div className="col">
            <Gallery/>
            </div>
            <div className="col">
            <OfferDescrpition id={id}/>
            </div>
            </div>
        </div>
    )
}