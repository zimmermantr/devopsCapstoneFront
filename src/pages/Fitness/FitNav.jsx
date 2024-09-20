import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "../../App";
import { api } from "../../Api";
import { useNavigate } from "react-router-dom";

export default function FitNav() {
    const { user, setAddedToWorkout } = useContext(userContext);
    const [ searchInput, setSearchInput ] = useState("");
    const navigate = useNavigate();

    const availableMuscleGroups = [
        "abdominals",
        "abductors",
        "adductors",
        "biceps",
        "calves",
        "chest",
        "forearms",
        "glutes",
        "hamstrings",
        "lats",
        "lower_back",
        "middle_back",
        "neck",
        "quadriceps",
        "traps",
        "triceps",
    ];
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setSearchInput("");
        navigate(`/exercises/${searchInput}`);
        setAddedToWorkout(false);
    };

    const onChangeHandler =(event) => {
        setSearchInput(event.target.value);
    };


    return (
        <>
            <nav className="flex bg-slate-600">
                <h1 className=" font-sedgwick text-5xl pr-4 text-lime-400">Shredder</h1>
                <Link to={"/"} className="underline p-3 px-2 text-black">Home</Link>
                <Link to={"/workouts"} className="underline p-3 px-2 text-black">Workouts List</Link>
                <Link to={"/exercises/:searchParameters"} className="underline p-3 px-2 text-black">Exercises</Link>
                {/* <Link to={"myexercises"} className="underline px-2 text-white">Exercises   </Link> */}
                <div className="flex-grow mt-2">
                    <form onSubmit={onSubmitHandler} className="flex justify-center items-center mx-3">
                        <input type="text" placeholder="search" onChange={onChangeHandler} value={searchInput} list="muscle_groups" className="border rounded"/>
                        <datalist id="muscle_groups">
                            {availableMuscleGroups.map((muscleGroup) => (
                            <option key={muscleGroup} value={muscleGroup} />
                            ))}
                        </datalist>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">Search</button>
                    </form>
                </div>
            </nav>
        </>
    );
}