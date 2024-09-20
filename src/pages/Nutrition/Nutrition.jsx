import "./NutritionStyle.css"
import Nav from "../Nav/Nav";
import NutritionEntry from "./NutritionEntry";
import Progress from "./ProgressBar";
import { useState,useEffect } from "react"
import axios from "axios";

export default function Nutrition(){
    const [mealList, setMealList] = useState([])
    const [meal,setMeal] = useState(null)
    const [foodName,setFoodName] = useState("")
    const [foodData, setFoodData] = useState([])
    const [ingredient,setIngredient] = useState("")
    const [amount,setAmount] = useState(0)
    const [click,setclick]= useState(true)
    const[weight,setWeight] = useState(68)
    const[height,setHeight] = useState(68)
    const[age,setAge] = useState(68)
    const[gender,setGender] = useState("Male")
    const[activityLevel,setActivityLevel] = useState(0)
    const[dietaryRestrictions, setDietaryRestrictions] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        axios.get("http://127.0.0.1:8000/api/v1/nutrition/").then((response)=>{
            setMealList(response.data)
        }).catch((error)=>{
            console.log(error)
        })
        axios.get("http://127.0.0.1:8000/api/v1/survey/view/").then((response)=>{
            setWeight(Math.floor(response.data[0]['weight']/2.205))
            setHeight(Math.floor(response.data[0]['height']*2.54))
            setAge(Math.floor(response.data[0]['age']))
            setGender(response.data[0]['gender'])
            setActivityLevel(response.data[0]['activity_level'])
            setDietaryRestrictions(response.data[0]['dietary_restrictions'])
        }).catch((error)=>{
            console.log(error)
        })
    },[click])
    useEffect(()=>{
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=4aoaIKsciqsf7EfdYfXZOl3XgW2n8179rwc9gZRW&query=${foodName}&dataType=Branded`).then((response)=>{
            const foodSearch = response.data.foods
            setFoodData(foodSearch)
        }).catch((error)=>{
            console.log(error)
        })
    },[foodName])

    const addFood = async()=>{
        try{
            const token = localStorage.getItem("token")
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.post("http://127.0.0.1:8000/api/v1/nutrition/1/",{meal})
        }catch(error){
            console.log(error)
        }
        setclick(!click)
    }

    return( 
            <div>
            <Nav />
                
            <div className="nutrition-page">
                <div className="results nutrition-page-text">
                    <div className="resultsContainer">
                    <h2 className="nutrition-page-text">Results</h2>
                        <Progress mealList={mealList} weight={weight} height={height} age={age} gender={gender} activityLevel={activityLevel} dietaryRestrictions={dietaryRestrictions}/>
                    </div>
                </div>
                <div className="nutrition-entry">
                    <h2 className="nutrition-page-text">Today I Ate</h2>
                    <div>
                        <select name="" id="" onChange={(e)=>{setMeal(e.target.value)
                        console.log(meal)}}>
                            <option value="">Pick A Meal</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>
                        <button className="new-button" onClick={addFood}>Start a Meal</button>
                    </div>
                    <div className="mealList">
                            {mealList.map((mealItem)=>{
                                const today = new Date()
                                const todayDateString = today.toISOString().split('T')[0]
                                const itemDate = new Date(mealItem.created_at)
                                const itemDateString = itemDate.toISOString().split('T')[0]
                                if (itemDateString === todayDateString) {
                                    return <ul key={mealItem.id}> <h2 className="nutrition-page-text-meal">{mealItem.meal}</h2> <button className="new-button" onClick={async()=>{
                                        try{
                                            const token = localStorage.getItem("token")
                                            axios.defaults.headers.common["Authorization"] = `Token ${token}`
                                            const response =  await axios.delete(`http://127.0.0.1:8000/api/v1/nutrition/${mealItem.id}/`)
                                            console.log(response)
                                        }catch(error){
                                            console.log(error)
                                        }
                                        setclick(!click)
                                    }}>Delete meal</button>
                                <NutritionEntry key={mealItem.id} mealItem={mealItem} mealList={mealList} setMealList={setMealList} meal={meal} setMeal={setMeal} foodName={foodName} setFoodName={setFoodName} foodData={foodData} addFood={addFood} setIngredient={setIngredient} ingredient={ingredient} setclick={setclick} click={click}/>
                                {mealItem.ingredients.map((ingredient)=>{
                                    return(<li key={ingredient.id}>
                                    <h2 className="nutrition-page-text">{ingredient.name}, {ingredient.amount_consumed}</h2> <input type="text" placeholder="enter amount" onChange={(event)=>{setAmount(event.target.value)}} /> <button className="new-button" onClick={(async()=>{
                                        try{
                                            const token = localStorage.getItem("token")
                                            axios.defaults.headers.common["Authorization"] = `Token ${token}`
                                            const response =  await axios.put(`http://127.0.0.1:8000/api/v1/nutrition/${mealItem.id}/ingredient/${ingredient.id}/`,{amount})
                                            console.log(response)
                                        }catch(error){
                                            console.log(error)
                                        }
                                        setclick(!click)
                                    })}>add amount</button>
                                     <button className="new-button" onClick={async()=>{
                                         try{
                                             const token = localStorage.getItem("token")
                                             axios.defaults.headers.common["Authorization"] = `Token ${token}`
                                             const response =  await axios.delete(`http://127.0.0.1:8000/api/v1/nutrition/${mealItem.id}/ingredient/${ingredient.id}/`)
                                             console.log(response)
                                            }catch(error){
                                                console.log(error)
                                            }
                                            setclick(!click)
                                        }}>delete</button>
                                    </li>)

})}
                            </ul>
                        }
                            })}
                            </div>
                            </div>
                            


        </div>
                
                
            </div>
    )
}

