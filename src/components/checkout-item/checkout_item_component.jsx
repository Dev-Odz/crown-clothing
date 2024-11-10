import { useContext } from "react";
import "./checkout_item_styles.scss";
import { CartContext } from "../../contexts/cart_context";

const CheckoutItem = ({ cartItem }) => {
	const { addItemToCart, reduceItemToCart, removeItemToCart } =
		useContext(CartContext);

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
			</div>
			<span className="name">{cartItem.name}</span>
			<div className="quantity">
				<span className="arrow" onClick={() => reduceItemToCart(cartItem)}>
					{"<"}
				</span>
				<span className="value">{cartItem.quantity}</span>
				<span
					className="arrow"
					onClick={() => {
						addItemToCart(cartItem);
					}}>
					{">"}
				</span>
			</div>
			<span className="price">{cartItem.price}</span>
			<span
				onClick={() => removeItemToCart(cartItem)}
				className="remove-button">
				X
			</span>
		</div>
	);
};

export default CheckoutItem;
