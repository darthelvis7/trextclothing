// Importing necessary modules and functions
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// Creating a context for user data with initial values
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null, 
});

// Creating a component for providing user data to the app
export const UserProvider = ({ children }) => {
	// Setting up state for current user
	const [currentUser, setCurrentUser] = useState(null);
	// Creating a value object to be passed as context value
	const value = { currentUser, setCurrentUser };

	// Executing side effect after component mount or when dependencies change
	useEffect(() => {
		// Subscribing to the authentication state change listener
		const unsubscribe = onAuthStateChangedListener((user) => {
			// If user exists, create a document for the user in the database
			if (user) {
				createUserDocumentFromAuth(user);
			}
			// Update the current user state
			setCurrentUser(user);
		});

		// Returning a cleanup function to unsubscribe from the listener
		return unsubscribe;
	}, []);

	// Providing the user data context to the app's component tree
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
