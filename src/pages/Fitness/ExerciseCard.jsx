import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useLocation } from "react-router-dom";
import { api } from "../../Api";

export default function ExerciseCard(props){
    const [ expanded, setExpanded ] = useState(false);
    const { addExercise, workout, deleteExercise, addedToWorkout, setAddedToWorkout, workouts } = useContext(userContext);
    const [isExerciseOnWorkout, setIsExerciseOnWorkout] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const location = useLocation();
    const isOnExercisesPage = location.pathname.includes("/exercises");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);
    const [newSets, setNewSets] = useState("")
    const [newReps, setNewReps] = useState("")

    const handleSelectedWorkoutChange = (e) => {
        const selectedValue = e.target.value;
        const selectedWorkoutName = e.target.options[e.target.selectedIndex].getAttribute('data-workout-name');
        setSelectedWorkout(selectedValue);
        let tempWorkout = workouts.find(o => o.workout_name === selectedWorkoutName)
        let tempExercise = tempWorkout.exercises.some(o => o.exercise_name === props.exercise_name)
        setIsExerciseOnWorkout(tempExercise)
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const addExerciseHandler = () => {
        if (!selectedWorkout) {
            alert("Please select a workout before adding the exercise.");
            return;
        }
        const exerciseToAdd = {
            ...props
        };
        delete exerciseToAdd.availableWorkouts;
        if(!isExerciseOnWorkout){
            addExercise(exerciseToAdd, selectedWorkout);
            setAddedToWorkout(true);
            setIsExerciseOnWorkout(true);
            setShowSuccessMessage(true);
            setTimeout(() => {
            setShowSuccessMessage(false);
            }, 2000);
        }else{
            alert("You already have this exercise on that workout");
            setShowFailMessage(true);
            setTimeout(() => {
            setShowFailMessage(false);
        }, 2000);
        }
        
        
    };

    const updateRepsSets = async (exerciseId) => {
        
        try {
            const token = localStorage.getItem("token");
            
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                
                let response = await api.put(`exercises/${exerciseId}/`,{
                    sets: newSets,
                    reps: newReps
                });
                
                // setNewSets("");
                // setNewReps("");
                // fetchWorkouts();
            } else {
                console.log("Token not found");
            }
        } catch (error) {
            console.error("Error updating sets/reps:", error);
        }
    };

    return (
        
        <div className={`flex flex-col  ${
            isOnExercisesPage ? 'bg-[#611ee1] bg-opacity-50' : 'bg-[#9da315] bg-opacity-50'
        } border-2 p-2 text-[#F5F5F5] m-2`}  style={{ minWidth: "400px" }}>
            
            <p className="font-bold underline pb-3">{props.exercise_name} </p>
            <li>Targeted muscle: {props.primary_muscle}</li>
            <li>Equipment needed: {props.equipment} </li>
            {/* <li>Difficulty rating: {props.difficulty} </li> */}
            {props.sets && props.reps ? (
                <>
                <li>Sets: {props.sets}</li>
                <li>Reps: {props.reps}</li>
                </>
            ) : (
                <>
                <li className="list-none h-8"> </li>
                <li className="list-none m-0 p-0 h-4"> </li>
                </>
            )}
            <div className={`instructions ${expanded ? "block" : "truncate"} mt-2`}>
            <img className="p-3" src={props.gif_img} alt={props.exercise_name} />
            {/* <li>{props.instructions}</li> */}
            </div>
            {/* <button onClick={toggleExpand} className="mt-2 text-blue-600 hover:underline">
                {expanded ? "Show Less" : "Show More"}
            </button> */}
            {isOnExercisesPage && (
                <div className="flex">
                    <label className="block mt-2 text-center">Select Workout:</label>
                    <select onChange={handleSelectedWorkoutChange}  
                    className="m-2 border border-gray-300 rounded text-black">
                        <option value="">Select a workout</option>
                        {props.availableWorkouts.map((workout) => (
                            <option key={workout.id} value={workout.id} data-workout-name={workout.workout_name}>
                                {workout.workout_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={addExerciseHandler}  className="mx-2 bg-purple-600 hover:bg-purple-700 border-black border  px-2 rounded">Add to workout</button>
                    {showSuccessMessage &&(
                    <div className="text-green-500">Exercise added successfully!</div>
                    )}
                    {showFailMessage &&(
                        <div>Exercise is already on workout</div>
                    )}
                </div>
            )}
            {/* {addedToWorkout && (
                <p className="text-green-500 mt-2">{`${props.exercise_name} added to selected workout!`}</p>
            )} */}
            {!isOnExercisesPage && (
                <div className="flex justify-center items-center">
                    <form className="">
                        <input className="border rounded mr-2 text-black pl-2" 
                        type="text" 
                        placeholder="Sets"
                        value={newSets} 
                        onChange={(e) => setNewSets(e.target.value)}/>
                        <input className="border rounded mr-2 text-black pl-2" 
                        type="text" 
                        placeholder="Reps"
                        value={newReps} 
                        onChange={(e) => setNewReps(e.target.value)}/>
                        <button className="bg-purple-600 hover:bg-purple-700  text-white py-1 px-4 rounded" onClick={() =>{updateRepsSets(props.exercise_id)}}>Edit Sets/Reps</button>
                    </form>
                    <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded " onClick={() => {deleteExercise(props.exercise_id)}}>Delete</button>
                </div>
            )}
        </div>
    )
}
// onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } }