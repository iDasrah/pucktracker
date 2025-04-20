import GameList from "./components/GameList.tsx";
import {getTodayGames} from "./api.ts";
import { useQuery } from '@tanstack/react-query';


const App = () => {
    const { data: todayGames, isLoading, isError } = useQuery({
        queryKey: ['todayGames'],
        queryFn: getTodayGames,
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!todayGames) {
        return <div className="text-center">Aucun match trouvé.</div>;
    }

    if (isError) {
        return <div className="text-center">Erreur lors de la récupération des matchs.</div>;
    }

    return (
        <>
            <h2 className="text-xl text-center font-semibold md:text-2xl">
                Les matchs du jour
            </h2>
            <GameList games={todayGames} />
        </>
    )
}
export default App
