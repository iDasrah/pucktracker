class Game:
    def __init__(self, home, away):
        self.home = home
        self.away = away

    def __str__(self):
        return f"{self.home} vs {self.away}"
