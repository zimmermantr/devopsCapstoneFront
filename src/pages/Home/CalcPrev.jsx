import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { InchToCm, KcalPerKg, LbsToKg, ProteinReq, BMI } from '../Calculators';


const CalcHp = styled.div`
margin: 4rem 2rem;
padding-bottom: 4rem;
display: flex;
flex-direction: row;
justify-content: space-evenly;


@media screen and (max-width:  1025px){
    flex-direction: column;
    justify-content: center;
    align-items:center;

}

`
const CalcHpLeft = styled.div`
background: #100e0eb2;
border-radius: 2rem;
padding: 3rem;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

color: whitesmoke;

width:50%;
@media screen and (max-width:  1025px){
    width: 100%;
}
`

const CalcHpRPhone = styled.div`
background-image: url('/phone2.png');
background-repeat: no-repeat;
background-size: cover;
background-position: center;

padding:3rem;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and (max-width:  1025px){
    margin: 2rem;
}


`;

const PhoneDisplay = styled.div`
// background: yellow;
border-radius: 2rem;
color: white;
height: 26rem;
width: 13.5rem;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`

const InnerPhoneH2 = styled.h5`
margin-top: 1rem;
color: whitesmoke;
text-align: center;
text-wrap: balance;
font-size: 1.5rem;
`
const CalcP = styled.h6`
font-size: 1.25rem;

padding:1rem;
word-wrap:break-word;
width:95%;
text-indent: 2rem;
margin-bottom: 1rem;
`
const CalcInput = styled.input`
    color: purple;
    background:whitesmoke;
    margin-top: 1rem;
`
const CalcPic = styled.img`

`

const CAh2 = styled.h2`
font-size:1.8rem;
padding:1rem;
`

const CalcPrev = ({title, text,    }) => {
    const [dropBtnTitle, setDropBtnTitle] = useState('Calculations');
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [calc, setCalc] = useState(0);

    const proteinEquation = () => {
        setCalc(1)
        setDropBtnTitle('Protein Requirements')
    }
    const bmiEquation = () => {
        setCalc(2)
        setDropBtnTitle('Body Mass Index')
    }
    const calorieEquation = () => {
        setCalc(3)
        setDropBtnTitle('Daily Calorie Recommendation')
    }

    return (
        <>
            <CalcHp>

                <CalcHpLeft>
                    <CAh2>{title}</CAh2>
                    <CalcP>{text}</CalcP>




                    <CAh2>What would you like to calculate?</CAh2>

                    <DropdownButton id="dropdown-basic-button" title={dropBtnTitle}>
                        <Dropdown.Item onClick={() => proteinEquation()}>Protein Requirements</Dropdown.Item>
                        <Dropdown.Item onClick={() => bmiEquation()}>Body Mass Index</Dropdown.Item>
                        <Dropdown.Item onClick={() => calorieEquation()}>Daily Calories</Dropdown.Item>
                    </DropdownButton>

                    {calc === 2 ?
                    <CalcInput type="text" placeholder='height in inches' 
                    onChange={(e)=> setHeight(e.target.value)}/>
                    : ''}

                    {calc > 0 ?
                    <CalcInput type="text" placeholder='weight in pounds' 
                    onChange={(e)=> setWeight(e.target.value)} />
                    : ''}

                </CalcHpLeft>

                <CalcHpRPhone>
                    <PhoneDisplay>

                        {calc === 1 ? <CalcPic src='/features/shake.png'/>
                        : calc===2 ? <CalcPic src='/features/infoPage/bmi.png'/>
                        :calc === 3 ? <CalcPic src='/features/infoPage/meal.png'/>
                        : <CalcPic src='/features/calc.png'/>}


                        <InnerPhoneH2>
                            {dropBtnTitle}
                        </InnerPhoneH2>
                        <InnerPhoneH2>
                            {calc === 1 ? (weight && `${Math.floor(ProteinReq(0.8,weight))}g of protein`)
                            : calc === 2 ? (height && weight && `${(BMI(height, weight))} BMI`)
                            : calc === 3 ? (weight && `${Math.floor(KcalPerKg(25,weight))} calories/day`)
                            : ''}
                        </InnerPhoneH2>
            


                    </PhoneDisplay>
                </CalcHpRPhone>

            </CalcHp>
        </>
    )
};

export default CalcPrev;