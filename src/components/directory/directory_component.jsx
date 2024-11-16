import DirectoryItem from "../directory-item/directory_item_component";
import "./directory_styles.scss";
const Directory = ({ categories }) => {
	return (
		<div className="categories-container">
			{categories.map(({ title, id, imageUrl }) => (
				<DirectoryItem key={id} id={id} imageUrl={imageUrl} title={title} />
			))}
		</div>
	);
};

export default Directory;
