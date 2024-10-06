import { useEffect, useContext, useState } from "react";
import { userContext } from "../../App";
import { api } from "../../Api";
import Nav from "../Nav/Nav";
import { BMI, FluidReq, KcalPerKg, LbsToKg, ProteinReq, hwagaMSJkcal, idealBW } from "../Calculators";
import styled from 'styled-components'
import Features from "../Home/features/Features";

const Ubody = styled.div`
background:#1B1919f0;
color: whitesmoke;
`

const Udiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Udiv2 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;
`

const UdivText = styled.div`
width: 80%;

margin-top: 10%;
display: flex;
// flex-direction: column;
align-items: center;

`

const Uul = styled.ul`
margin: 3rem;
width: 50%;
`
const Uli = styled.li`
margin-left:5rem;
margin-bottom: 0.5rem;
`

const Utext = styled.p`
font-size:1.25rem;
width: 81%;
text-align: left;
text-indent: 2rem;

`

const Uh2 = styled.h2`
font-size: 2rem;
padding-bottom: 1rem;
`
const Uh3 = styled.h3`
font-size: 1.5rem;
text-align: center;
margin-bottom: 2rem;
margin-top: 2rem;

background: grey;

padding: 5rem 0;
`
const Uh1 = styled.h1`
font-size: 2.5rem;
text-align: center;

margin-top: 10rem;
`


const FeatMainDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
// align-items: center;
width: 100%;

padding: 5rem 0; 
`

const FeatRowDiv = styled.div`
display: flex;
justify-content: center;
padding: 0.5rem;
`





export default function UserInfo () {
    const {user, validUser} = useContext(userContext)
    const [loading, setLoading] = useState(true)
    const [ideal, setIdeal] = useState(0)
    const [lower, setLower] = useState(0)
    const [upper, setUpper] = useState(0)
    const [idealArr, setIdealArr] = useState([])
    const [msjkcal, setMsjkcal] = useState(0)
    const [fluids, setFluids] = useState(0)

    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('')
    const [activityLevel, setActivityLevel] = useState('')
    
    

    useEffect(() => {
        validUser();
      }, []);
    
      useEffect(() => {
        if (user.survey_responses[0]) {
          setHeight(user.survey_responses[0].height);
          setWeight(user.survey_responses[0].weight);
          setAge(user.survey_responses[0].age);
          setGender(user.survey_responses[0].gender);
          setActivityLevel(user.survey_responses[0].activity_level);
        }
      }, [user]);
    
      useEffect(() => {
        // Ensure height and weight are available before calculations
        if (height > 0 && weight > 0) {
          const newIdealArr = idealBW(height);
          setLower(newIdealArr[0]);
          setIdeal(newIdealArr[1]);
          setUpper(newIdealArr[2]);
          setMsjkcal(hwagaMSJkcal(height, weight, age, gender, activityLevel));
          setFluids(FluidReq(age, LbsToKg(weight)));
          setLoading(false);
        }
      }, [height, weight, age, gender, activityLevel]);

    return (
        <>
            <Nav />
<Ubody>

            <Udiv>
            <UdivText>
                <Udiv2>


                <Uh2>Your journey to a healthier lifestyle begins here.</Uh2>
                <Utext>
                    We're here to provide you with personalized insights that will help you reach your fitness and wellness goals. Scroll down and take the first step towards a healthier, happier you. Your body deserves it! 
                </Utext>
                </Udiv2>
                    <Uul>
                    <Uh2>Unlock the secrets to your well-being:</Uh2>
                    <Uli>
                    🏋️‍♀️ Discover your BMI and ideal weight range.
                    </Uli>
                    <Uli>
                    🍽️ Learn about your daily recommended calorie intake.
                    </Uli>
                    <Uli>

                    💧 Stay hydrated with the perfect daily water goal.
                    </Uli>
                    <Uli>

                    💪 Understand your daily protein requirements.
                    </Uli>

                    </Uul>
                </UdivText>
            </Udiv>
                    <Uh3>
                     Continue down the page and discover valuable information tailored just for you.
                    </Uh3>

                    <Uh1>Your Personalized Info:</Uh1>
            {loading ? <h1>Loading Your Information...</h1>
                     : user ?
                     <>
                     <FeatMainDiv>
    
                     <FeatRowDiv>
                    
                        
                        <Features
                        imageSRC='/features/infoPage/scale.png'
                        title={`${weight} lbs`}
                        description='Current Weight'
                        />
                        
                    
                        <Features
                        imageSRC='/features/infoPage/bmi.png'
                        title={BMI(height,weight)}
                        description='Current Body Mass Index'
                        />
                        </FeatRowDiv>
                        <FeatRowDiv>
                        <Features
                        imageSRC='/features/infoPage/ideal2.png'
                        title={`${ideal} lbs`}
                        description='Ideal Body Weight For Your Height'
                        />
                        <Features
                        imageSRC='/features/infoPage/range.png'
                        title={`${lower}-${upper} lbs`}
                        description='Ideal Body Weight Range'
                        />
                        <Features
                        imageSRC='/features/infoPage/meal.png'
                        title={`${msjkcal} kcal`}
                        description='Recommended Daily Caloric Intake'
                        />
                        </FeatRowDiv>
                        <FeatRowDiv>
                        <Features
                        imageSRC='/features/infoPage/meats.png'
                        title={`${ProteinReq(activityLevel, weight)}grams`}
                        description='Recommended Protein Intake'
                        />
                        <Features
                        imageSRC='/features/infoPage/water.png'
                        title={fluids}
                        description='Recommended Daily Fluid Intake'
                        />
                        </FeatRowDiv>
                        </FeatMainDiv>
            {/* <h6>{`weight: ${weight}`}</h6>
            <h6>{`height: ${height}`}</h6>
            <h6>{`age: ${age}`}</h6>
            <h6>{`BMI: ${BMI(height,weight)}`}</h6>
            <h6>{`activityLevel: ${activityLevel}`}</h6>
            <h6>{`ideal weight: ${ideal}`}</h6>
            <h6>{`ideal weight range: ${lower}-${upper}`}</h6>
            <h6>{`total recommended calories: ${msjkcal}`}</h6>
            <h6>{`total recommended calories: ${KcalPerKg(30, weight)}`}</h6>
            <h6>{`You should be drinking around ${fluids} per day.`}</h6>
            <h6>{`Daily Protein Requirements: ${ProteinReq(activityLevel, weight)}grams`}</h6> */}
            </>
            : <h6>userInfo</h6>
        }
        </Ubody>
        </>
    )
}