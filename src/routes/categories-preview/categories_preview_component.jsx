import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories_context";
import CategoryPreview from "../../components/category-preview/category_preview_component";

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</>
	);
};

export default CategoriesPreview;
