import {Link, useParams} from "react-router";
import type {Team} from "../types.ts";
import {useEffect, useState} from "react";
import {getTeam} from "../api.ts";

const Team = () => {
    const { teamCode } = useParams<{teamCode: string}>();
    const [team, setTeam] = useState<Team>();

    const fetchTeam = async () => {
        try {
            const data = await getTeam(teamCode as string);
            setTeam(data);
        } catch (error) {
            console.error("Error fetching team:", error);
        }
    }

    useEffect(() => {
        fetchTeam();
    }, [teamCode]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-center font-semibold md:text-2xl">{team?.name}</h2>
                <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                    <div className="details-card">
                        <h3 className="details-card-team-name">Joueurs de {team?.name}</h3>
                        <div className="w-full flex flex-col gap-2 justify-center items-center md:flex-row md:justify-start md:flex-wrap md:gap-4">
                            {team?.players?.map((player) => (
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
