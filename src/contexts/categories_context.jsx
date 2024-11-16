import { createContext, useState, useEffect } from "react";

import {
	addCollectionAndDocuments,
	getCollectionAndDocuments,
} from "../utils/firebase/firebase_utils.js";

import SHOP_DATA from "../shop_data.js";

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		// addCollectionAndDocuments("categories", SHOP_DATA);

		const getCategoriesMap = async () => {
			const categoryMap = await getCollectionAndDocuments();
			console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};

		getCategoriesMap();
	}, []);

	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
