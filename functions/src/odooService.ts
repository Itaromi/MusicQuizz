import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ODOO_URL = process.env.ODOO_URL!;
const DB_NAME = process.env.ODOO_DB!;
const USERNAME = process.env.ODOO_USER!;
const PASSWORD = process.env.ODOO_PASSWORD!;

export async function authenticate() {
    try {
        const response = await axios.post(ODOO_URL, {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                service: "common",
                method: "authenticate",
                args: [DB_NAME, USERNAME, PASSWORD, {}],
            },
        });

        return response.data.result; // UID Odoo
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        return null;
    }
}

export async function fetchAppointments() {
    const uid = await authenticate();
    if (!uid) return [];

    try {
        const response = await axios.post(ODOO_URL, {
            jsonrpc: "2.0",
            method: "call",
            id: 2,
            params: {
                service: "object",
                method: "execute_kw",
                args: [
                    DB_NAME,
                    uid,
                    PASSWORD,
                    "calendar.event",
                    "search_read",
                    [[]],
                    { fields: ["name", "start", "stop", "partner_id"] },
                ],
            },
        });

        return response.data.result;
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        return [];
    }
}