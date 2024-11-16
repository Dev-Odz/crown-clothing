import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/007 crown.svg";
import { UserContext } from "../../contexts/user_context";
import { CartContext } from "../../contexts/cart_context";
import { signOutUser } from "../../utils/firebase/firebase_utils";
import CartIcon from "./../../components/cart-icon/cart_icon_component";
import CartDropdown from "../../components/cart-dropdown/cart_dropdown_component";
import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from "./navigation_styles";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	const handleLogOut = async () => {
		try {
			await signOutUser();
		} catch (error) {
			console.log(error.code);
		}
	};

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={handleLogOut} to="/auth">
							SIGN OUT
						</NavLink>
					) : (
						<NavLink className="nav-link" to="/auth">
							SIGN IN
						</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>

			<Outlet />
		</Fragment>
	);
};

export default Navigation;
