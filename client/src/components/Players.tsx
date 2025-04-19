import {useEffect, useState} from "react";
import {Player} from "../types.ts";
import {getBestPlayers} from "../api.ts";
import {Link} from "react-router";

enum Filter {
    POINTS = "points",
    GOALS = "goals",
    ASSISTS = "assists",
}

const Players = () => {
    const [bestPlayers, setBestPlayers] = useState<Player[]>([])
    const [filter, setFilter] = useState<Filter>(Filter.POINTS)
    const [take, setTake] = useState<number>(10)
    const [position, setPosition] = useState<string>('forward')

    const fetchBestPlayers = async () => {
        try {
            const data = await getBestPlayers(true, filter, take, position);
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
    }, [filter, take, position]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl text-center font-semibold md:text-2xl">Les meilleurs joueurs du moment</h3>
                <div className="flex flex-col w-full gap-2 md:flex-row md:justify-center md:items-center">
                    <h4 className="text-lg">Filtrer par</h4>
                    <select className="border rounded-lg p-1" value={filter} onChange={handleFilterChange}>
                        <option value={Filter.POINTS}>Points</option>
                        <option value={Filter.GOALS}>Buts</option>
                        <option value={Filter.ASSISTS}>Passes décisives</option>
                    </select>
                    <label htmlFor="position">Poste</label>
                    <select className="border rounded-lg p-1" name="position" id="position" value={position} onChange={(e) => setPosition(e.target.value)}>
                        <option value="forward">Attaquant</option>
                        <option value="defenseman">Défenseur</option>
                    </select>
                    <label htmlFor="limit">Limite</label>
                    <input className="border rounded-lg p-1" name="limit" id="limit" type="number" value={take} onChange={(e) => setTake(Number(e.target.value))} />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-start md:flex-wrap md:gap-4">
                    {bestPlayers.map((player) => (
                        <div key={player.id} className="min-w-full rounded-lg p-4 flex flex-col gap-2 justify-center items-center bg-dark md:min-w-85">
                            <h5 className="font-semibold">{player.fullName}</h5>
                            <p className="text-gray-200">Points: {player.playerStats?.points}</p>
                            <p className="text-gray-200">Buts: {player.playerStats?.goals}</p>
                            <p className="text-gray-200">Passes décisives: {player.playerStats?.assists}</p>
                            <Link className="bg-accent w-full text-center rounded-lg text-dark hover:bg-accent/90 p-2" to={`/players/${player.id}`}>Détails</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Players
