import {useParams} from "react-router";
import {getPlayer} from "../api.ts";
import { useQuery } from '@tanstack/react-query';

const Player = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const { data: player, isLoading, isError } = useQuery({
        queryKey: ['player', playerId],
        queryFn: () => getPlayer(Number(playerId)),
        staleTime: 10000
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!player) {
        return <div className="text-center">Aucun joueur trouvé.</div>;
    }

    if (isError) {
        return <div className="text-center">Erreur lors de la récupération du joueur.</div>;
    }

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
