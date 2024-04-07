import { createContext, useContext, useState } from "react";
import { useConfig } from "./ConfigContext";
import { useApi } from "./ApiContext";
import { useMessages } from "./MessagesContext.js";

const CartContext = createContext();

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [drinkList, setDrinkList] = useState([]);
  const { get } = useApi();
  const { realm } = useConfig();
  const { addMessage } = useMessages();

  const [cartItems, setCartItems] = useState(() => {
    // LOAD
    const jsonItems = localStorage.getItem(CART_KEY);
    const items = jsonItems !== null ? JSON.parse(jsonItems) : {};
    // console.log('Cart loaded from localStorage', items)
    return items;
  });


  const loadDrinks = async () => {
    if (!loaded && realm) {
      try {
        const response = await get("menu-tree")
        const drinks = response.data;
        const drinkList = updateDrinkList(drinks);
        setMenu(drinks);
        setDrinkList(drinkList);
        setLoaded(true)
      } catch (error) {
        // error.response.status == 401
        addMessage("danger", error.statusText);
        console.warn(error);
      }
    }
  };

  const updateDrinkList = (drinks) => {
    const drinkList = {};
    Object.keys(drinks ?? {}).forEach((key) => { // főkategóriák
      const outCat = drinks[key];
      Object.keys(outCat.drinks ?? {}).forEach((key) => { // főkategóris italok
        const drink = outCat.drinks[key]
        drinkList[drink.id] = drink;
      });
      Object.keys(outCat.subcategory ?? {}).forEach((key2) => { // alkategóriák
        const inCat = outCat.subcategory[key2]
        Object.keys(inCat.drinks ?? {}).forEach((key) => { // főkategóris italok
          const drink = inCat.drinks[key]
          drinkList[drink.id] = drink;
        });
      })
    });
    return drinkList;
  };

  const getMenu = () => {
    loadDrinks();
    return menu;
  };

  const getDrinkList = () => {
    loadDrinks();
    return drinkList;
  };


  const removeFromCart = (drink_id, amount, unit) => {
    const key = `${drink_id}|${amount}|${unit}`;
    const newCartItems = { ...cartItems };
    delete newCartItems[key];
    setCartItems(newCartItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
  };

  const addToCart = (drink_id, amount, unit, quantityToAdd) => {
    const key = `${drink_id}|${amount}|${unit}`;
    const currentQuantity = cartItems[key] || 0;
    const newQuantity = currentQuantity + quantityToAdd;
  
    const cartItemsCopy = { ...cartItems };
    cartItemsCopy[key] = newQuantity;
  
    if (cartItemsCopy[key] <= 0) {
      delete cartItemsCopy[key];
    }
  
    setCartItems(cartItemsCopy);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItemsCopy));
  
    const drink = drinkList[drink_id];
    if (drink) {
      const parsedAmount = parseFloat(amount);
      const selectedUnit = drink.units.find(
        (u) => parseFloat(u.amount) === parsedAmount && u.unit === unit
      );
      if (selectedUnit) {
        const unitPrice = selectedUnit.unit_price;
        addMessage("success", `Added ${drink.name} to cart`);
      } else {
        addMessage("warning", `Selected unit not found for drink_id: ${drink_id}, amount: ${amount}, unit: ${unit}`);
      }
    } else {
      addMessage("warning", `Drink not found for drink_id: ${drink_id}`);
    }
  };
  
  const detailedCartItems = () => {
    const drinkList = getDrinkList();
  
    return Object.entries(cartItems).map(([key, quantity]) => {
      const [drink_id, amount, keyUnit] = key.split("|");
      const unit = keyUnit === 'null' ? null : keyUnit;
      const drink = drinkList[drink_id];
      if (drink) {
        const parsedAmount = parseFloat(amount);
        const selectedUnit = drink.units.find(
          (u) => parseFloat(u.amount) === parsedAmount && u.unit === unit
        );
        if (selectedUnit) {
          const unitPrice = selectedUnit.unit_price;
          return {
            id: Number(drink_id),
            name: drink.name || `Drink #${drink_id}`,
            amount,
            unit: unit || 'glass',
            unitPrice,
            quantity,
          };
        } else {
          return null; 
        }
      } else {
        return null;
      }
    }).filter((item) => item !== null); 
  };
  

  return (
    <CartContext.Provider
      value={{
        getMenu,
        cartItems,
        detailedCartItems,
        addToCart,
        removeFromCart,
        getDrinkList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
