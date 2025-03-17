import { Request, Response } from "express";
import { fetchAppointments } from "./odooService";

export async function getAppointments(req: Request, res: Response) {
    try {
        const appointments = await fetchAppointments();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des rendez-vous." });
    }
}