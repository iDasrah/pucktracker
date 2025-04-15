import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Player} from "../types.ts";
import {getPlayer} from "../api.ts";

const Player = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const [player, setPlayer] = useState<Player | null>(null);

    const fetchPlayer = async () => {
        try {
            const data = await getPlayer(Number(playerId));
            setPlayer(data);
        } catch (error) {
            console.error("Error fetching player:", error);
        }
    }

    useEffect(() => {
        fetchPlayer();
    }, [playerId]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center font-semibold md:text-2xl">{player?.fullName}</h2>
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <div className="details-card">
                        <h3 className="details-card-team-name">Statistiques de {player?.fullName}</h3>
                        <p className="text-gray-200">Équipe: {player?.teamId}</p>
                        <p className="text-gray-200">Position: {player?.position}</p>
                        <p className="text-gray-200">Points: {player?.playerStats?.points}</p>
                        <p className="text-gray-200">Buts: {player?.playerStats?.goals}</p>
                        <p className="text-gray-200">Passes décisives: {player?.playerStats?.assists}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Player
