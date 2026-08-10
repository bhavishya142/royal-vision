import api from "./axios";

export const getOverview = async () => {

    const response = await api.get("/overview");

    return response.data;

};