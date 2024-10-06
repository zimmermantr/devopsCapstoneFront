import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled from 'styled-components'
import { api } from '../../Api';
import { userContext } from '../../App';


const LiHeader = styled.div`
height: 7rem;

background: black;
`;

const LiBase = styled.div`
background-image: url('/loginBackground.avif');
background-repeat: no-repeat;
background-size: 100% 100%;


height: 87vh;

display:flex;
flex-direction: column;
justify-content: center;
// align-items: center;
`;

const LiBox = styled.div`
height: 30rem;
width: 30rem;
margin-left: 5rem;

background: #100e0eb2;
box-shadow: 10px 10px 10px 1px #1f202190;
border-radius: 2rem;

display:flex;
flex-direction: column;

align-items: center;

color: white;

`;

const Lih2 = styled.h2`
padding:2rem;
text-shadow: #000 1px 0px 4px;
font-size: 2rem;

margin-top: 4rem;
`;

const Lih5 = styled.h5`
padding-top:1rem;

font-size: 1rem;
text-shadow: #23272e 5px 3px 5px;
`;

const Lih6 = styled.h6`
text-shadow: #23272e 5px 3px 5px;
margin-bottom: 2rem;

`;

const LiBtn = styled.button`
border: none;
    background: transparent;
    padding: 4px 16px;
    font-size: 1.1rem;
    color: white;
    background: rgba(199, 118, 246, 0.719);   /* rgb(0,212,212) */
    border-radius: 5px;
    transition: 0.2s all ease-out;
    cursor: pointer;

    margin-top: 1.6rem;
    margin-bottom: 15px;
    
    &:hover {
        border: #c776f6b7 1px solid;
        box-shadow: 1px 5px 30px 1px #e8c0ffb7;
        background: whitesmoke;
        color: purple;
    }
`;

const LIInput = styled.input`
    color: purple;
`

const LIForm = styled.form`
    // background: white;
    display: flex;
    flex-direction: column;
    width:  60%;
`

const LILink = styled(Link)`
    padding-left: 5px;
    color: skyblue;

    &:hover {
        
        text-shadow: skyblue 0px 0px 10px;
        
        color: white;
    }
`

export default function LogIn() {
    const {setUser} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    
    const userLogIn = async(e) => {
        e.preventDefault();
        let response = await api.post("users/login/", {
            email: email,
            password: password
        });
        let user = response.data.user;
        let token = response.data.token;
        setUser(user);
        localStorage.setItem('token', token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        navigate('/')
    }

    return (
        <>
            <LiHeader />

            <LiBase>

                <LiBox>

                    <Lih2>
                        Welcome Back
                    </Lih2>
                    
                    <Lih6>New user?
                        <LILink to='/signup'>Sign up</LILink>
                    </Lih6>

                    <LIForm onSubmit={(e) => userLogIn(e)}>


                        <Lih5>Email</Lih5>
                        <LIInput type="text" placeholder='shredder@ripped.com' required onChange={(e) => setEmail(e.target.value)}/>

                        <Lih5>Password</Lih5>
                        <LIInput type="password" placeholder='*******' required onChange={(e) => setPassword(e.target.value)}/>

                        <LiBtn>Log In</LiBtn>

                    </LIForm>

                </LiBox>



            </LiBase>
        
        </>
    )
}