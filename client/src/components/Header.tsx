import {Link, NavLink} from "react-router";
import logo from "../assets/logo-header.png";

const Header = () => {
    return (
        <>
            <header className="w-full flex justify-between items-center bg-secondary text-white p-4">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} className="size-24" alt="Logo PuckTracker" />
                    <h1 className="text-3xl font-logo">PuckTracker</h1>
                </Link>
                <nav>
                    <ul className="flex items-center gap-6">
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
