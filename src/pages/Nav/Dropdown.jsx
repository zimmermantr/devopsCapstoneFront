import React, {useState} from "react";
// import {fitnessDropdown} from "./NavItems"
import { Link } from "react-router-dom";
import './dropdownStyle.css'

export const Dropdown = ({name, items}) => {
    const [dropdown, setDropdown] = useState(false);
    
    return (
        <>
            <ul 
            className={dropdown ? `${name}-submenu clicked` : `${name}-submenu`} 
            onClick={() => setDropdown(!dropdown)}
            >
                {items.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link
                            to={item.path} 
                            className={item.cName} 
                            onClick={() => setDropdown(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}