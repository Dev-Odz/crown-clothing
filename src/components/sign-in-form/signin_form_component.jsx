import { useState, useContext } from "react";
import {
	signInUserWithEmailAndPassword,
	// createUserDocumentFromAuth,
	signInWithGooglePopUp,
} from "../../utils/firebase/firebase_utils";
import FormInput from "../form-input/form_input_component";
import "./sign_in_form_style.scss";
import { Button, BUTTON_TYPES_CLASSES } from "../button/button_component";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopUp();
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				alert("Invalid Email or Password");
			}
		}
	};

	return (
		<div className="sign-in-form">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					onChange={handleChange}
					required
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					onChange={handleChange}
					required
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPES_CLASSES.google}
						onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
