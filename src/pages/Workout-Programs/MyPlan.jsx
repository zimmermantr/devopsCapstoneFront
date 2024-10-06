import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useState, useContext, useEffect } from 'react';
import { api } from '../../Api';
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";



export default function MyPlan () {

const [programData, setProgramData] = useState([])

useEffect(() => {
    async function getUserProgram() {
        try {
            const token = localStorage.getItem("token");
            if(token) {
                const headers = { Authorization: `Token ${token}`};
                const response = await api.get(`users/`, { headers });
                setProgramData(response.data.userWorkoutPrograms)
            } else {
                console.log("No auth token found in local storage.");
                
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    getUserProgram()
}, []);

    const removeProgram = async (program_id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to remove this program from your plan?");
            if (!confirmDelete) {
              return; // User cancelled the operation
            }
            const token = localStorage.getItem("token");
            if(token) {
                const headers = { Authorization: `Token ${token}`};
                const response = await api.delete(`programs/${program_id}/`, { headers });
                setProgramData((prevPrograms) =>
                    prevPrograms.filter((program) => program.program_id.id !== program_id)
                )
            } else {
                console.log("No auth token found in local storage.");
                
            }
        } catch (error) {
            console.error("Error removing program:", error);
        }
    };

    return (
        <div className="bg-[#1B1919] bg-cover min-h-screen overflow-hidden ">
          <Nav />
          <div className="flex text-center flex-col space-y-12 bg-slate-300 border-2 p-5 m-5 max-w-1000">
            {programData.length === 0 ? (
              <p className="text-2xl font-bold">You have not added any programs yet!</p>
            ) : (
              programData.map((program, programIndex) => (
                <div key={programIndex} className='border-2 border-black border-solid'>
                  <Link to={`/programs/${program.program_id.id}`}>
                    <h1 className="text-4xl pb-8 pt-4 font-bold">{program.program_id.program_name}</h1>
                  </Link>
                  <div className="text-xl space-y-2 pb-2">
                    <p>Program Details: {program.program_id.program_details}</p>
                    <p>Difficulty: {program.program_id.program_difficulty}</p>
                    <p>Duration: {program.program_id.program_duration}</p>
                    <p>Frequency: {program.program_id.frequency_per_week} days per week</p>
                    <button onClick={() => removeProgram(program.program_id.id)}>
                      Remove From My Plan
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );

}