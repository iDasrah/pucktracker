import {Team} from "../types.ts";
import {getAllTeams} from "../api.ts";
import {useDebounce} from "../hooks/useDebounce.ts";
import {Link} from "react-router";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Teams = () => {
    const [filter, setFilter] = useState<string>("")
    const debouncedFilter = useDebounce(filter, 100);
    const { data: teams, isLoading, isError } = useQuery({
        queryKey: ['teams', debouncedFilter],
        queryFn: () => getAllTeams(debouncedFilter),
        staleTime: 10000
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!teams) {
        return <div className="text-center">Aucune équipe trouvée.</div>;
    }

    if (isError) {
        return <div className="text-center">Erreur lors de la récupération des équipes.</div>;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl text-center font-semibold md:text-2xl">Les équipes de la NHL</h3>
                <div className="flex flex-col w-full gap-2 md:flex-row md:justify-center md:items-center">
                    <h4 className="text-lg">Filtrer par</h4>
                    <input className="border rounded-lg p-1" type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-start md:flex-wrap md:gap-4">
                    {teams.map((team: Team) => (
                        <div key={team.teamCode} className="min-w-full rounded-lg p-4 flex flex-col gap-2 justify-center items-center bg-dark md:min-w-85">
                            <h5 className="font-semibold">{team.name}</h5>
                            <p className="text-gray-200">Abbréviation: {team.teamCode}</p>
                            <Link className="bg-accent w-full text-center rounded-lg text-dark hover:bg-accent/90 p-2" to={`/teams/${team.teamCode}`}>Détails</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Teams
