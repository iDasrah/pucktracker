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
                <h2 className="text-xl text-center font-semibold">
                    {gameDetails?.homeTeam.fullName} vs {gameDetails?.awayTeam.fullName}
                </h2>
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <div className="game-details-card">
                        <h3 className="game-details-card-team-name">Meilleurs joueurs de {gameDetails?.homeTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.home.map((player: Player) => (
                            <div key={player.id} className="text-gray-200">
                                {player.fullName} - {player.points} points ({player.goals} G, {player.assists} A)
                            </div>
                        ))}
                    </div>
                    <div className="game-details-card">
                        <h3 className="game-details-card-team-name">Meilleurs joueurs de {gameDetails?.awayTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.away.map((player: Player) => (
                            <div key={player.id} className="text-gray-200">
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
