import {Link, useParams} from "react-router";
import {getTeam} from "../api.ts";
import { useQuery } from '@tanstack/react-query';
import { Player } from '../types.ts';

const Team = () => {
    const { teamCode } = useParams<{teamCode: string}>();
    const { data: team, isLoading, isError } = useQuery({
        queryKey: ['team', teamCode],
        queryFn: () => getTeam(teamCode as string),
        staleTime: 10000
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!team) {
        return <div className="text-center">Aucune équipe trouvée.</div>;
    }

    if (isError) {
        return <div className="text-center">Erreur lors de la récupération de l'équipe.</div>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center font-semibold md:text-2xl">{team?.name}</h2>
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <div className="details-card">
                        <h3 className="details-card-team-name">Joueurs de {team?.name}</h3>
                        <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-start md:flex-wrap md:gap-4">
                            {team?.players?.map((player: Player) => (
                                <Link to={`/players/${player.id}`} key={player.id} className="min-w-full text-gray-200 bg-primary rounded-lg p-4 flex flex-col gap-2 justify-center items-center md:min-w-83">
                                    {player.fullName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Team
