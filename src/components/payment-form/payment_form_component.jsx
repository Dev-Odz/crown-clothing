import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, BUTTON_TYPES_CLASSES } from "../button/button_component";
import { PaymentFormContainer, FormContainer } from "./payment_form_styles";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart_context";
import { UserContext } from "./../../contexts/user_context";

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const { cartTotal } = useContext(CartContext);
	const { currentUser } = useContext(UserContext);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e) => {
		e.preventDefault();

		/** Check if stripe or elements are falsy */
		if (!stripe || !elements) {
			return;
		}
		
		/** If above is truthy, set to true */
		setIsProcessingPayment(true);

		/** Call server-less function using POST method */
		/** We use this by installing netlify dev in order to run function without server */
		try {
			const response = await fetch(
				"/.netlify/functions/create_payment_intent",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ amount: cartTotal * 100 }),
				}
			);

			const res = await response.json();

			/** Destructure response */
			/** Get the client_secret and pass to paymentIntent variable */
			const {
				paymentIntent: { client_secret },
			} = res;

			/** Call confirmCardPayment method of stripe */
			const paymentResult = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: currentUser ? currentUser : "Guest" ,
					},
				},
			});

			if (paymentResult.error) {
				alert(paymentResult.error);
			} else {
				if (paymentResult.paymentIntent.status === "succeeded") {
					alert("Payment Succeeded");
				}
			}
		} catch (err) {
			console.error("Payment failed:", err);
		}
	};
	return (
		//** Wrap Form Container with PaymentFormContainer to enable stripe component */
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<Button disabled={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted} type="submit">
					Pay now
				</Button>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
