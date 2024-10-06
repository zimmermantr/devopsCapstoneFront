import { useEffect, useContext } from "react";
import { userContext } from "../../App";

export default function UserPage () {
    const {user} = useContext(userContext)

    return (
        <>
            {user && <h6>{user.survey_responses[0].weight}</h6>}
        </>
    )
}