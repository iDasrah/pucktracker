import {Link, NavLink} from "react-router";
import logo from "../assets/logo-header.png";
import {Menu} from "lucide-react";

const Header = () => {
    const handleMenuClick = () => {
        const menu = document.querySelector(".menu");
        if (menu) {
            menu.classList.toggle("hidden");
            menu.classList.toggle("flex");
        }
    }

    return (
        <>
            <header className="bg-secondary text-white md:flex md:justify-between md:items-center">
                <div className="flex justify-around items-center md:justify-start">
                    <Menu onClick={handleMenuClick} className="size-8 md:hidden lg:hidden xl:hidden 2xl:hidden" />
                    <Link to="/">
                        <div className="flex justify-center items-center">
                            <img src={logo} className="size-26" alt="Logo PuckTracker" />
                            <h1 className="font-logo text-2xl">PuckTracker</h1>
                        </div>
                    </Link>
                </div>
                <nav className="md:pr-4">
                    <ul className="menu hidden w-full flex-col items-center pb-4 justify-center gap-4 md:pb-0 md:justify-end md:flex md:flex-row">
                        <li className="nav-item">
                            <NavLink to="/teams">
                                Equipes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/players">
                                Joueurs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/games">
                                Matchs
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Header
