import { useContext } from "react";
import Button from "../button/button_component";
import CartItem from "../cart-item/cart_item_component";
import "./cart_dropdown_styles.scss";
import { CartContext } from "../../contexts/cart_context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const gotoCheckout = () => {
		navigate("/checkout");
	};

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
				<Button onClick={gotoCheckout}>go to checkout</Button>
			</div>
		</div>
	);
};

export default CartDropdown;
