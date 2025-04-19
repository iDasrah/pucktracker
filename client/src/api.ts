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

export const getGameDetails = async (gameId: number, position?: string, filter?: string, take?: number) => {
    let url = `${API_URL}/games/${gameId}/players/best`;
    const params = new URLSearchParams();

    if (position) params.append('position', position);
    if (filter) params.append('filter', filter);
    if (take) params.append('take', String(take));

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching game details:", error);
        throw error;
    }
}

export const getBestPlayers = async (includeStats?: boolean, filter?: string, take?: number, position?: string) => {
    let url = `${API_URL}/players/best`;
    const params = new URLSearchParams();

    if (includeStats) params.append('includeStats', String(includeStats));
    if (filter) params.append('filter', filter);
    if (take) params.append('take', String(take));
    if (position) params.append('position', position);

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
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