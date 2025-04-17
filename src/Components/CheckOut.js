import React , { useContext, useState} from "react";
import ikona from'../assets/ikona.png'
import { CartContext } from "../context/cart";
import '../Styles/Offers.css';
export default function CheckOut() {
    const{order} = useContext(CartContext);

  return (
    <div class="container px-5 my-5">
      <div class="text-center">
        <img src={ikona} alt="Logo" class="logo m-0 mb-3"/>
        <h2>Checkout form</h2>
      </div>
      <div class="row relative">
        <div class="col-8">

          
          <form class="needs-validation" novalidate>
            <h4 class="mb-3">Customer</h4>
            <div class="name">
              
              <label for="name">Name and Surname</label>
                <input type="text" class="form-control" id="name" placeholder=""  required/>
                <div class="invalid-feedback">
                  Valid name is required.
                </div>
            </div>
         

            <div class="mb-3">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com" required/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <h4 class="mb-3">Address</h4>
            <div class="mb-3">
              <label for="address">City</label>
              <input type="text" class="form-control" id="city" placeholder="" required/>
              <div class="invalid-feedback">
                Please enter the city.
              </div>
            </div>
            <div class = "row">
            <div class="col mb-3">
              <label for="street">Street </label>
              <input type="text" class="form-control" id="street" placeholder="" required/>
            </div>
            <div class="col-2 mb-3">
              <label for="number">Number </label>
              <input type="text" class="form-control" id="number" placeholder="" required/>
            </div>
            <div class="col-2 mb-3">
                <label for="apartment">Apartment *</label>
                <input type="text" class="form-control" id="apartment" placeholder="" />
            </div>

            </div>

            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="country">Country</label>
                <select class="form-select" id="country" required>
                  <option>Poland</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder="" required/>
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            
            <hr class="mb-4"/>

            {/*<h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
              <div class="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required/>
                <label class="custom-control-label" for="credit">Credit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required/>
                <label class="custom-control-label" for="debit">Debit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required/>
                <label class="custom-control-label" for="paypal">Paypal</label>
              </div>
            </div>*/}
            <h4 class="mb-3">Payment</h4>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required/>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required/>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <hr class="mb-4"/>
            <button class="add-to-cart" type="submit">Continue to checkout</button>
          </form>
        </div>

        <div className="col order-total-black sticky">
            <div className="black-heading">
                <h4 class="fw-bolder">Order summary</h4>
            </div>
            {order?(
            <div class=" p-3">
            <p className="fw-bolder">Items:</p>
            <ul class="list-group list-group-flush mb-3">
            {order.items.map(i => (
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 class="my-0">{i.offerDto.title}</h6>
                    </div>
                    <span class="fw-bold">${i.offerDto.price}</span>
                </li>  
            ))
            }
            </ul>
            <p className="fw-bolder">Selected shipping method:</p>
            <p>{order.shippingMethod}</p>
            <hr></hr>                                                   
            <p>Order total: <span className="fw-bolder">${order.orderTotal}</span></p> 
            </div> 
             ) :  (<span>Loading...</span>)}

        </div>
      </div>
    </div>
  )}