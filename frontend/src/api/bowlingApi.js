import api from "./axios";

export const getBowlingAnalysis = async (team, season) => {

    const response = await api.get("/bowling", {
        params: {
            team,
            season
        }
    });

    return response.data;

};