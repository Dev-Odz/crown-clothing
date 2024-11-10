import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/007 crown.svg";
import "./navigation_styles.scss";
import { UserContext } from "../../contexts/user_context";
import { CartContext } from "../../contexts/cart_context";
import { signOutUser } from "../../utils/firebase/firebase_utils";
import CartIcon from "./../../components/cart-icon/cart_icon_component";
import CartDropdown from "../../components/cart-dropdown/cart_dropdown_component";

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
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<Link onClick={handleLogOut} className="nav-link" to="/auth">
							SIGN OUT
						</Link>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>

			<Outlet />
		</Fragment>
	);
};

export default Navigation;
