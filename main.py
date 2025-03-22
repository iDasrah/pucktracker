from db_ops import *
import argparse

parser = argparse.ArgumentParser(description="Update the database with the latest data from the NHL API.")
parser.add_argument("--team", help="Update a specific team by providing its team code.")
parser.add_argument("--all", action="store_true", help="Update all teams.")
parser.add_argument("--today", action="store_true", help="Update today's games teams.")
parser.add_argument("--reset", action="store_true", help="Reset the database.")
args = parser.parse_args()

def menu():
    print("1. Update by team")
    print("2. Update all teams")
    print("3. Update today's games teams")
    print("4. Reset database")
    print("----------------------------------")
    print("5. Get best point scorers of a team")
    print("6. Get best goal scorers of a team")
    print("7. Get best assist scorers of a team")
    print("----------------------------------")
    print("8. Get today's games")
    print("9. Get best point scorers of a game")
    print("10. Get best goal scorers of a game")
    print("11. Get best assist scorers of a game")
    print("----------------------------------")
    print("12. Exit")

    return input("Choose an option: ")

def handle_menu():
    while True:
        option = menu()

        if option == "1":
            team_name = input("Enter team code: ")
            update_team(team_name)
            print(f"Updated {team_name}")
            break
        elif option == "2":
            update_all_teams()
            print("Updated all teams")
            break
        elif option == "3":
            update_today_games_teams()
            print("Updated today's games teams")
        elif option == "4":
            reset_db()
            print("Database reset")
            break
        elif option == "5":
            team_name = input("Enter team code: ")
            players = get_team_best_points_scorers(team_name)
            for player in players:
                print(f"{player[0]}: {player[1]} points")
            break
        elif option == "6":
            team_name = input("Enter team code: ")
            players = get_team_best_goal_scorers(team_name)
            for player in players:
                print(f"{player[0]}: {player[1]} goals")
            break
        elif option == "7":
            team_name = input("Enter team code: ")
            players = get_team_best_assist_scorers(team_name)
            for player in players:
                print(f"{player[0]}: {player[1]} assists")
            break
        elif option == "8":
            games = get_today_games()
            for game in games:
                print(game)
            break
        elif option == "9":
            games = get_today_games()
            for game in games:
                print(game)
            game_index = int(input("Enter game index: "))
            players = get_game_best_points_scorers(games[game_index])
            for player in players:
                print(f"{player[0]} ({player[1]}): {player[2]} points")
            break
        elif option == "10":
            games = get_today_games()
            for game in games:
                print(game)
            game_index = int(input("Enter game index: "))
            players = get_game_best_goal_scorers(games[game_index])
            for player in players:
                print(f"{player[0]} ({player[1]}): {player[2]} goals")
            break
        elif option == "11":
            games = get_today_games()
            for game in games:
                print(game)
            game_index = int(input("Enter game index: "))
            players = get_game_best_assist_scorers(games[game_index])
            for player in players:
                print(f"{player[0]} ({player[1]}): {player[2]} assists")
            break
        else:
            break

def main():
    if args.team:
        print("Updating team...")
        update_team(args.team)
        print(f"Updated {args.team}")
    elif args.all:
        print("Updating all teams...")
        update_all_teams()
        print("Updated all teams")
    elif args.today:
        print("Updating today's games teams...")
        update_today_games_teams()
        print("Updated today's games teams")
    elif args.reset:
        print("Resetting database...")
        reset_db()
        print("Database reset")
    else:
        handle_menu()


if __name__ == "__main__":
    main()