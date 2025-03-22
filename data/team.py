class Team:
    def __init__(self, team_name, defensemen, forwards):
        self.team_name = team_name
        self.defensemen = defensemen
        self.forwards = forwards

    def __str__(self):
        # Print forwards
        forwards_str = "Forwards:\n"
        for forward in self.forwards:
            forwards_str += f"{forward}\n"

        # Print defensemen
        defensemen_str = "Defensemen:\n"
        for defenseman in self.defensemen:
            defensemen_str += f"{defenseman}\n"

        return f"{self.team_name}\n{forwards_str}\n{defensemen_str}"