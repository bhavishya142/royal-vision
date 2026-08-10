import api from "./axios";


export const getVenueAnalysis = async (team, season) => {

    const response = await api.get("/venue", {

        params: {
            team,
            season
        }

    });

    return response.data;

};