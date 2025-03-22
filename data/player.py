class Player:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.points = 0
        self.goals = 0
        self.assists = 0

    def update_stats(self, points, goals, assists):
        self.points = points
        self.goals = goals
        self.assists = assists

    def __str__(self):
        return f"{self.name}: {self.points} points ({self.goals} goals, {self.assists} assists)"