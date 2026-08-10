import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


export const getPlayerAnalysis = async (
    team,
    season
) => {

    const params = {
        team
    };

    if (season) {
        params.season = season;
    }


    const response = await axios.get(
        `${API_BASE_URL}/player`,
        {
            params
        }
    );


    return response.data;

};