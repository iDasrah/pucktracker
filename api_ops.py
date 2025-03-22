from datetime import datetime

import requests
from data.player import Player
from data.team import Team
from data.game import Game

def get_team(team_name):
    url = f"https://api-web.nhle.com/v1/roster/{team_name}/current"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch team data: {response.status_code}")

    try:
        data = response.json()
    except ValueError:
        raise Exception("Invalid JSON response")

    forwards = [Player(p["id"], f"{p['firstName']['default']} {p['lastName']['default']}") for p in data["forwards"]]
    defensemen = [Player(p["id"], f"{p['firstName']['default']} {p['lastName']['default']}") for p in data["defensemen"]]

    return Team(team_name, defensemen, forwards)

def fill_player_stats(player):
    url = f"https://api-web.nhle.com/v1/player/{player.id}/landing"
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Failed to fetch stats for {player.name}: {response.status_code}")
        return player

    try:
        stats = response.json()["last5Games"]
        points = sum(stat["points"] for stat in stats)
        goals = sum(stat["goals"] for stat in stats)
        assists = sum(stat["assists"] for stat in stats)
        player.update_stats(points, goals, assists)
    except (ValueError, KeyError):
        print(f"Could not find stats for {player.name}")

    return player

def get_today_games():
    now = datetime.now()
    date = now.strftime("%Y-%m-%d")
    url = f"https://api-web.nhle.com/v1/schedule/{date}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch schedule data: {response.status_code}")

    try:
        data = response.json()
    except ValueError:
        raise Exception("Invalid JSON response")

    games_of_day = data["gameWeek"][0]["games"]

    games = []

    for game in games_of_day:
        home = game["homeTeam"]["abbrev"]
        away = game["awayTeam"]["abbrev"]
        games.append(Game(home, away))

    return games