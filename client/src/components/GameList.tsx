import {Game} from "../types.ts";
import {Link} from "react-router";

interface GameListProps {
    games: Game[];
}

const GameList = ({ games }: GameListProps) => {
    return (
        <>
            <div className="flex flex-wrap justify-start gap-4">
                {games.map((game) => (
                    <div key={game.gameId} className="bg-gray-800 p-4 rounded-lg">
                        <Link to={`game/${game.gameId}`} className="text-xl text-white">{game.homeTeam.fullName} vs {game.awayTeam.fullName}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}
export default GameList
