import { Input, FormInputLabel, GroupContainer } from "./form_input_styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
	return (
		<GroupContainer>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length}>
					{label}
				</FormInputLabel>
			)}
		</GroupContainer>
	);
};

export default FormInput;
