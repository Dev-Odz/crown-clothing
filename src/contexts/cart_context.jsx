import { createContext, useEffect, useState } from "react";

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

const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [itemTotalCount, setItemTotalCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setItemTotalCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const reduceItemToCart = (productToReduce) => {
		setCartItems(reduceCartItem(cartItems, productToReduce));
	};

	const removeItemToCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		reduceItemToCart,
		removeItemToCart,
		itemTotalCount,
		setItemTotalCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
