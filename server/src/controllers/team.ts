import { Request, Response } from "express";
import prisma from "../services/db";
import {Prisma} from "@prisma/client";

export const getAllTeams = async (req: Request, res: Response) => {
    const filter: Prisma.TeamWhereInput = {};
    const { name } = req.query;

    if (name) {
        filter.name = {
            contains: String(req.query.name),
            mode: "insensitive",
        };
    }

    try {
        const teams = await prisma.team.findMany(
            {
                where: filter,
                orderBy: {
                    name: "asc",
                },
            }
        );
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const include: Prisma.TeamInclude = {};
    const { includePlayers } = req.query;

    if (includePlayers) {
        include.players = true;
    }

    try {
        const team = await prisma.team.findUnique({
            where: { teamCode: id },
            include
        });
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getTeamPlayers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const teamPlayers = await prisma.player.findMany({
            where: { team: { teamCode: id } },
        });
        res.status(200).json(teamPlayers);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}