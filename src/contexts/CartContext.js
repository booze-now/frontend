import { createContext, useContext, useState } from "react";
import { useConfig } from "./ConfigContext";
import { useApi } from "./ApiContext";

const CartContext = createContext();

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [drinkList, setDrinkList] = useState([]);
  const { get } = useApi();
  const { realm } = useConfig();

  const [cartItems, setCartItems] = useState(() => {
    // LOAD
    const jsonItems = localStorage.getItem(CART_KEY);
    const items = jsonItems !== null ? JSON.parse(jsonItems) : {};
    // console.log('Cart loaded from localStorage', items)
    return items;
  });


  const loadDrinks = async () => {
    console.log('loadDrinks called')
    if (!loaded && realm) {
      try {
        console.log("load #1");
        const response = await get("menu-tree")
        const drinks = response.data;
        const drinkList = updateDrinkList(drinks);
        setMenu(drinks);
        setDrinkList(drinkList);
        setLoaded(true)
        console.log("load #2");
      } catch (error) {
        console.log("load #3");
        // error.response.status == 401
        console.warn(error);
        // addMessage("danger", error.response.data.error);
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
      Object.keys(outCat.subcategory ?? {}).forEach((key2) => { // alkategóriáK
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
    const empty = menu === null || Object.keys(menu).length === 0

    if (empty) {
      return loadDrinks();
    }

    return menu;
  };

  const getDrinkList = () => {
    if (!drinkList) {
      loadDrinks();
    }
    return drinkList;
  };

  const addToCart = (drink_id, amount, unit, quantity) => {
    const key = `${drink_id}|${amount}|${unit}`;
    const cartItemsCopy = { ...cartItems };
    // if (cartItemsCopy.hasOwnProperty(key)) {
    //   // van már italunk
    //   cartItemsCopy[key] = quantity;
    // } else {
    cartItemsCopy[key] = quantity;
    // }

    if (cartItemsCopy[key] < 1) {
      delete cartItemsCopy[key];
    }

    setCartItems(cartItemsCopy);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItemsCopy));

    // alert(
    //   `Added ${amount} ${unit} of ${drinkList[id]} to cart`
    // );
  };

  const removeFromCart = (drink_id, amount, unit) => {
    const key = `${drink_id}|${amount}|${unit}`;
    const newCartItems = { ...cartItems };
    delete newCartItems[key];
    setCartItems(newCartItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
  };

  const detailedCartItems = () => {

    const drinkList = getDrinkList()

    return Object.entries(cartItems).map(([key, quantity]) => {
      const [drink_id, amount, unit] = key.split("|");

      return {
        id: drink_id,
        name: drinkList[drink_id]?.name ?? 'N/A',
        amount,
        unit,
        quantity,
      };
    });
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