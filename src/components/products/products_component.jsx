import ProductCard from "../product-card/product_card_component";
import "./products_styles.scss";

const Products = ({ title, products }) => {
	return (
		<>
			<div className="products-container">
				<h2>
					<span className="title">{title.toUpperCase()}</span>
				</h2>
				<div className="products">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</>
	);
};

export default Products;
