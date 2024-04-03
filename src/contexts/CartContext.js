import { createContext, useContext, useState } from "react";
import { useConfig } from "./ConfigContext";
import { useApi } from "./ApiContext";

const CartContext = createContext();

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
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
  const load = async () => {
    if (realm) {
      try {
        console.log("load #1");
        const response = await get("menu-tree");
        const drinks = response.data;
        console.log(drinks);
        //          setDrinks(drinks);
        updateDrinkList(drinks);
        console.log("load #2");
        return drinks;
      } catch (error) {
        console.log("load #3");
        //setDrinks(null);
        console.log(error);
        // error.response.status == 401
        console.warn(error);
        // addMessage("danger", error.response.data.error);
      }
    }
  };

  const getMenu = () => {
    const empty = menu === null || Object.keys(menu).length === 0

    if (empty) {
      console.log("getMenu #1");
      return load();
    }
    console.log("getMenu #2", menu);

    return menu;
  };

  const getDrinkList = () => {
    if (!drinkList) {
      load();
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

  const updateDrinkList = (drinks) => {
    const drinkList = {};
    // console.log('drinks', drinks)

    Object.keys(drinks ?? {}).forEach((key) => {
      const item = drinks[key];
      console.log(item)
      drinkList[item.id] = item;
      Object.keys(item.subcategory.drinks ?? {}).forEach((key2) => {
        const item2 = item.subcategory.drinks[key2]
        drinkList[item2.id] = item2;
      });
    });
    console.log(drinkList);
    setMenu(drinks);
    setDrinkList(drinkList);
  };

  const detailedCartItems = () => {
    return Object.entries(cartItems).map(([key, quantity]) => {
      const [drink_id, amount, unit] = key.split("|");

      return {
        id: drink_id,
        name,
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
        updateDrinkList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
