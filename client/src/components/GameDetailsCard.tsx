import { Player, Team } from '../types.ts';
import { Link } from 'react-router';

interface GameDetailsCardProps {
    team?: Team
}

const GameDetailsCard = ({team}: GameDetailsCardProps) => {
    return (
        <div className="details-card">
            <h3 className="details-card-team-name">Meilleurs joueurs de {team?.name}</h3>
            {team?.bestPlayers?.map((player: Player) => (
                <Link to={`/players/${player.id}`} key={player.id} className="text-gray-200">
                    {player.fullName} - {player.playerStats?.points} points ({player.playerStats?.goals} G, {player.playerStats?.assists} A)
                </Link>
            ))}
        </div>
    );
};
export default GameDetailsCard;
