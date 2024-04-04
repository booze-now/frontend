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
      const drink = drinkList[drink_id];
      const unitData = drink?.units.filter((u) => u.amount === Number(amount) && u.unit === unit)
      const unitPrice = unitData !== undefined && unitData.length? unitData[0].unit_price : undefined;

      const ret = {
        id: drink_id,
        name: drink?.name ?? `Drink #${drink_id}`,
        amount,
        unit: unit ?? 'glass',
        unitPrice: unitPrice,
        quantity,
      };
      return ret;
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
