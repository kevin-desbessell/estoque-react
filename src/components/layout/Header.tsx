import { Link, useLocation } from "react-router-dom";
import { FiPackage, FiGrid, FiPlusCircle } from "react-icons/fi";

const navItems = [
    { to: "/", label: "Início", icon: FiGrid },
    { to: "/produtos", label: "Produtos", icon: FiPackage },
];

export default function Header() {
    const { pathname } = useLocation();

    const isActive = (to: string) =>
        to === "/" ? pathname === "/" : pathname.startsWith("/produtos");

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link to="/" className="brand">
                    <FiPackage className="brand__icon" />
                    <span>Estoque Obra</span>
                </Link>

                <nav className="nav">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`nav__link ${isActive(to) ? "nav__link--active" : ""}`}
                        >
                            <Icon />
                            <span>{label}</span>
                        </Link>
                    ))}

                    <Link to="/produtos/novo" className="nav__cta">
                        <FiPlusCircle />
                        <span>Novo produto</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}