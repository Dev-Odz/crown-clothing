import {
	CartItemContainer,
	ItemDetails,
	ItemName,
} from "./cart_item_styles.jsx";

const CartItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${imageUrl}`} />
			<ItemDetails>
				<ItemName>{name}</ItemName>
				<ItemName>
					{quantity} x ${price}
				</ItemName>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
