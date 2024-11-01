import "./category_item_styles.scss";

const CategoryItem = ({ title, id, imageUrl }) => {
	return (
		<div key={id} className="category-container">
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className="category-body-container">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default CategoryItem;
