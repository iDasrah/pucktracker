import GameList from "./components/GameList.tsx";
import {Game} from "./types.ts";
import {useEffect, useState} from "react";


const App = () => {
    const [todayGames, setTodayGames] = useState<Game[]>([]);

    const fetchGames = async () => {
        const url = import.meta.env.VITE_API_BASEURL + "/games/today";
        const response = await fetch(url);
        const data = await response.json();

        setTodayGames(data);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <>
            <h2 className="text-3xl text-white">
                Les matchs du jour
            </h2>
            <GameList games={todayGames} />
        </>
    )
}
export default App
