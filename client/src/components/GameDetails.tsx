import {Game, PlayerWithStats} from "../types.ts";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import {getGameDetails} from "../api.ts";

const GameDetails = () => {
    const { id: gameId } = useParams<{ id: string }>();
    const [gameDetails, setGameDetails] = useState<Game | null>(null);

    const fetchGameDetails = async () => {
        try {
            const data = await getGameDetails(Number(gameId));
            setGameDetails(data);
        } catch (error) {
            console.error("Error fetching game details:", error);
        }
    };

    useEffect(() => {
        fetchGameDetails();
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center font-semibold md:text-2xl">
                    {gameDetails?.homeTeam.fullName} vs {gameDetails?.awayTeam.fullName}
                </h2>
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <div className="details-card">
                        <h3 className="details-card-team-name">Meilleurs joueurs de {gameDetails?.homeTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.home.map((player: PlayerWithStats) => (
                            <Link to={`/players/${player.id}`} key={player.id} className="text-gray-200">
                                {player.fullName} - {player.points} points ({player.goals} G, {player.assists} A)
                            </Link>
                        ))}
                    </div>
                    <div className="details-card">
                        <h3 className="details-card-team-name">Meilleurs joueurs de {gameDetails?.awayTeam.fullName}</h3>
                        {gameDetails?.bestPlayers?.away.map((player: PlayerWithStats) => (
                            <Link to={`/players/${player.id}`} key={player.id} className="text-gray-200">
                                {player.fullName} - {player.points} points ({player.goals} G, {player.assists} A)
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default GameDetails
