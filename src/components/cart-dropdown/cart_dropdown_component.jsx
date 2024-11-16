import { useContext } from "react";
import { Button, BUTTON_TYPES_CLASSES } from "../button/button_component";
import CartItem from "../cart-item/cart_item_component";
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from "./cart_dropdown_styles.jsx";
import { CartContext } from "../../contexts/cart_context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const gotoCheckout = () => {
		navigate("/checkout");
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}

				<Button buttonType={BUTTON_TYPES_CLASSES.base} onClick={gotoCheckout}>
					go to checkout
				</Button>
			</CartItems>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
