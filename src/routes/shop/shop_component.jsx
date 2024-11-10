import { useContext } from "react";
import { ProductsContext } from "../../contexts/products_context";
import ProductCard from "../../components/product-card/product_card_component";
import './shop_styles.scss'

const Shop = () => {
	const { products } = useContext(ProductsContext);
	return (
		<div className="products-container">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default Shop;
