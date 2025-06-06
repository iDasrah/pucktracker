import {Game} from "../types.ts";
import {Link} from "react-router";

interface GameListProps {
    games: Game[];
}

const GameList = ({ games }: GameListProps) => {
    return (
        <>
            <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:flex-wrap md:justify-start md:gap-4">
                {games.map((game) => (
                    <div key={game.gameId} className="min-w-full rounded-lg p-4 flex flex-col gap-2 justify-center items-center bg-dark md:min-w-115">
                        <Link to={`game/${game.gameId}`} className="text-center">{game.homeTeam.name} vs {game.awayTeam.name}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}
export default GameList
