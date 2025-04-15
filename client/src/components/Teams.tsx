import {useEffect, useState} from "react";
import {Team} from "../types.ts";
import {getAllTeams} from "../api.ts";
import {useDebounce} from "../hooks/useDebounce.ts";

const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [filter, setFilter] = useState<string>("")
    const debouncedFilter = useDebounce(filter, 100);

    const fetchTeams = async () => {
        try {
            const data = await getAllTeams(debouncedFilter);
            setTeams(data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, [debouncedFilter]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl text-center font-semibold md:text-2xl">Les équipes de la NHL</h3>
                <div className="flex flex-col w-full gap-2 md:flex-row md:justify-center md:items-center">
                    <h4 className="text-lg">Filtrer par</h4>
                    <input className="border rounded-lg p-1" type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-start md:flex-wrap md:gap-4">
                    {teams.map((team) => (
                        <div key={team.teamCode} className="min-w-full rounded-lg p-4 flex flex-col gap-2 justify-center items-center bg-dark md:min-w-85">
                            <h5 className="font-semibold">{team.name}</h5>
                            <p className="text-gray-200">Abbréviation: {team.teamCode}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Teams
