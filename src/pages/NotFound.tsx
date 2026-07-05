import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <section className="notfound">
            <FiAlertTriangle className="notfound__icon" />
            <h1>404</h1>
            <p>
                A página <code>{pathname}</code> não foi encontrada.
            </p>
            <div className="notfound__actions">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Voltar
                </button>
                <Link to="/" className="btn btn-primary">
                    <FiHome /> Ir para o início
                </Link>
            </div>
        </section>
    );
}