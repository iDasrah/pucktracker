import prisma from "../services/db";
import { Request, Response } from "express";

export const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const players = await prisma.player.findMany();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await prisma.player.findUnique({
            where: { id: Number(id) },
        });
        if (!player) {
            res.status(404).json({ error: "Player not found" });
            return;
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPlayerStats = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const playerStats = await prisma.playerStats.findMany({
            where: { playerId: Number(id) },
        });
        res.status(200).json(playerStats);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}