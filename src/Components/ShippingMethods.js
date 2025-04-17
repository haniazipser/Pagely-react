import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cart";
import '../Styles/Offers.css';

export default function ShippingMethods(){
    const [methods, setMethods] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const { addShippingMethod, shippingMethod} = useContext(CartContext)
    const onOptionChange = e => {
        const selected = methods.find(m => m.id.clientId + m.id.shippingMethod === e.target.id);
        setSelectedMethod(selected); 

        if (selected) { 
            console.log(selected.id.shippingMethod);
            addShippingMethod(selected.id);
        }
    }

    useEffect(() => {
      axios.get('http://localhost:8080/api/client/purchase/shipping/1', {withCredentials: true})
      .then(response => {
          console.log(response.data)
          setMethods(response.data)
      })
  },[])

    return(
        <div>
            {methods !==null? methods.map(m => (
                <div  className="cart-item">
                    <input className="mx-2" type="radio" id={m.id.clientId+m.id.shippingMethod} 
                    onChange={onOptionChange}
                    name="shipping"
                    checked={m.id.shippingMethod === shippingMethod()}
                    value={m.id}/>
                            <label for={m.id.clientId+m.id.shippingMethod}>
                               {m.id.shippingMethod}<span className="fw-bolder"> ${m.price}</span>
                            </label>
                </div>
            )) : null}
        </div>
    )}