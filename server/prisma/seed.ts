import prisma from "../src/services/db";

const seedTeams = async () => {
    const data = await fetch("https://api.nhle.com/stats/rest/en/team");
    const json = await data.json();

    const teams = json.data.map((team: { triCode: any; fullName: any; }) => {
        return {
            teamCode: team.triCode,
            name: team.fullName,
        }
    });

    await prisma.team.createMany({
        data: teams,
        skipDuplicates: true,
    });
}

const seedPlayers = async () => {
    const teams = await prisma.team.findMany();

    for (const team of teams) {
        const url = `https://api-web.nhle.com/v1/roster/${team.teamCode}/current`;

        try {
            const data = await fetch(url);
            const json = await data.json();

            type PlayerRaw = {
                id: number;
                firstName: { default: string };
                lastName: { default: string };
            };

            const mapPlayer = (p: PlayerRaw, position: string) => ({
                id: p.id,
                fullName: `${p.firstName.default} ${p.lastName.default}`,
                position,
                teamId: team.teamCode,
            });

            const forwards = json.forwards.map((p: PlayerRaw) => mapPlayer(p, "forward"));
            const defensemen = json.defensemen.map((p: PlayerRaw) => mapPlayer(p, "defenseman"));

            await prisma.player.createMany({
                data: [...forwards, ...defensemen],
                skipDuplicates: true,
            });
        } catch (error) {
            console.error(`Error fetching data for team ${team.teamCode}`);
        }
    }
}

const seedPlayerStats = async () => {
    const players = await prisma.player.findMany();

    for (const player of players) {
        try {
            const data = await fetch(`https://api-web.nhle.com/v1/player/${player.id}/landing`);
            const json = await data.json();

            let goals = 0;
            let assists = 0;
            let points = 0;

            json.last5Games.forEach((game: { goals: number; assists: number; points: number; }) => {
                goals = game.goals;
                assists = game.assists;
                points = game.points;
            });

            const stats = {
                playerId: player.id,
                goals,
                assists,
                points
            }

            await prisma.playerStats.create({
                data: stats,
            });
        } catch (error) {
            console.error(`Error fetching data for player ${player.id}`);
        }

    }
}

const seed = async () => {
    await seedTeams();
    await seedPlayers();
    await seedPlayerStats();
}

seed()
    .then(() => {
        console.log("Seeding completed.");
    })
    .catch((error) => {
        console.error("Error seeding data:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });