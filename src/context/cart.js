import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get("http://localhost:8080/api/client/purchase/myOrder", {withCredentials: true})
          .then(response => setOrder(response.data))
          .catch(error => {
            console.log("error fetching cart")
            }
      );
  }, []);

    const addToCart = (offer) => {
        console.log("add" + offer.id);
        axios.get(`http://localhost:8080/api/client/purchase/addOffer/${offer.id}`, {withCredentials: true})/*WSZYSTKO NA KLIENTA 1 pOPRAWIC!!!! */
            .then(response => { console.log("przyszlo + "+response.data);
                setOrder(response.data)})
            .catch(error => console.error("Error adding to cart:", error));
        
        console.log(order);
    };

    const isInCart = (offer) => {
      if(!order || order.items.length === 0){
        return false;
      }

        if(order.items.some(i => i.offerDto.id === offer.id)){
          return true;
        }
        return false;
    }

    const removeFromCart = (itemId) => {
        if (!order) return;

        axios.delete(`http://localhost:8080/api/client/purchase/deleteOffer/${itemId}`, {withCredentials: true})
        .then(() => {
          // Re-fetch the updated cart
          axios.get(`http://localhost:8080/api/client/purchase/myOrder`, {withCredentials: true})
              .then(response => setOrder(response.data))
              .catch(error => console.error("Error fetching updated cart:", error));
        })
      .catch(error => console.error("Error removing from cart:", error));
    };

    const shippingMethod = () => {
      if(!order){
        return;
      }
      return order.shippingMethod;
    }

    const addShippingMethod = (shippingId) => {
      if (!order) return;
      console.log(shippingId);

      axios.post("http://localhost:8080/api/client/purchase/addShipping", shippingId, {withCredentials: true})
      .then(() => {
        // Re-fetch the updated cart
        axios.get(`http://localhost:8080/api/client/purchase/myOrder`, {withCredentials: true})
            .then(response => {
              console.log(response.data);
              setOrder(prevOrder => ({
              ...prevOrder, 
              orderTotal: response.data.orderTotal,
              shippingMethod: response.data.shippingMethod
          }))})
            .catch(error => console.error("Error fetching updated cart:", error));
      })
    .catch(error => console.error("Error adding shipping method:", error));
  };

    return (
        <CartContext.Provider
          value={{
            order,
            addToCart,
            removeFromCart,
            addShippingMethod,
            isInCart,
            shippingMethod
          }}
        >
          {children}
        </CartContext.Provider>
      );
}





