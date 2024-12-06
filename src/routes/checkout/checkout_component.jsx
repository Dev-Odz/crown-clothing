import "./checkout_styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart_context";
import CheckoutItem from "../../components/checkout-item/checkout_item_component";
import PaymentForm from "../../components/payment-form/payment_form_component";

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(CartContext);

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<span className="header-block">product</span>
				<span className="header-block">description</span>
				<span className="header-block">quantity</span>
				<span className="header-block">price</span>
				<span className="header-block">remove</span>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<span className="total">{`Total: $${cartTotal}`}</span>
			<PaymentForm />
		</div>
	);
};

export default Checkout;
