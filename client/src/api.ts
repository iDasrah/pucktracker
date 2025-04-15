const API_URL = import.meta.env.VITE_API_BASEURL;

export const getTodayGames = async () => {
    try {
        const url = `${API_URL}/games/today`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching today's games:", error);
        throw error;
    }
}

export const getGameDetails = async (gameId: number) => {
    try {
        const url = `${API_URL}/games/${gameId}/bestplayers`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching game details:", error);
        throw error;
    }
}

export const getBestPlayers = async (filter: string, take: number) => {
    try {
        const url = `${API_URL}/players/best?filter=${filter}&take=${take}`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching best players:", error);
        throw error;
    }
}

export const getPlayer = async (playerId: number) => {
    try {
        const url = `${API_URL}/players/${playerId}?includeStats=true`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching player:", error);
        throw error;
    }
}

export const getAllTeams = async (name: string) => {
    let url = `${API_URL}/teams`;

    if (name) {
        url += `?name=${name}`;
    }

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching all teams:", error);
        throw error;
    }
}

export const getTeam = async (teamCode: string) => {
    try {
        const url = `${API_URL}/teams/${teamCode}?includePlayers=true`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching team:", error);
        throw error;
    }
}