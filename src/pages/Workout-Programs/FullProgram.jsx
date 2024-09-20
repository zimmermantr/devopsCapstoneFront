import axios from "axios";
import { useState, useContext, useEffect } from 'react';
import { api } from '../../Api';
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";

export default function FullWorkoutProgram () {

  const { id } = useParams();
  const [programData, setProgramData] = useState({});
  const [expandedWorkouts, setExpandedWorkouts] = useState([]);
  const [expandedExercises, setExpandedExercises] = useState([]);
  const [isProgramSaved, setIsProgramSaved] = useState(false)

  useEffect(() => {
    async function getWorkoutPrograms() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = { Authorization: `Token ${token}` };
          const response = await api.get(`programs/${id}`, { headers });
          setProgramData(response.data);

          // Check if the program is saved by the user
          const savedProgramsResponse = await api.get("user/saved-programs", { headers });
          const savedProgramIds = savedProgramsResponse.data.map((savedProgram) => savedProgram.program_id.id);

          if (savedProgramIds.includes(id)) {
            setIsProgramSaved(true);
          }
        } else {
          console.log("No auth token found in local storage.");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    getWorkoutPrograms();
  }, [id]);


  const addWorkoutProgram = async function (program_id) {
    try {
      if (!isProgramSaved) {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = { Authorization: `Token ${token}` };
          const program_id = id;
          const response = await api.post('programs/', { program_id }, { headers });
          alert("Your program has been added to your profile and is ready to start!");
          setIsProgramSaved(true); // Update the state to indicate that the program is saved
        } else {
          console.log("Something went wrong.");
        }
      } else {
        alert("You have already saved this program."); // Display a message if the program is already saved
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Function to toggle the expanded state of a workout
  const toggleWorkoutExpand = (workoutIndex) => {
    if (expandedWorkouts.includes(workoutIndex)) {
      setExpandedWorkouts(expandedWorkouts.filter((index) => index !== workoutIndex));
    } else {
      setExpandedWorkouts([...expandedWorkouts, workoutIndex]);
    }
  };

  // Function to toggle the expanded state of an exercise within a workout
  const toggleExerciseExpand = (workoutIndex, exerciseIndex) => {
    if (expandedExercises.includes(`${workoutIndex}-${exerciseIndex}`)) {
      setExpandedExercises(expandedExercises.filter((index) => index !== `${workoutIndex}-${exerciseIndex}`));
    } else {
      setExpandedExercises([...expandedExercises, `${workoutIndex}-${exerciseIndex}`]);
    }
  };

  return (
    <div className="bg-[#1B1919] bg-cover min-h-screen overflow-hidden">
    <Nav />
      <div className="flex text-center flex-col bg-slate-300 border-2 p-5 m-5 max-w-1000">
        <h1 className="text-4xl pb-8 pt-4 font-bold">{programData.program_name}</h1>
        <div className="text-xl space-y-2 pb-2">
          <p>Program Details: {programData.program_details}</p>
          <p>Difficulty: {programData.program_difficulty}</p>
          <p>Duration: {programData.program_duration}</p>
          <p>Frequency: {programData.frequency_per_week} days per week</p>
          <button
            className="inline-block rounded-md bg-purple-500 hover:bg-purple-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white w-40"
            onClick={addWorkoutProgram}
            disabled={isProgramSaved}
          >
            {isProgramSaved ? "Program Saved" : "Start Program"}
          </button>
        </div>
        <div style={{
          border: "2px solid black",
          padding: "10px",
          margin: "16px"
        }}>
          <ul>
            {programData.workouts && programData.workouts.map((workout, workoutIndex) => (
              <div key={workoutIndex}>
                <button
                  className="text-2xl font-bold text p-2"
                  onClick={() => toggleWorkoutExpand(workoutIndex)}
                >
                  {expandedWorkouts.includes(workoutIndex) ? "▴" : "▾"} {workout.workout_name}
                </button>
                {expandedWorkouts.includes(workoutIndex) && workout.workout_details && (
                  <p className="text-lg pt-4 pb-4">
                    Details: {workout.workout_details}
                  </p>
                )}
                {expandedWorkouts.includes(workoutIndex) && (
                  <div>
                    {workout.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} style={{
                        border: "2px solid black",
                        padding: "10px",
                        margin: "16px"
                      }}>
                        <button onClick={() => toggleExerciseExpand(workoutIndex, exerciseIndex)}>
                          {expandedExercises.includes(`${workoutIndex}-${exerciseIndex}`) ? "Hide Instructions" : "Show Instructions"}
                        </button>
                        <p className="text-lg underline font-semibold">{exercise.exercise_name}</p>
                        <p className="font-semibold pb-4">{`${exercise.sets} sets of ${exercise.reps} reps`}</p>
                        <div className={`instructions mt-2 ${expandedExercises.includes(`${workoutIndex}-${exerciseIndex}`) ? "block" : "truncate"}`}>
                          <p>{`Equipment: ${exercise.equipment}`}</p>
                          <p>{`Primary Muscles : ${exercise.primary_muscle}`}</p>
                          <p>{`Secondary Muscles : ${exercise.secondary_muscle}`}</p>
                          {expandedExercises.includes(`${workoutIndex}-${exerciseIndex}`) && <p>{`${exercise.instructions}`}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
