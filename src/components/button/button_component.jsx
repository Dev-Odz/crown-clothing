/*

default

inverted

google sign in

*/

import {
	BaseButton,
	GoogleSignInButton,
	InvertedButton,
} from "./button_styles";

const BUTTON_TYPES_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
	// This code is similar to accessing the value of a key:value pair using [key]
	// [buttonType] => whatever the value of the buttonType here gets the value from
	/*	[BUTTON_TYPES_CLASSES.base]: BaseButton,
		[BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPES_CLASSES.inverted]: InvertedButton,	*/
	({
		[BUTTON_TYPES_CLASSES.base]: BaseButton,
		[BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{children}
		</CustomButton>
	);
};

export { Button, BUTTON_TYPES_CLASSES };
