import "./product_card_styles.scss";
import Button from "../button/button_component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart_context";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartContext);

	const addProductToCart = () => addItemToCart(product);

	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button onClick={addProductToCart} buttonType="inverted">
				Add to card
			</Button>
		</div>
	);
};

export default ProductCard;