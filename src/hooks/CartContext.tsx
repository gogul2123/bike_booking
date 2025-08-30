// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// type CartItem = {
//   _id: string;
//   brand: string;
//   model: string;
//   type: string;
//   transmission: string;
//   price_per_day_INR: number;
//   imageUrl: string | { src: string };
//   colors: string[];
//   selectedColor: string;
//   days: number;
//   quantity: number;
// };

// type CartContextType = {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   updateDays: (id: string, days: number) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const generateId = (item: Pick<CartItem, "_id" | "selectedColor">) =>
//     `${item._id}-${item.selectedColor}`;

  // // ✅ Load from localStorage on mount
  // useEffect(() => {
  //   const stored = localStorage.getItem("cart");
  //   if (stored) {
  //     setCartItems(JSON.parse(stored));
  //   }
  // }, []);

  // // ✅ Save to localStorage whenever cart updates
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prev) => {
//       const existingIndex = prev.findIndex(
//         (i) => generateId(i) === generateId(item)
//       );

//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         updated[existingIndex].quantity += item.quantity;
//         updated[existingIndex].days = item.days;
//         return updated;
//       } else {
//         return [...prev, item];
//       }
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems((prev) =>
//       prev.filter((item) => generateId(item) !== id)
//     );
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         generateId(item) === id
//           ? { ...item, quantity: Math.max(1, quantity) }
//           : item
//       )
//     );
//   };

//   const updateDays = (id: string, days: number) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         generateId(item) === id
//           ? { ...item, days: Math.max(1, days) }
//           : item
//       )
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         updateDays,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  _id: string;
  brand: string;
  model: string;
  type: string;
  transmission: string;
  price_per_day_INR: number;
  imageUrl: string;
  colors: string[];
  selectedColor: string;
  days: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateDays: (id: string, days: number) => void;
  clearCart: () => void;
  getCartItemCount: (bikeId: string) => number;
  getTotalCartItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const generateId = (item: Pick<CartItem, "_id" | "selectedColor">) =>
    `${item._id}-${item.selectedColor}`;

    // ✅ Load from localStorage on mount
    useEffect(() => {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    }, []);

    // ✅ Save to localStorage whenever cart updates
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

  // Load from memory on mount (since localStorage is not available in artifacts)
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => generateId(i) === generateId(item)
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        updated[existingIndex].days = item.days;
        return updated;
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => generateId(item) !== id)
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        generateId(item) === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updateDays = (id: string, days: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        generateId(item) === id
          ? { ...item, days: Math.max(1, days) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartItemCount = (bikeId: string): number => {
    return cartItems.reduce((total, item) => 
      item._id === bikeId ? total + item.quantity : total, 0
    );
  };

  const getTotalCartItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Don't render children until context is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateDays,
        clearCart,
        getCartItemCount,
        getTotalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};