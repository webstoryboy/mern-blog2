import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="flex items-center justify-between py-3 mx-auto border-b max-w-7xl">
            <h1>
                <Link className="font-['Orbitron'] text-xl" to="/">
                    websloper
                </Link>
            </h1>
            <nav>
                <ul className="flex gap-4">
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/sign-up">signUp</Link>
                    </li>
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/sign-in">signIn</Link>
                    </li>
                    <li className="px-4 py-1 transition-all rounded-full hover:bg-slate-200">
                        <Link to="/dashboard?tab=profile">dashboard</Link>
                    </li>
                </ul>
            </nav>
            <div className="relative flex">
                <button
                    className="p-3 mr-1 text-center border rounded-full h-11 w-11 hover:bg-slate-100"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === "light" ? <FaSun /> : <FaMoon />}
                </button>
                {currentUser && (
                    <>
                        <img
                            className="mr-5 rounded-full w-11 h-11"
                            onClick={toggleMenu}
                            src={currentUser.profilePicture}
                        />

                        {isMenuOpen && (
                            <div className="absolute flex flex-col p-4 bg-white border shadow-md top-20 right-5 w-60">
                                <span>{currentUser.username}</span>
                                <span className="text-sm text-slate-600">{currentUser.email}</span>
                                <Link to={"/dashboard?tab=profile"} className="pt-3 mt-3 border-t hover:underline">
                                    profile
                                </Link>
                                <span className="pt-2 cursor-pointer hover:underline">sign out</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
