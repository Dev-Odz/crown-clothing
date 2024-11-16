import CategoriesPreview from "../categories-preview/categories_preview_component";
import "./shop_styles.scss";
import { Routes, Route } from "react-router-dom";
import Products from "../../components/products/products_component";
import { CategoriesContext } from "../../contexts/categories_context";
import { useContext } from "react";

const Shop = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<Route
						key={title}
						path={title}
						element={<Products key={title} title={title} products={products} />}
					/>
				);
			})}
		</Routes>
	);
};

export default Shop;
