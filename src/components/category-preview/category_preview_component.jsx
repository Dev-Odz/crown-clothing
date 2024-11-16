import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product_card_component";
import "./category_preview_styles.scss";

const CategoryPreview = ({ title, products }) => {
	const navigate = useNavigate();

	const navigateToProducts = (title) => {
		navigate(title);
	};

	return (
		<>
			<div className="category-preview-container">
				<h2>
					<span
						onClick={() => navigateToProducts(title.toLowerCase())}
						className="title">
						{title.toUpperCase()}
					</span>
				</h2>
				<div className="preview">
					{products
						.filter((_, idx) => idx < 4)
						.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			</div>
		</>
	);
};

export default CategoryPreview;
