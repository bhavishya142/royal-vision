import api from "./axios";

export const getSuperrBatters = async () => {
    const response = await api.get("/superr/batters");
    return response.data;
};

export const getSuperrBowlers = async () => {
    const response = await api.get("/superr/bowlers");
    return response.data;
};