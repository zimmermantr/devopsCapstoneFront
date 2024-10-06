import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Progress (props){
    const {mealList,weight,height,age,gender,activityLevel,dietaryRestrictions} = props
    let protein = 0
    let carbs = 0
    let carbsNeeded = 0
    // "Carbohydrate, by difference"
    let PAL = 1.3
    let fat = 0
    let fatNeeded = 0
    // Total lipid (fat)
    let calories = 0
    let caloriesNeeded = 0
    // 'Energy'
    mealList.map((meal)=>{
        const today = new Date()
        const todayDateString = today.toISOString().split('T')[0]
        const itemDate = new Date(meal.created_at)
        const itemDateString = itemDate.toISOString().split('T')[0]
        if (itemDateString === todayDateString){
            meal.ingredients.map((ingredient)=>{
                ingredient.nutrients_id.map((nutrient)=>{
                    if (nutrient['name'] == 'Protein'){
                        protein += (nutrient['measurement_id']['amount']* ingredient['amount_consumed'])
    
                    }
                    else if (nutrient['name'] == 'Carbohydrate, by difference'){
                        carbs += (nutrient['measurement_id']['amount']* ingredient['amount_consumed'])
                    }
                    else if (nutrient['name'] == 'Total lipid (fat)'){
                        fat += (nutrient['measurement_id']['amount']* ingredient['amount_consumed'])
                    }
                    else if (nutrient['name'] == 'Energy'){
                        calories += (nutrient['measurement_id']['amount']* ingredient['amount_consumed'])
                    }
                })
            })

            if (activityLevel === '0.80'){
                PAL = 1.3
            } else if (activityLevel === '1.40') {
                PAL = 1.9
            } else if (activityLevel === '1.70') {
                PAL = 1.6
            }
            // fat conversion to calories then compare to 25% of total calories
            fatNeeded = ((calories*0.25)/9)
            // carbs conversion to calories then compare to 55% of total calories
            carbsNeeded = ((calories*0.55)/4)
        }
        // add activity level
        if(gender ==="Male"){
            // RMR FORMULA
            caloriesNeeded=(((10*weight) + (6.25*height) - (5*age) + 5)*PAL)
            }
        else{
            caloriesNeeded=(((10*weight) + (6.25*height) - (5*age) - 161)*PAL)
            }
    })
    return( <>  
               Calories: {calories} kcal/ {Math.floor(caloriesNeeded)} kcal
                <ProgressBar striped variant={(calories/caloriesNeeded)< 0.75||caloriesNeeded < calories ?"danger":"success"} now={calories?((calories/caloriesNeeded)*100):null} label={`${Math.floor((calories/caloriesNeeded)*100)}%`} />
                Protein: {protein} g / {Math.floor(weight*activityLevel)} g
                                                {/* PROTEIN FORMULA */}
                <ProgressBar striped variant={(protein/(weight*activityLevel))>=1?"success": "danger"} now={((protein/(weight*activityLevel))*100)} label={protein?`${Math.floor((protein/(weight*activityLevel))*100)}%`:null} />
               Carbohydrates **
                <ProgressBar striped variant={carbs > carbsNeeded?"success":"danger"} now={carbs?((carbs/carbsNeeded)*100):null} label={`${Math.floor(((carbs*4)/calories)*100)}%`} />
               Fat **
                <ProgressBar striped variant={(fat > fatNeeded)?"danger":"success"} now={fat?(fat/fatNeeded)*100:null} label={`${Math.floor(((fat*9)/calories)*100)}%`} />
                **relative to calories
            </>
    )
        
}
// Females: ((10*weight) + (6.25*height) – (5*age) – 161)
// Males: ((10*weight) + (6.25*height) – (5*age) + 5)
// (9.99 * kg + 6.25 * cm - 4.92 * age + 5)