import { useNavigate } from "react-router-dom"
import { api } from "../../Api";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";


export const LOButton = () => {
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false)
    const {setUser} = useContext(userContext)
    
    useEffect(() => {
        
    },[logout]);

    const logOut = async() => {
        try{
            setLogout(true)
            let response = await api.post('users/logout/')
            if (response.status === 200){
              localStorage.removeItem('token')
              setUser(null)
              delete api.defaults.headers.common['Authorization']
              navigate('/')
            }

        } catch(error) {
            console.log(error, 'error removing token')
        }
      }


    return (
        <button className="btn2"
        onClick={logOut}
        >Log Out</button>
    )
}
export default LOButton;