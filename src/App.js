import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Counter from "./routes/test/test.component";
import { setCurrentUser } from "./store/user/user.action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
				console.log("this user was created", user);
			}
			dispatch(setCurrentUser(user));
			console.log("this is the user:", user);
		});
		return unsubscribe;
	}, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="test" element={<Counter />} />
      </Route>
    </Routes>
  );
};

export default App;
