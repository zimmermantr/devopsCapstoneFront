import { Link } from "react-router-dom";
import { navItems, fitnessDropdown, nutritionDropdown, userDropdown } from "./NavItems";
import './navStyle.css'
import Button from "./Button.jsx";
import { Dropdown } from "./Dropdown";
import { useState, useContext } from "react";
import { userContext } from "../../App";
import LOButton from "./LOButton";

export const Nav = () => {
    const {user, setUser} = useContext(userContext);
    const [ntrDropdown, setNtrDropdown] = useState(false);
    const [fitDropdown, setFitDropdown] = useState(false);
    const [myPlanDropdown, setMyPlanDropdown] = useState(false);

    const handleFitMouseEnter = () => {
        setFitDropdown(true);
        setNtrDropdown(false); // Hide other dropdowns
        setMyPlanDropdown(false);
      };
    
    const handleNtrMouseEnter = () => {
        setNtrDropdown(true);
        setFitDropdown(false); // hide other dropdowns
        setMyPlanDropdown(false);
      };

    const handleMyPlanMouseEnter = () => {
        setMyPlanDropdown(true);
        setFitDropdown(false); // hide other dropdowns
        setNtrDropdown(false);
    }
    
    const handleMouseLeave = () => {
        setFitDropdown(false);
        setNtrDropdown(false);
        setMyPlanDropdown(false);
      };
    

    return (
        <>
            <nav className="Navbar">
                <div className="logo">
                <img src="/shredderLogo1.png" alt="" />
                </div>
                <ul className="nav-items">
                    {
                        navItems.map((item) => {

                            if (item.title ==='Fitness')            //if hover over fitness link
                            {
                            return (
                                <li 
                                key={item.id} 
                                className={item.cName}
                                onMouseEnter={handleFitMouseEnter}
                                onMouseLeave={ handleMouseLeave}
                                >
                                    <Link className='link' to={item.path}>
                                        {item.title}
                                    </Link>
                                    {fitDropdown && <Dropdown name='fitness' items={fitnessDropdown} />}
                                    |
                                </li>
                            );
                            } else if (item.title === 'Nutrition'){     //if hover over ntr link
                                return (
                                    <li 
                                    key={item.id} 
                                    className={item.cName}
                                    onMouseEnter={handleNtrMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                        <Link className='link' to={item.path}>
                                            {item.title}
                                        </Link>
                                        {ntrDropdown && <Dropdown name='nutrition' items={nutritionDropdown} />}
                                        |
                                    </li>
                                );
                            } else if (item.title === 'My Plan'){     //if hover over My Plan link
                                return (
                                    <>
                                    
                                        <li 
                                        key={item.id} 
                                        className={item.cName}
                                        onMouseEnter={handleMyPlanMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                        <Link className='link' to={item.path}>
                                        {item.title}
                                        </Link>
                                         
                                        {user && myPlanDropdown && <Dropdown name='user' items={userDropdown} />}
                                    
                                        |
                                        </li>

                                    </>
                                );
                            } 
                            else {
                            return (
                                <li key={item.id} className={item.cName}>
                                    <Link className='link' to={item.path}>{item.title}</Link>
                                    |
                                </li>
                                );
                            }
                        })
                    }
                </ul>
                {user ? <LOButton /> : <Button text='Log In' linkto='/login/' />}
                
            </nav>
            

        </>
    )
}

export default Nav;