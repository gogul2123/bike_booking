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
  bikeId: string;
  brand: string;
  model: string;
  transmission: string;
  price_per_day_INR: number;
  imageUrl: string;
  days: number;
  quantity: number;
  // Optional fields that might be available
  vehicles: Record<string, any>[];
  selectedColor?: string;
  colors?: string[];
  type?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateDays: (id: string, days: number) => void;
  clearCart: () => void;
  getCartItemCount: (bikeId: string, selectedColor?: string) => number;
  getTotalCartItems: () => number;
  getTotalPrice: () => number;
  getCartItemsByBike: (bikeId: string) => CartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bike, setBike] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate unique ID for cart items based on bikeId and selectedColor (if available)
  const generateId = (item: Pick<CartItem, "bikeId" | "selectedColor">) =>
    item.selectedColor ? `${item.bikeId}-${item.selectedColor}` : item.bikeId;

  // Initialize the cart context
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addToCart = (item: CartItem) => {
    console.log("Adding to cart:", item);
    setCartItems((prev) => {
      const itemId = generateId(item);
      const existingIndex = prev.findIndex((i) => generateId(i) === itemId);

      if (existingIndex !== -1) {
        // Update existing item - add quantity and update days
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
          days: item.days, // Use the latest days value
        };
        return updated;
      } else {
        // Add new item to cart
        return [...prev, { ...item }];
      }
    });
    console.log("Cart items after adding:", cartItems);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => generateId(item) !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        generateId(item) === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const updateDays = (id: string, days: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        generateId(item) === id ? { ...item, days: Math.max(1, days) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  // Get cart item count for a specific bike (and optionally specific color)
  const getCartItemCount = (bikeId: string, selectedColor?: string): number => {
    return cartItems.reduce((total, item) => {
      if (item.bikeId === bikeId) {
        // If color is specified, match both bikeId and color
        if (selectedColor) {
          return item.selectedColor === selectedColor
            ? total + item.quantity
            : total;
        }
        // If no color specified, count all items for this bike
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  // Get total number of items in cart
  const getTotalCartItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of all items in cart
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      return total + item.price_per_day_INR * item.days * item.quantity;
    }, 0);
  };

  // Get all cart items for a specific bike
  const getCartItemsByBike = (bikeId: string): CartItem[] => {
    return cartItems.filter((item) => item.bikeId === bikeId);
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
        getTotalPrice,
        getCartItemsByBike,
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
