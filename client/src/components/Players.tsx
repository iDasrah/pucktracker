import {useEffect, useState} from "react";
import {PlayerStatsWithPlayer} from "../types.ts";
import {getBestPlayers} from "../api.ts";

enum Filter {
    POINTS = "points",
    GOALS = "goals",
    ASSISTS = "assists",
}

const Players = () => {
    const [bestPlayers, setBestPlayers] = useState<PlayerStatsWithPlayer[]>([])
    const [filter, setFilter] = useState<Filter>(Filter.POINTS)
    const [take, setTake] = useState<number>(10)

    const fetchBestPlayers = async () => {
        try {
            const data = await getBestPlayers(filter, take);
            setBestPlayers(data);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value as Filter;
        setFilter(selectedFilter);
    }

    useEffect(() => {
        fetchBestPlayers();
    }, [filter, take]);

    return (
        <>
            <div className="flex flex-col flex-wrap justify-start gap-4">
                <h3 className="text-3xl text-white">Les meilleurs joueurs du moment</h3>
                <div className="flex items-center gap-4 text-white">
                    <h4 className="text-xl">Filtrer par</h4>
                    <select className="border-2 rounded-lg p-2" value={filter} onChange={handleFilterChange}>
                        <option value={Filter.POINTS}>Points</option>
                        <option value={Filter.GOALS}>Buts</option>
                        <option value={Filter.ASSISTS}>Passes décisives</option>
                    </select>
                    <label htmlFor="limit">Limite</label>
                    <input className="border-2 rounded-lg p-2" name="limit" id="limit" type="number" value={take} onChange={(e) => setTake(Number(e.target.value))} />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {bestPlayers.map((player) => (
                        <div key={player.playerId} className="bg-dark p-4 rounded-lg min-w-50">
                            <h5 className="text-xl text-white">{player.player.fullName}</h5>
                            <p className="text-gray-300">Points: {player.points}</p>
                            <p className="text-gray-300">Buts: {player.goals}</p>
                            <p className="text-gray-300">Passes décisives: {player.assists}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Players
