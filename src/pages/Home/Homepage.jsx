import Nav from "../Nav/Nav";
import './homepageStyle.css'
import Features from "./features/Features";
import JoinNow from "./features/JoinNow";
import CalcPrev from "./CalcPrev";
// Frontend/src/pages/Home/homepageStyle.css
import { useEffect, useContext } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Homepage = () => {
    const {user} = useContext(userContext)
    useEffect(()=>{
        console.log(user)
      },[])

    const navigate = useNavigate();

    const handleFeatureClick = (path) => {
        navigate()
    }

    return (
        <>
                <Nav />
        <div className="FullMain">
            {/* <div className="spacer"></div> */}
            <div className="MainHome">

                <div className="homePic">
                    <div className="space"></div>
                    <div className="homeText">
                        <h1>Shredder Fitness/Nutrition Planner</h1>
                        <p>
                        Welcome to Shredder, your ultimate fitness and nutrition companion! With user-friendly features, personalized nutrition guidance, and real-time tracking capabilities, Shredder is your partner in sculpting a stronger, healthier, and happier you. Say goodbye to guesswork and hello to success with Shredder, because your fitness journey begins here!
                        </p>

                    </div>
                </div>


                <div className="featuresHeader">
                    <div className="f1">Develop healthy habits</div>
                    <div className="f2">Count your calories, ensure you're meeting nutrient targets, and see your progress over time.</div>
                </div>


                <div className="features">
                   
                
                        <Features
                            imageSRC='/features/icons8-gym-64.png'
                            title='Workout Programs'
                            description='Browse through our selection of ready-to-go workout programs'
                            />
                                               
                        
                        <Features
                            imageSRC='/features/icons9.png'
                            title='My Workouts'
                            description='Design and modify your own workouts to personalize them to your fitness levels'
                            />
                        
                        <Features
                            imageSRC='/features/icons10.png'
                            title='Exercises'
                            description='Explore our vast library of excerises and add them to your custom workouts'
                            />
                       
                        <Features
                            imageSRC='/features/icons11.png'
                            title='Nutrition Dashboard'
                            description='Monitor your daily nutritional progress with our interactive dashboard'
                            />
                        
                        <Features
                            imageSRC='/features/icons12.png'
                            title='My Plan'
                            description='Browse and review your saved workout programs and custome made workouts'
                            />
                        
                        <Features
                            imageSRC='/features/icons13.png'
                            title='Health Survey'
                            description='Monitor your fitness journey by regularly updating our custom fitness survey'
                            />
                        
                </div>
                
                
                
                {/* <div className="Why">
                    div.
                    We understand that achieving your health and fitness goals can be a challenging journey, which is why we've created the Shredder workout tracker to simplify and supercharge your fitness routine. Whether you're looking to shed pounds, gain muscle, or simply lead a healthier lifestyle, Shredder is here to help you track your progress, stay motivated, and make every workout count.
                    
                </div> */}

                <div className="Why">
                {/* <div className="space"></div> */}
                <div className="homeText">
                    <h2>Why Join Shredder?</h2>
                    <p>
                    We understand that achieving your health and fitness goals can be a challenging journey, which is why we've created the Shredder workout tracker to simplify and supercharge your fitness routine. Whether you're looking to shed pounds, gain muscle, or simply lead a healthier lifestyle, Shredder is here to help you track your progress, stay motivated, and make every workout count.
                    </p>

                </div>

                </div>


                <JoinNow 
                    title='Like What You See?'
                    text='Sign up today for free!'
                    />

                <CalcPrev
                    title='Take control of your diet with our Calculators.'
                    text='Unlock the power of personalized health and fitness with our exclusive calculators. Sign up now to access a world of data-driven insights tailored just for you and enjoy full access to all our calculators. Start your journey to a healthier you today!'
                    />

            <div className="food">

                <div className="foodText">
                    <h2>
                        Introducing our Nutrition Meal Tracker: Your Personalized Path to Wellness!
                    </h2>
                    <p>
                    Our Nutrition Meal Tracker is your ultimate tool for maintaining a balanced diet and achieving your health goals. Whether you're looking to shed a few pounds, build muscle, or simply eat more mindfully, this intuitive tracker has got you covered.
                    Eating right has never been easier or more convenient.
                    </p>
                </div>








            </div>
            </div>
            {/* <div className="spacer"></div> */}
        </div>
        </>
    )
}

export default Homepage;