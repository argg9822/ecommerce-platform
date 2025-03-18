import { NavLink } from "react-router-dom";

function Sidebar () {
    return (
        <nav>
            <ul className="flex flex-col gap-6">
                <li>
                    <NavLink 
                        to="/"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        >Home</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/clients"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        >Clientes</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/offers"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        >Configurar ofertas</NavLink>
                </li>
                <li className="dropdown">
                    <NavLink 
                        to="/products"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        >📦 Productos</NavLink>

                    <ul className="submenu flex gap-2 flex-col">
                        <li>
                            <NavLink 
                                to="/products/edit"
                                >Editar</NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/products/edit"
                                >Inventario</NavLink>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </nav>
    )
}

export default Sidebar;