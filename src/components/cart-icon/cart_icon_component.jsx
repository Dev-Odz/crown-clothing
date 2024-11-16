import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart_icon_styles";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart_context";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen, itemTotalCount } = useContext(CartContext);

	const handleCartIconClick = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<CartIconContainer onClick={handleCartIconClick}>
			<ShoppingIcon />
			<ItemCount>{itemTotalCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
