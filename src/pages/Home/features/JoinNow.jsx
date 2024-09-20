import styled from 'styled-components'
import Button from '../../Nav/Button.jsx'

const Join = styled.div`
height: 10rem;
background: #100e0eb2;
color: whitesmoke;
display: flex;
justify-content: center;
align-items: center;

text-align: center;

margin-top: 5rem;

@media screen and (max-width:  767px){
    flex-direction: column;
    height: auto;
    padding:2rem;
}
`

const JoinTitle = styled.div`
font-size: 2rem;

@media screen and (max-width:  767px){
    font-size: 1.5rem;
}
`
const JoinText = styled.div`
font-size: 2rem;
@media screen and (max-width:  767px){
    font-size: 1rem;
}
`
const JoinLeft = styled.div`
display: flex;
flex-direction: column;
padding: 4rem;

@media screen and (max-width:  767px){
    padding: 2rem;
}
`

const JoinNow = ({title, text}) => {

    return (
        <Join>
            <JoinLeft>
                <JoinTitle>{title}</JoinTitle>
                <JoinText>{text}</JoinText>
            </JoinLeft>
            <Button text='Sign Up' linkto='/signup/' />
        </Join>
    )
}

export default JoinNow;