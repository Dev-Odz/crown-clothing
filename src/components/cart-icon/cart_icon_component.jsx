import "./cart_icon_styles.scss";

import { ReactComponent as ShoppingIcon } from "../../assets/004 shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart_context";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen, itemTotalCount } = useContext(CartContext);

	const handleCartIconClick = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<div onClick={handleCartIconClick} className="cart-icon-container">
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{itemTotalCount}</span>
		</div>
	);
};

export default CartIcon;
