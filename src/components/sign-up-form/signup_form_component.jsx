import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase_utils";
import FormInput from "../form-input/form_input_component";
import "./sign_up_form_style.scss";
import { Button, BUTTON_TYPES_CLASSES } from "../button/button_component";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Returns if password and confirmPassword is not equal
		if (password !== confirmPassword) {
			alert("password do not match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Sign up error. Check if email is valid");
			}
			console.log("user creation encountered an error", error);
		}
	};

	return (
		<div className="sign-up-form">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					className="form-input"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

				<FormInput
					label="Email"
					className="form-input"
					type="email"
					onChange={handleChange}
					required
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					className="form-input"
					type="password"
					onChange={handleChange}
					required
					name="password"
					value={password}
				/>

				<FormInput
					label="Confirm Password"
					className="form-input"
					type="password"
					onChange={handleChange}
					required
					name="confirmPassword"
					value={confirmPassword}
				/>
				<Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit">
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
