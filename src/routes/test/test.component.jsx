import React, { useReducer } from 'react'

const initialState = {
	count: 0
};

// ACTION TYPES

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// REDUCER FUNCTION

const reducer = (state, action) => {
	switch (action.type) {
		case INCREMENT: 
			return { ...state, count: state.count + action.payload };
		case DECREMENT:
			return { ...state, count: state.count - action.payload};
		case RESET:
			return { ...state, count: 0};
		default: return state;
	}
};

const Counter = () => {
	console.log(initialState);
	console.log(reducer);
	const [state, dispatch] = useReducer(reducer, initialState);

	const increment = () => {
		dispatch({ type: INCREMENT, payload: 1 })
	};
	const decrement = () => {
		dispatch({ type: DECREMENT, payload: 1})
	};
	const reset = () => {
		dispatch( {type: RESET })
	};

	return (
		<div>
			<div>Count: {state.count}</div>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default Counter;