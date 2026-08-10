import api from "./axios"

export const getTeamAnalysis = async (team) => {

    const response = await api.get(`/team?team=${team}`)

    return response.data

}