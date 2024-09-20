import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Home/Homepage";
import Nutrition from "./pages/Nutrition/Nutrition";
import LogIn from "./pages/UserAuth/LogIn";
import SignUp from "./pages/UserAuth/SignUp";
import Survey from "./pages/Survey/Survey";
import UserInfo from "./pages/UserPage/UserInfo";
import { ExercisesPage } from "./pages/Fitness/ExercisesPage";
import { WorkoutListsPage } from "./pages/Fitness/WorkoutListPage";
import WorkoutPrograms from "./pages/Workout-Programs/WorkoutPrograms"
import FullWorkoutProgram from "./pages/Workout-Programs/FullProgram";
import MyPlan from "./pages/Workout-Programs/MyPlan";


export const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <Homepage />
        },
        {
            path: "nutrition",
            element: <Nutrition />
        },
        {
            path: 'signup',
            element: <SignUp />
        },
        {
            path: 'login',
            element: <LogIn />
        },
        {
            path: 'user/survey/',
            element: <Survey />
        },
        {
            path: "exercises",
            element: <ExercisesPage />
        },
        {
            path: 'user/info/',
            element: <UserInfo />
        },

        {
            path: "workouts",
            element: <WorkoutListsPage />
        },
        {
            path: 'workout_programs',
            element: <WorkoutPrograms />
        },
        {
            path: 'programs/:id/',
            element: <FullWorkoutProgram />
        },
        {
            path: 'users/',
            element: <MyPlan />
        }
    ]
}

])
export default router;