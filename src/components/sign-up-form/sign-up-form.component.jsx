// Importing necessary modules and functions
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

// Default form field values
const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

// Component for sign-up form
const SignUpForm = () => {
	// Setting up state for form fields
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	// Logging the form fields
	console.log(formFields);

	// Function to reset the form fields to default values
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		// Checking if password and confirmPassword match
		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}
		try {
			// Creating an authentication user with email and password
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			// Creating a user document in the database
			await createUserDocumentFromAuth(user, { displayName });
			// Resetting the form fields
			resetFormFields();
		} catch (error) {
			// Handling errors during user creation
			if (error.code === "auth/email-already-in-use") {
				alert("cannot create user, email already in use");
			} else {
				console.log("user creation encountered an error:", error);
			}
		}
	};

	// Function to handle form field changes
	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(event.target);
		// Updating the form fields state with the changed value
		setFormFields({ ...formFields, [name]: value });
		console.log(name);
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
				<FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
				<FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
				<Button type="submit">Sign Up </Button>
			</form>
		</div>
	);
};

export default SignUpForm;