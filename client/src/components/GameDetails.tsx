import {Game, Player} from "../types.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getGameDetails} from "../api.ts";

const GameDetails = () => {
    const { id: gameId } = useParams<{ id: string }>();
    const [gameDetails, setGameDetails] = useState<Game | null>(null);

    const fetchGameDetails = async () => {
        const data = await getGameDetails(Number(gameId));
        setGameDetails(data);
    };

    useEffect(() => {
        fetchGameDetails();
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl text-white">
                    {gameDetails?.homeTeam.fullName} vs {gameDetails?.awayTeam.fullName}
                </h2>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-xl text-white">Meilleurs joueurs de {gameDetails?.homeTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.home.map((player: Player) => (
                            <div key={player.id} className="text-white">
                                {player.fullName} - {player.points} points ({player.goals} G, {player.assists} A)
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-xl text-white">Meilleurs joueurs de {gameDetails?.awayTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.away.map((player: Player) => (
                            <div key={player.id} className="text-white">
                                {player.fullName} - {player.points} points ({player.goals} G, {player.assists} A)
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default GameDetails
