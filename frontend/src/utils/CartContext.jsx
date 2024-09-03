import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({children}) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/v1/cart', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                })

                const cartItems = response.data.cart;
                const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
                setQuantity(totalQuantity)
            }catch(e){
                console.error('Failed to fetch cart data:', e);
            }
        }

        fetchCartData();
    },[])

    return (
        <CartContext.Provider value={{quantity, setQuantity}}>
            {children}
        </CartContext.Provider>
    )
}
