import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from '../Nav/Button';
import { api } from '../../Api';
import { userContext } from '../../App';
import Nav from '../Nav/Nav';


const Sbackground = styled.div`
background: grey;
height: 100vh;

display: flex;
justify-content: space-between;

`;

const Ssideborder = styled.div`
background: #1B1919;
// height: 100vh;
width: 15%;

display: flex;
align-items: center;
justify-content: center;

writing-mode: vertical-rl;
text-orientation: mixed;

font-size: 4.5rem;
color: #c776f650;
text-shadow: #c776f640 1px 20px 15px;
`;

const Smid = styled.div`
display: flex;
flex-direction: column;
align-items: center;


`;

const Sh1 = styled.h1`
font-size: 3rem;
color:white;
`;

const Sp = styled.p`
width:80%;
text-align: center;
font-size: 1.25rem;
color: white;
`;

const Squestions = styled.div`
background: #1B191990;
width: 90%;
padding: 2rem;
border-radius:2rem;

display: flex;
flex-direction: column;
`;

const SQ = styled.div`
width:24%;
background: #1B1919;
border-radius: 2rem;

padding: 4rem 2rem;

display: flex;
flex-direction: column;
align-items: center;
margin: 2rem 0;
`
const SQ2 = styled.div`
width:33%;
background: #1B1919;
border-radius: 2rem;

padding: 4rem 2rem;

display: flex;
flex-direction: column;
align-items: center;
margin: 2rem 0;
`

const SQ1_3 = styled.div`
display: flex;
justify-content: space-evenly;
flex-wrap: wrap;

`;

const Sh6 = styled.h6`
color: white;

`;

const Sinput = styled.input`
text-align: center;
`;






export default function Survey() {
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('')
    const [activityLevel, setActivityLevel] = useState(0)
    const [dietaryRestrictions, setDietaryRestrictions] = useState(false)
    const [equipment, setEquipment] = useState('')
    const navigate = useNavigate()
    
    const {user, validUser} = useContext(userContext)
    
    useEffect(()=> {
        validUser();
      }, []);
    
  

    const postSurvey = async() => {
    try{
        const token = localStorage.getItem("token")
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await api.post("survey/",{
            "user_id": user.id,
            "height": height,
            "weight": weight,
            "age": age,
            "gender": gender,
            "activity_level": activityLevel,
            "dietary_restrictions": dietaryRestrictions,
            "equipment": equipment
        })
            navigate('/user/info/')
    }
        catch(error) {
            console.error('error posting survey', error)
    }
        
    }


    return (
        <>
        <Nav/>
            <Sbackground>
                <Ssideborder>
                    Shred The Competiton
                </Ssideborder>
                
                <Smid>
                {user && <h6 style={{fontSize:'.4rem'}}>{user.id}</h6>}
                
                <Sh1>Please Fill Out The Form Below</Sh1>
                
                <Sp>Your nutrition and fitness goals are our top priority! Your answers will provide us with essential insights into your current fitness level, dietary preferences, and goals, allowing us to design a program that's perfectly suited to you. Our mission is to help you achieve the results you desire, and your input is the first step toward that success. Fill out the questionnaire now, and let Shredder transform your fitness journey into an efficient and personalized experience.</Sp>

                <Squestions>
                   
                <SQ1_3>
                    <SQ>
                        <Sh6>What's your height in inches?</Sh6>
                        <Sinput type='text' placeholder="5'0 = 60 / 6'0 = 72" onChange={(e)=> setHeight(e.target.value)} />
                    </SQ>

                    <SQ>
                        <Sh6>What's your weight in pounds?</Sh6>
                        <Sinput type='text' placeholder="0" onChange={(e)=> setWeight(e.target.value)}/>
                    </SQ>

                    <SQ>
                        <Sh6>What's your age?</Sh6>
                        <Sinput type='text' placeholder="0" onChange={(e)=> setAge(e.target.value)}/>
                    </SQ>

                    <SQ>
                        <Sh6>What's your gender?</Sh6>
                        <Form.Select aria-label="Gender" onChange={(e) => setGender(e.target.value)}>
                            <option></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </SQ>

                    <SQ2>
                        <Sh6>What's your activity level?</Sh6>
                        <Form.Select aria-label="Default select example" onChange={(e)=> setActivityLevel(e.target.value)}>
                            <option></option>
                            <option value={0.8}>Low Activity</option>
                            <option value={0.8}>Normal</option>
                            <option value={1.4}>Endurance Athlete</option>
                            <option value={1.7}>Body Builder/Heavy Strength Training</option>
                        </Form.Select>
                    </SQ2>

                    <SQ2>
                        <Sh6>Are you vegan or vegetarian?</Sh6>
                        <Form.Select aria-label="Dietary Restrictions" onChange={(e) => setDietaryRestrictions(e.target.value === 'true')}>
                            <option></option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </SQ2>

                    <SQ2>
                        <Sh6>What type of gym equipment is available to you?</Sh6>
                        <Form.Select aria-label="Gym Equipment" onChange={(e) => setEquipment(e.target.value)}>
                            <option></option>
                            <option value="full_gym">Full Gym</option>
                            <option value="db_only">Dumbbells Only</option>
                            <option value="bodyweight">No Gym / Bodyweight only</option>
                        </Form.Select>
                    </SQ2>

                    <Sh6>Please review your answers and submit when ready.</Sh6>
                    <button className="btn2" onClick={() => postSurvey()}>Submit</button>
                </SQ1_3>
                </Squestions>

                
                



                </Smid>
                
                <Ssideborder>
                    Welcome to Shredder
                </Ssideborder>

            </Sbackground>
        </>
    )
}