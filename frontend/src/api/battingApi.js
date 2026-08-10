import api from "./axios";

export const getBattingAnalysis = async (team, season) => {

    const response = await api.get("/batting", {
        params: {
            team,
            season
        }
    });

    return response.data;
};