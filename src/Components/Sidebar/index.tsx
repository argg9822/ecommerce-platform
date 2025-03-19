import { NavLink } from "react-router-dom";
import { InboxStackIcon, PercentBadgeIcon, UserGroupIcon, HomeIcon, PencilSquareIcon, CircleStackIcon } from '@heroicons/react/24/solid'

function Sidebar() {
    return (
        <nav className="p-3">
            <ul className="flex flex-col gap-2">
                <li>
                    <NavLink 
                        to="/"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        > <HomeIcon className="size-5 mr-3 text-blue-200"/> Home</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/clients"
                        className={ ({ isActive}) => isActive ? "active" : "" }
                        > <UserGroupIcon className="size-5 mr-3 text-blue-200"/> Clientes</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/offers"
                        className={ ({ isActive}) => isActive ? "flex active" : "flex" }
                        > <PercentBadgeIcon className="size-5 mr-3 text-blue-200"/>Configurar ofertas</NavLink>
                </li>
                <li className="dropdown">
                    <NavLink 
                        to="/products"
                        className={ ({ isActive}) => `flex-row ${isActive ? "active" : "" }` }
                        > <InboxStackIcon className="size-5 mr-3 text-blue-200"/> Productos</NavLink>
                        <ul className="submenu flex gap-2 flex-col">
                            <li>
                                <NavLink 
                                    to="/products/edit"
                                    className={({ isActive }) => `flex-row ${isActive ? "active" : "" }`}
                                    > <PencilSquareIcon className="size-5 mr-3 text-blue-200" /> Editar</NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/products/inventory"
                                    className={({ isActive }) => `flex-row ${isActive ? "active" : "" }`}
                                    > <CircleStackIcon className="size-5 mr-3 text-blue-200" /> Inventario</NavLink>
                            </li>
                        </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;