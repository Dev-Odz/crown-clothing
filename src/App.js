import Home from "./routes/home/home_component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation_component";
import Authentication from "./routes/authentication/authentication_component";
import Shop from "./routes/shop/shop_component";
import Checkout from "./routes/checkout/checkout_component";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
