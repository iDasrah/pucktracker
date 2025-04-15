import {Link, NavLink} from "react-router";
import logo from "../assets/logo-header.png";
import {Menu} from "lucide-react";

const Header = () => {
    const handleMenuClick = () => {
        const menu = document.querySelector(".menu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    }

    return (
        <>
            <header className="bg-secondary text-white">
                <div className="flex justify-around items-center">
                    <Menu onClick={handleMenuClick} className="size-8 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden" />
                    <Link to="/">
                        <div className="flex justify-center items-center">
                            <img src={logo} className="size-26" alt="Logo PuckTracker" />
                            <h1 className="font-logo text-2xl">PuckTracker</h1>
                        </div>
                    </Link>
                </div>
                <nav className="">
                    <ul className="menu hidden w-full flex flex-col items-center justify-center">
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
