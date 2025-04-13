import {Link} from "react-router";

const Header = () => {
    return (
        <>
            <header className="w-full flex justify-center items-center bg-gray-800 shadow-lg">
                <Link to="/" className="text-4xl text-white py-4">PuckTracker</Link>
            </header>
        </>
    )
}
export default Header
