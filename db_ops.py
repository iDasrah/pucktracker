import sqlite3
from api_ops import get_team, fill_player_stats, get_today_games

# Liste des équipes de la NHL
teams = [
    "ANA", "BOS", "BUF", "CAR", "CBJ", "CGY", "CHI", "COL", "DAL", "DET",
    "EDM", "FLA", "LAK", "MIN", "MTL", "NJD", "NSH", "NYI", "NYR", "OTT",
    "PHI", "PIT", "SJS", "STL", "TBL", "TOR", "VAN", "VGK", "WPG", "WSH"
]

# Chemin vers la base de données SQLite
db_path = 'data/db.sqlite'


def save_team_to_db(team):
    """
    Enregistre les données de l'équipe et des joueurs dans la base de données SQLite.

    :param team: Objet Team contenant les informations de l'équipe et des joueurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        INSERT OR REPLACE INTO teams (code, name) VALUES (?, ?)
    ''', (team.team_name, team.team_name))

    for player in team.forwards + team.defensemen:
        cursor.execute('''
            INSERT OR REPLACE INTO players (id, team_code, name, position, points, goals, assists)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
        player.id, team.team_name, player.name, 'forward' if player in team.forwards else 'defenseman', player.points,
        player.goals, player.assists))

    conn.commit()
    conn.close()


def reset_db():
    """
    Réinitialise la base de données en supprimant toutes les entrées des tables `teams` et `players`.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        DELETE FROM teams
    ''')

    cursor.execute('''
        DELETE FROM players
    ''')

    conn.commit()
    conn.close()


def update_team(team_name):
    """
    Met à jour les données d'une équipe spécifique en récupérant les informations de l'API et en les enregistrant dans la base de données.

    :param team_name: Code de l'équipe à mettre à jour.
    """
    team = get_team(team_name)
    for player in team.forwards + team.defensemen:
        fill_player_stats(player)
    save_team_to_db(team)


def update_today_games_teams():
    """
    Met à jour les données des équipes jouant aujourd'hui en récupérant les informations de l'API et en les enregistrant dans la base de données.
    """
    games = get_today_games()

    for game in games:
        update_team(game.home)
        update_team(game.away)
        print(f"Updated {game.home} and {game.away}")


def update_all_teams():
    """
    Met à jour les données de toutes les équipes en récupérant les informations de l'API et en les enregistrant dans la base de données.
    """
    for team_name in teams:
        update_team(team_name)
        print(f"Updated {team_name}")


def get_team_best_points_scorers(team_name):
    """
    Récupère les trois meilleurs marqueurs de points d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs marqueurs de points.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, points FROM players WHERE lower(team_code) = lower(?) ORDER BY points DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players


def get_team_best_goal_scorers(team_name):
    """
    Récupère les trois meilleurs buteurs d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs buteurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, goals FROM players WHERE lower(team_code) = lower(?) ORDER BY goals DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players


def get_team_best_assist_scorers(team_name):
    """
    Récupère les trois meilleurs passeurs d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs passeurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, assists FROM players WHERE lower(team_code) = lower(?) ORDER BY assists DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_points_scorers(game):
    """
    Récupère les 5 meilleurs pointeurs des équipes jouant ce match.

    :return: Liste des 5 meilleurs marqueurs de points.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, points FROM players WHERE lower(team_code) = lower(?) OR lower(team_code) = lower(?) ORDER BY points DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_goal_scorers(game):
    """
    Récupère les 5 meilleurs buteurs des équipes jouant ce match.


    :return: Liste des 5 meilleurs buteurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, goals FROM players WHERE lower(team_code) = lower(?) OR lower(team_code) = lower(?) ORDER BY goals DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_assist_scorers(game):
    """
    Récupère les 5 meilleurs passeurs des équipes jouant ce match.

    :return: Liste des 5 meilleurs passeurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, assists FROM players WHERE lower(team_code) = lower(?) OR lower(team_code) = lower(?) ORDER BY assists DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_team_best_defensemen_points_scorers(team_name):
    """
    Récupère les trois meilleurs défenseurs marqueurs de points d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs défenseurs marqueurs de points.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, points FROM players WHERE lower(team_code) = lower(?) AND position = 'defenseman' ORDER BY points DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_team_best_defensemen_goal_scorers(team_name):
    """
    Récupère les trois meilleurs défenseurs buteurs d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs défenseurs buteurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, goals FROM players WHERE lower(team_code) = lower(?) AND position = 'defenseman' ORDER BY goals DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_team_best_defensemen_assist_scorers(team_name):
    """
    Récupère les trois meilleurs défenseurs passeurs d'une équipe spécifique.

    :param team_name: Code de l'équipe.
    :return: Liste des trois meilleurs défenseurs passeurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, assists FROM players WHERE lower(team_code) = lower(?) AND position = 'defenseman' ORDER BY assists DESC LIMIT 3
    ''', (team_name,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_defensemen_points_scorers(game):
    """
    Récupère les 5 meilleurs défenseurs pointeurs des équipes jouant ce match.

    :return: Liste des 5 meilleurs défenseurs marqueurs de points.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, points FROM players WHERE (lower(team_code) = lower(?) OR lower(team_code) = lower(?)) AND position = 'defenseman' ORDER BY points DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_defensemen_goal_scorers(game):
    """
    Récupère les 5 meilleurs défenseurs buteurs des équipes jouant ce match.

    :return: Liste des 5 meilleurs défenseurs buteurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, goals FROM players WHERE (lower(team_code) = lower(?) OR lower(team_code) = lower(?)) AND position = 'defenseman' ORDER BY goals DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

def get_game_best_defensemen_assist_scorers(game):
    """
    Récupère les 5 meilleurs défenseurs passeurs des équipes jouant ce match.

    :return: Liste des 5 meilleurs défenseurs passeurs.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, team_code, assists FROM players WHERE (lower(team_code) = lower(?) OR lower(team_code) = lower(?)) AND position = 'defenseman' ORDER BY assists DESC LIMIT 5
    ''', (game.home, game.away,))

    players = cursor.fetchall()
    conn.close()

    return players

