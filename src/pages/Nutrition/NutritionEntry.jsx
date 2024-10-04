import axios from "axios"
export default function NutritionEntry(props){
    const {mealItem, mealList,setMealList,meal,setMeal,foodName,setFoodName,foodData,addFood,setIngredient,ingredient,setclick,click}=props
    const addIngredient= async()=>{
        try{
            const token = localStorage.getItem("token")
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.post(`/nutrition/${mealItem.id}/ingredient/1/`,{ingredient})
            console.log(response)
        }catch(error){
            console.log(error)
        }
        setclick(!click)
    }
    return(<>
                    <div>
                        <input type="text" placeholder="food seach" onChange={(event)=>{setFoodName(event.target.value)}} />
                        <select name="" id="" onChange={(e)=>{const c = foodData.find((x)=> x.fdcId == e.target.value)
                    setIngredient(c)
                    }}>
                            <option value="">select food: name,brand, serving size</option>
                            {foodData.map((food)=>{
                                return <option key={food.fdcId} value={food.fdcId}>{food.description},{food.brandName},{food.servingSize
                                }{food.servingSizeUnit
                                }</option>
                            })}
                        </select>
                        <button className='new-button' onClick={addIngredient}> Get ingredient</button>
                    </div>
        </>
        )
}