import { ChangeEvent, useState } from 'react';
import {useParams} from "react-router";
import {getGameDetails} from "../api.ts";
import GameDetailsCard from './GameDetailsCard.tsx';
import { useQuery } from '@tanstack/react-query';

enum Filter {
    POINTS = "points",
    GOALS = "goals",
    ASSISTS = "assists",
}

const GameDetails = () => {
    const { id: gameId } = useParams<{ id: string }>();
    const [position, setPosition] = useState<string>('forward');
    const [filter, setFilter] = useState<string>('points');
    const [take, setTake] = useState<number>(5);
    const { data: gameDetails, isLoading, isError } = useQuery({
        queryKey: ['gameDetails', gameId, position, filter, take],
        queryFn: () => getGameDetails(Number(gameId), position, filter, take),
    });

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value as Filter;
        setFilter(selectedFilter);
    }

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!gameDetails) {
        return <div className="text-center">Aucun détail de match trouvé.</div>;
    }

    if (isError) {
        return <div className="text-center">Erreur lors de la récupération des détails du match.</div>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center font-semibold md:text-2xl">
                    {gameDetails?.homeTeam.name} vs {gameDetails?.awayTeam.name}
                </h2>
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
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <GameDetailsCard team={gameDetails?.homeTeam} />
                    <GameDetailsCard team={gameDetails?.awayTeam} />
                </div>
            </div>
        </>
    )
}
export default GameDetails
