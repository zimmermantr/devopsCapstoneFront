import { useContext, useEffect } from "react";
import { userContext } from "../../App";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutCard({workout}) {
    const { workouts, deleteWorkout, user, validUser } = useContext(userContext);

    return(
        <div>
            <div key={workout.id} className="bg-[#266902] bg-opacity-50 border-purple-200 border-2 p-5 m-5 max-w-1000 text-white flex flex-col justify-center items-center ">
                <p className="text-3xl font-bold">{workout.workout_name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {workout.exercises.length > 0 ? (
                    workout.exercises.map((exercise) => (
                        <div key={exercise.id} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ExerciseCard
                                key={exercise.id}
                                workouts={exercise.workouts}
                                exercise_id={exercise.id}
                                exercise_name={exercise.exercise_name}
                                // primary_muscle={exercise.primary_muscle}
                                // secondary_muscle={exercise.secondary_muscle}
                                primary_muscle={exercise.target}
                                equipment={exercise.equipment}
                                // difficulty={exercise.difficulty}
                                // instructions={exercise.instructions}
                                gif_img={exercise.gif_img}
                                created_by={exercise.created_by}
                                reps={exercise.reps}
                                sets={exercise.sets}
                            />
                        </div>
                    ))
                ) : ( <p>No exercises found for this workout</p>
                )}
                </div>
                {workout.created_by !== 1 && workout.created_by === user.id &&(
                <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded " onClick={() => deleteWorkout(workout.id)}>Delete</button>
                )}
            </div>
        </div>
    )
}