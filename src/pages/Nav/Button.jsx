import { Link } from "react-router-dom";

export const Button = ({text, linkto}) => {
    

    return (
        //signup  |
        <Link to={linkto}> 
            <button className="btn2">{text}</button>
        </Link>
    )
}
export default Button;