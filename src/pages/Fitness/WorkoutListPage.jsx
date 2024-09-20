import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";
import { userContext } from "../../App";
import axios from "axios";
import { api } from "../../Api";
import ExerciseCard from "./ExerciseCard";
import Nav from "../Nav/Nav";

export const WorkoutListsPage = () => {
    const {workouts, setWorkouts, fetchWorkouts, user, validUser} = useContext(userContext);
    const [newWorkoutName, setNewWorkoutName] = useState("");
    const [newWorkoutDetails, setNewWorkoutDetails] = useState("");
    
    useEffect(()=> {
        validUser();
    }, []);

    const createWorkout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                
                let response = await api.post("workouts/",{
                    workout_name: newWorkoutName,
                    workout_details: newWorkoutDetails
                });
                
                setNewWorkoutName("");
                setNewWorkoutDetails("");
                fetchWorkouts();
            } else {
                console.log("Token not found");
            }
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };



    // bg-[#1B1919]

    return (
        <div className="h-screen  w-full bg-[#152f54]" style={{
            backgroundImage: `url('/turtlegym.jpeg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <Nav />
            <div  className="h-auto w-full bg-[#152f54]" style={{
            backgroundImage: `url('/turtlegym.jpeg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <div  className="flex-grow mt-2">
            <form className="m-3">
                <input className="border rounded mr-2"
                    type="text"
                    placeholder="Workout Name"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                />
            
                {/* <input className="border rounded mr-2"
                    type="text"
                    placeholder="Workout Details"
                    value={newWorkoutDetails}
                    onChange={(e) => setNewWorkoutDetails(e.target.value)}
                /> */}
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded" onClick={createWorkout}>Add workout</button>
            </form>
            {workouts.map((workout) =>
                
                <WorkoutCard key={workout.id} workout={workout} />
            )}
            </div>
            </div>
        </div>
    );
};
