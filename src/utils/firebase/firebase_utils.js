import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBTl66BeItNYY9zGDSMVHPnaPPAQjC-bL0",
	authDomain: "crown-clothing-db-3770a.firebaseapp.com",
	projectId: "crown-clothing-db-3770a",
	storageBucket: "crown-clothing-db-3770a.firebasestorage.app",
	messagingSenderId: "282219193730",
	appId: "1:282219193730:web:3ecbecf199bb8d77d81b9b",
	measurementId: "G-CZKF11H7D9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

// Get FireStore Instance
export const db = getFirestore();

// In order to save a collection in the firestore, you need to pass a collection key (per object) and the objects to be stored
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

export const getCollectionAndDocuments = async () => {
	const collectionRef = collection(db, "categories");

	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
		const { title, items } = docSnapShot.data();

		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	console.log("categoryMap", typeof categoryMap);

	return categoryMap;
};

// Create User Document From Auth
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	// Get user document reference by providing the fireStore instance, collection, and uid of the specific user
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	// if user data does not exist
	// create / set the document with the data from userAuth in my collection

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	// if user data does exist
	// return userDocRef

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	const response = await createUserWithEmailAndPassword(auth, email, password);

	return response;
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	const response = await signInWithEmailAndPassword(auth, email, password);

	return response;
};

export const signOutUser = async () => {
	await signOut(auth);
};

export const onAuthStateChangedListener = (callBack) =>
	onAuthStateChanged(auth, callBack);
