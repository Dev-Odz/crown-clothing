import CategoryItem from "../category-item/category_item_component";
import './directory_styles.scss'

const Directory = ({categories}) => {
    return (
			<div className="categories-container">
				{categories.map(({ title, id, imageUrl }) => (
					<CategoryItem id={id} imageUrl={imageUrl} title={title} />
				))}
			</div>
		);
}
 
export default Directory;