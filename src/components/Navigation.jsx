import { Link } from "react-router-dom";

function Navigation () {
    return (
        <nav>
            <div>
                <div>
                    <span>Logo</span>
                </div>

                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/card">Card Detail</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;