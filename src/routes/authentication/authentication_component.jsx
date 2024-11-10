import SignUpForm from "../../components/sign-up-form/signup_form_component";
import SignInForm from "../../components/sign-in-form/signin_form_component";
import "./signin_styles.scss";

const Authentication = () => {

	return (
		<div className="authentication-container">
				<SignInForm />
				<SignUpForm />
		</div>
	);
};

export default Authentication;
