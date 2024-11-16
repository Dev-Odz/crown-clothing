import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from "./directory_item_styles.jsx";

const DirectoryItem = ({ title, id, imageUrl }) => {
	return (
		<DirectoryItemContainer key={id}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
