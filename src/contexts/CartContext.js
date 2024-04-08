import { createContext, useContext, useState } from "react";
import { useConfig } from "./ConfigContext";
import { useApi } from "./ApiContext";
import { useMessages } from "./MessagesContext.js";
import { useTranslation } from "./TranslationContext";

const CartContext = createContext();

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [drinkList, setDrinkList] = useState([]);
  const { get } = useApi();
  const { realm } = useConfig();
  const { addMessage } = useMessages();
  const { __ } = useTranslation();

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
        const response = await get("menu-tree");
        const drinks = response.data;
        const drinkList = updateDrinkList(drinks);
        setMenu(drinks);
        setDrinkList(drinkList);
        setLoaded(true);
      } catch (error) {
        // error.response.status == 401
        addMessage("danger", error.statusText);
        console.warn(error);
      }
    }
  };

  const updateDrinkList = (drinks) => {
    const drinkList = {};
    Object.keys(drinks ?? {}).forEach((key) => {
      // főkategóriák
      const outCat = drinks[key];
      Object.keys(outCat.drinks ?? {}).forEach((key) => {
        // főkategóris italok
        const drink = outCat.drinks[key];
        if (drink.unit === null) {
          drink.unit = __("glass");
        }
        drinkList[drink.id] = drink;
      });
      Object.keys(outCat.subcategory ?? {}).forEach((key2) => {
        // alkategóriák
        const inCat = outCat.subcategory[key2];
        Object.keys(inCat.drinks ?? {}).forEach((key) => {
          // főkategóris italok
          const drink = inCat.drinks[key];
          if (drink.unit === null) {
            drink.unit = __("glass");
          }
          drinkList[drink.id] = drink;
        });
      });
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
    amount = Number(amount);
    const key = `${drink_id}|${amount}|${unit}`;
    const newCartItems = { ...cartItems };
    delete newCartItems[key];
    setCartItems(newCartItems);
    console.log("removeFromCart:", key, "removed");
    localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
  };

  const addToCart = (drink_id, amount, unit, quantityToAdd, mode = "add") => {
    amount = Number(amount);
    console.log("addToCart", { drink_id, amount, unit, quantityToAdd, mode });
    const key = `${drink_id}|${amount}|${unit ?? ""}`;
    const currentQuantity = cartItems[key] || 0;
    let newQuantity = quantityToAdd;
    if (mode === "add") {
      newQuantity += currentQuantity;
    }

    if (newQuantity < 0) {
      newQuantity = 0;
    }

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
        if (mode === "add" && quantityToAdd > 0) {
          addMessage("success", "Added :drink to cart", { drink: drink.name });
        }
        if (mode === "add" && quantityToAdd < 0) {
          addMessage("success", "Removed :drink from cart", {
            drink: drink.name,
          });
        }
      } else {
        addMessage(
          "warning",
          `Selected unit not found for drink_id: ${drink_id}, amount: ${amount}, unit: ${unit}`
        );
      }
    } else {
      addMessage("warning", `Drink not found for drink_id: ${drink_id}`);
    }
  };

  const detailedCartItems = () => {
    const drinkList = getDrinkList();

    const ret = Object.entries(cartItems)
      .map(([key, quantity]) => {
        const { drink_id, amount, unit } = parseKey(key);
        const drink = drinkList[drink_id];
        if (drink) {
          const selectedUnit = drink.units.find(
            (u) => parseFloat(u.amount) === amount && u.unit === unit
          );
          if (selectedUnit) {
            const unitPrice = Number(selectedUnit.unit_price);
            return {
              id: drink_id,
              name: drink.name || `Drink #${drink_id}`,
              amount,
              unit: unit,
              unitPrice,
              quantity: Number(quantity),
              key,
              total: quantity * unitPrice,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
      .filter((item) => item !== null);
    console.log("details", ret);
    return ret;
  };

  const calculateCartTotal = () => {
    let grandTotal = 0;
    Object.entries(cartItems).forEach(([key, value]) => {
      const { drink_id, amount, unit } = parseKey(key);
      const drink = drinkList[drink_id];
      let unitPrice = 0;
      const selectedUnit = drink.units.find(
        (u) => parseFloat(u.amount) === amount && u.unit === unit
      );
      if (selectedUnit) {
        unitPrice = selectedUnit.unit_price;
      } else {
        unitPrice = NaN; // ez itt hiba
      }

      // console.log("cartItem", key, value, "*", drink, "total:", grandTotal);
      grandTotal += Number(value) * Number(unitPrice);
    });

    return grandTotal;
  };

  return (
    <CartContext.Provider
      value={{
        getMenu,
        cartItems,
        detailedCartItems,
        calculateCartTotal,
        addToCart,
        removeFromCart,
        getDrinkList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const parseKey = (key) => {
  const [keyId, keyAmount, keyUnit] = key.split("|");
  const drink_id = Number(keyId);
  const amount = Number(keyAmount);
  const unit = keyUnit === "" ? null : keyUnit;
  return { drink_id, amount, unit };
};

export const useCart = () => useContext(CartContext);
