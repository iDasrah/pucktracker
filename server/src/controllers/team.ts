import { Request, Response } from "express";
import prisma from "../services/db";

export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.findUnique({
            where: { teamCode: id },
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