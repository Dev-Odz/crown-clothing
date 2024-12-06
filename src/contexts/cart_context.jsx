import { createContext, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// If found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, productToReduce) => {
	// find if cartItems contains productToReduce
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToReduce.id
	);
	// If found, decrement quantity
	if (existingCartItem) {
		return cartItems
			.map((cartItem) =>
				cartItem.id === productToReduce.id
					? { ...cartItem, quantity: cartItem.quantity - 1 }
					: cartItem
			)
			.filter((cartItem) => cartItem.quantity !== 0);
	}
};

const removeCartItem = (cartItems, productToRemove) => {
	// find if cartItems contains productToRemove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	// If found, remove item
	if (existingCartItem) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => null,
	cartItems: [],
	addItemToCart: () => null,
	reduceItemToCart: () => null,
	removeItemToCart: () => null,
	itemTotalCount: 0,
	cartTotal: 0,
});

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	itemTotalCount: 0,
	cartTotal: 0,
};

const CART_ACTION_TYPES = {
	SET_CART_OPEN: "SET_CART_OPEN",
	ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
	REDUCE_ITEM_TO_CART: "REDUCE_ITEM_TO_CART",
	REMOVE_ITEM_TO_CART: "REMOVE_ITEM_TO_CART",
	SET_ITEM_TOTAL_COUNT: "SET_ITEM_TOTAL_COUNT",
	SET_CART_TOTAL: "SET_CART_TOTAL",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	console.log(type);

	switch (type) {
		case "SET_CART_OPEN":
			return {
				isCartOpen: payload,
			};

		case "ADD_ITEM_TO_CART":
			return {
				cartItems: payload,
			};
		case "REDUCE_ITEM_TO_CART":
			return {
				cartItems: payload,
			};
		case "REMOVE_ITEM_TO_CART":
			return {
				cartItems: payload,
			};
		case "SET_ITEM_TOTAL_COUNT":
			return {
				itemTotalCount: payload,
			};
		case "SET_CART_TOTAL":
			return {
				cartTotal: payload,
			};

		default:
			break;
	}
};

const CartProvider = ({ children }) => {
	// const [isCartOpen, setIsCartOpen] = useState(false);
	// const [cartItems, setCartItems] = useState([]);
	// const [itemTotalCount, setItemTotalCount] = useState(0);
	// const [cartTotal, setCartTotal] = useState(0);

	/**Cart useReducers */
	const [{ isCartOpen }, dispatchIsCartOpen] = useReducer(
		cartReducer,
		INITIAL_STATE
	);
	const [{ cartItems }, dispatchCartItems] = useReducer(
		cartReducer,
		INITIAL_STATE
	);
	const [{ itemTotalCount }, dispatchItemTotalCount] = useReducer(
		cartReducer,
		INITIAL_STATE
	);
	const [{ cartTotal }, dispatchCartTotal] = useReducer(
		cartReducer,
		INITIAL_STATE
	);

	/**useReducer's dispatcher */
	const setIsCartOpen = (value) => {
		dispatchIsCartOpen({
			type: CART_ACTION_TYPES.SET_CART_OPEN,
			payload: value,
		});
	};

	const addItemToCart = (productToAdd) => {
		dispatchCartItems({
			type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
			payload: addCartItem(cartItems, productToAdd),
		});
	};

	const reduceItemToCart = (productToReduce) => {
		dispatchCartItems({
			type: CART_ACTION_TYPES.REDUCE_ITEM_TO_CART,
			payload: reduceCartItem(cartItems, productToReduce),
		});
	};

	const removeItemToCart = (productToRemove) => {
		dispatchCartItems({
			type: CART_ACTION_TYPES.REMOVE_ITEM_TO_CART,
			payload: removeCartItem(cartItems, productToRemove),
		});
	};

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		dispatchItemTotalCount({
			type: CART_ACTION_TYPES.SET_ITEM_TOTAL_COUNT,
			payload: newCartCount,
		});
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		dispatchCartTotal({
			type: CART_ACTION_TYPES.SET_CART_TOTAL,
			payload: newCartTotal,
		});
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		reduceItemToCart,
		removeItemToCart,
		itemTotalCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
