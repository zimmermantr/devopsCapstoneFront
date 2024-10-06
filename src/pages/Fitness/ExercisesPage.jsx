import React, { useState,useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";
// import './fitnessStyle.css'
import Nav from "../Nav/Nav";
import Select from "react-select"

export const ExercisesPage = () => {

    const [exerciseList, setExerciseList] = useState([])
    const { apiKey, setAddedToWorkout, workouts, rapidAPIKey } = useContext(userContext);
    const { searchParameters = "" } = useParams(null);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState();
    const [ searchInput, setSearchInput ] = useState("");
    const [bodyParts, setBodyParts] = useState([])
    const [customOption, setCustomOption] = useState(null);

  useEffect(() => {
    // Generate a custom option based on the user's input
    if (searchInput) {
      const userInputOption = {
        label: searchInput,
        value: searchInput,
      };
      setCustomOption(userInputOption);
    } else {
      setCustomOption(null);
    }
  }, [searchInput]);

    // useEffect(() => {
    //     setOffset(0);
    //     axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchParameters}`, {
    //         headers: {
    //             'X-Api-Key': apiKey
    //         }
    //     })
    //     .then((response) =>{
    //         if (response.data.length === 0) {
    //             navigate("/exercises/:searchParameters")
    //         }else{
    //         setExerciseList(response.data)
    //         // searchParameters = ""
    //         }
    //     })
    //     .catch((error) => {
    //         setError(error);
    //     });
    // }, [searchParameters]);

    // const loadMoreExercises = () => {
    //     const newOffset = offset + 10;
    //     setOffset(newOffset);

    //     axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchParameters}&offset=${newOffset}`, {
    //         headers: {
    //             'X-Api-Key': apiKey
    //         }
    //     })
    //     .then((response) => {
    //         setExerciseList(prevExercises => [...prevExercises, ...response.data]);
    //     })
    //     .catch((error) => {
    //         setError(error);
    //     });
    // };

    const exerciseOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': rapidAPIKey ,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };
    
    const fetchData = async (url, options) => {
        const res = await fetch(url, options);
        const data = await res.json();
    
        return data;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        let url = ''
        if (equipmentList.includes(searchInput)) {
          url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${searchInput}`
        } else if (targetMuscleList.includes(searchInput)) {
          url = `https://exercisedb.p.rapidapi.com/exercises/target/${searchInput}`
        } else if (bodyPartsList.includes(searchInput)) {
          url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchInput}`
        } else {
          url = `https://exercisedb.p.rapidapi.com/exercises/name/${searchInput}`
        }
        if (searchInput) {
            const exercisesData = await fetchData(
                url,
                exerciseOptions
            );
            
            const searchedExercises = exercisesData.filter(
                (item) => item.name.toLowerCase().includes(searchInput)
                || item.target.toLowerCase().includes(searchInput)
                || item.equipment.toLowerCase().includes(searchInput)
                || item.bodyPart.toLowerCase().includes(searchInput)
            );
            setSearchInput('');
            setExerciseList(searchedExercises);
            setAddedToWorkout(false);
            
        }
    };

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
            exerciseOptions);
            
            setBodyParts(['all', ...bodyPartsData])
            
        }
        fetchExercisesData();
    }, [])
    

    // const onSubmitHandler = (event) => {
    //     event.preventDefault();
    //     setSearchInput("");
    //     navigate(`/exercises/${searchInput}`);
    //     setAddedToWorkout(false);
    // };

    const onChangeHandler = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const equipmentList = [
        "assisted",
        "band",
        "barbell",
        "body weight",
        "bosu ball",
        "cable",
        "dumbbell",
        "elliptical machine",
        "ez barbell",
        "hammer",
        "kettlebell",
        "leverage machine",
        "medicine ball",
        "olympic barbell",
        "resistance band",
        "roller",
        "rope",
        "skierg machine",
        "sled machine",
        "smith machine",
        "stability ball",
        "stationary bike",
        "stepmill machine",
        "tire",
        "trap bar",
        "upper body ergometer",
        "weighted",
        "wheel roller"
    ]

    const targetMuscleList = [
        "abductors",
        "abs",
        "adductors",
        "biceps",
        "calves",
        "cardiovascular system",
        "delts",
        "forearms",
        "glutes",
        "hamstrings",
        "lats",
        "levator scapulae",
        "pectorals",
        "quads",
        "serratus anterior",
        "spine",
        "traps",
        "triceps",
        "upper back"
    ]
    const bodyPartsList = [
        "back",
        "cardio",
        "chest",
        "lower arms",
        "lower legs",
        "neck",
        "shoulders",
        "upper arms",
        "upper legs",
        "waist"
    ]
    // const availableMuscleGroups = [
    //     //Equipment
    //     "assisted",
    //     "band",
    //     "barbell",
    //     "body weight",
    //     "bosu ball",
    //     "cable",
    //     "dumbbell",
    //     "elliptical machine",
    //     "ez barbell",
    //     "hammer",
    //     "kettlebell",
    //     "leverage machine",
    //     "medicine ball",
    //     "olympic barbell",
    //     "resistance band",
    //     "roller",
    //     "rope",
    //     "skierg machine",
    //     "sled machine",
    //     "smith machine",
    //     "stability ball",
    //     "stationary bike",
    //     "stepmill machine",
    //     "tire",
    //     "trap bar",
    //     "upper body ergometer",
    //     "weighted",
    //     "wheel roller",
    //     //Targeted Muscle
    //     "abductors",
    //     "abs",
    //     "adductors",
    //     "biceps",
    //     "calves",
    //     "cardiovascular system",
    //     "delts",
    //     "forearms",
    //     "glutes",
    //     "hamstrings",
    //     "lats",
    //     "levator scapulae",
    //     "pectorals",
    //     "quads",
    //     "serratus anterior",
    //     "spine",
    //     "traps",
    //     "triceps",
    //     "upper back",
    //     //Body Part
    //     "back",
    //     "cardio",
    //     "chest",
    //     "lower arms",
    //     "lower legs",
    //     "neck",
    //     "shoulders",
    //     "upper arms",
    //     "upper legs",
    //     "waist"
    // ];
    const groupedOptions = [
        {
          label: "Equipment",
          options: equipmentList.map((group) => ({
            value: group,
            label: group,
          })),
        },
        {
          label: "Targeted Muscle",
          options: targetMuscleList.map((group) => ({
            value: group,
            label: group,
          })),
        },
        {
          label: "Body Part",
          options: bodyPartsList.map((group) => ({
            value: group,
            label: group,
          })),
        },
        customOption && {
            label: "Custom",
            options: [customOption],
          },
        ].filter(Boolean);

    return(
        <div className="h-screen  w-full bg-[#000000]" style={{
            backgroundImage: `url('/shreddersGymB&P.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
            }}>
            <Nav />
            {/* <div className=" relative p-5 w-[100%]" >
                <p className="text-white">{bodyParts.map((bp, index) => (
                    <li key={index}>{bp}</li>
                ))}</p>
            </div> */}
            
            <div  className="h-auto w-full bg-[#000000]" style={{
            backgroundImage: `url('/shreddersGymB&P.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
            }}>
            <div className="flex-grow mt-2">
                <form onSubmit={handleSearch} className="flex justify-left items-center mx-3">
                    {/* <input type="text" placeholder="search" onChange={onChangeHandler} value={searchInput} list="muscle_groups" className="border rounded"/>
                    <datalist id="muscle_groups">
              {availableMuscleGroups.map((group) => (
                <React.Fragment key={group.header}>
                  <optgroup label={group.header} />
                  {group.list.map((muscleGroup) => (
                    <option key={muscleGroup} value={muscleGroup} />
                  ))}
                </React.Fragment>
              ))}
            </datalist> */}
            <Select
              options={groupedOptions}
              isSearchable={true}
              onChange={(selectedOption) => setSearchInput(selectedOption.value)}
              // onInputChange={(inputValue) => setSearchInput(inputValue.toLowerCase())}
              placeholder="Search "
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "250px", // Set a fixed width for the input
                }),
              }}
            />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700  text-white py-1 px-4 rounded" >Search</button>
                </form>
                
                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {exerciseList.map((lift,index) => (
                        <ExerciseCard
                            key={index}
                            exercise_name={lift.name}
                            primary_muscle={lift.target}
                            equipment={lift.equipment}
                            // difficulty={lift.difficulty}
                            // instructions={lift.instructions}
                            gif_img = {lift.gifUrl}
                            availableWorkouts={workouts}
                            
                        />
                    ))}
                </ol>
            {exerciseList.length !== 0 && (
                <div className="flex justify-center pb-3">
            {/* <button onClick={loadMoreExercises} className="bg-purple-700 hover:bg-purple-800 text-white py-1 px-4 rounded w-64">Load More</button> */}
                </div>)
            }
            </div>
            </div>
        </div>
    )
}