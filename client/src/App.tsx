import GameList from "./components/GameList.tsx";
import {Game} from "./types.ts";
import {useEffect, useState} from "react";
import {getTodayGames} from "./api.ts";


const App = () => {
    const [todayGames, setTodayGames] = useState<Game[]>([]);

    const fetchGames = async () => {
        const data = await getTodayGames();
        setTodayGames(data);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <>
            <h2 className="text-xl text-center font-semibold">
                Les matchs du jour
            </h2>
            <GameList games={todayGames} />
        </>
    )
}
export default App
