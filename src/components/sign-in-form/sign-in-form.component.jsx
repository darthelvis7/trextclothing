import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./sign-in-form.styles.scss";
import { useDispatch } from "react-redux";
import { googleSignInStart } from "../../store/user/user.action";
import { onEmailSignInStart } from "../../store/user/user.saga";

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {

	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(onEmailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			console.log('user sign in failed', error)
			}
	};

	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value})
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
				<FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
				<div className="buttons-container">
					<Button type="submit">Sign In </Button>
					<Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In </Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;