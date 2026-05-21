import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

// ---------- Constants ----------
const STORAGE_KEY = 'ematech_cart_v1';
const CURRENCY = 'MAD';
const FREE_SHIPPING_THRESHOLD = 1000; // MAD
const STANDARD_SHIPPING_FEE = 49; // MAD

// ---------- Context ----------
const CartContext = createContext(null);

// ---------- Initial State ----------
const initialState = {
  items: [] // { id, name, price, image, quantity, brand, category }
};

// ---------- Load From Storage ----------
const loadInitialState = () => {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      return { items: parsed.items };
    }
    return initialState;
  } catch (err) {
    console.warn('Ematech cart: failed to read localStorage', err);
    return initialState;
  }
};

// ---------- Reducer ----------
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const qty = Math.max(1, Number(quantity) || 1);
      const existing = state.items.find((it) => it.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.id === product.id ? { ...it, quantity: it.quantity + qty } : it
          )
        };
      }
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        quantity: qty
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.payload.id)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const safeQty = Math.max(1, Number(quantity) || 1);
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === id ? { ...it, quantity: safeQty } : it
        )
      };
    }

    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.payload.id ? { ...it, quantity: it.quantity + 1 } : it
        )
      };
    }

    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((it) =>
            it.id === action.payload.id ? { ...it, quantity: it.quantity - 1 } : it
          )
          .filter((it) => it.quantity > 0)
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'HYDRATE': {
      return action.payload || initialState;
    }

    default:
      return state;
  }
};

// ---------- Provider ----------
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadInitialState);

  // Persist to localStorage on every change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Ematech cart: failed to write localStorage', err);
    }
  }, [state]);

  // Derived totals (memoized)
  const totals = useMemo(() => {
    const itemsCount = state.items.reduce((sum, it) => sum + it.quantity, 0);
    const subtotal = state.items.reduce(
      (sum, it) => sum + Number(it.price) * it.quantity,
      0
    );
    const shipping =
      subtotal === 0
        ? 0
        : subtotal >= FREE_SHIPPING_THRESHOLD
          ? 0
          : STANDARD_SHIPPING_FEE;
    const total = subtotal + shipping;
    return { itemsCount, subtotal, shipping, total };
  }, [state.items]);

  // Helpers
  const addToCart = (product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });

  const removeFromCart = (id) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const incrementItem = (id) =>
    dispatch({ type: 'INCREMENT', payload: { id } });

  const decrementItem = (id) =>
    dispatch({ type: 'DECREMENT', payload: { id } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const isInCart = (id) => state.items.some((it) => it.id === id);

  const getItemQuantity = (id) => {
    const item = state.items.find((it) => it.id === id);
    return item ? item.quantity : 0;
  };

  // Currency formatter for MAD
  const formatPrice = (amount) => {
    const value = Number(amount) || 0;
    const formatted = new Intl.NumberFormat('fr-MA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
    return `${formatted} ${CURRENCY}`;
  };

  const value = {
    items: state.items,
    itemsCount: totals.itemsCount,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    currency: CURRENCY,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementItem,
    decrementItem,
    clearCart,
    isInCart,
    getItemQuantity,
    formatPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ---------- Hook ----------
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>.');
  }
  return ctx;
};

export default CartContext;
