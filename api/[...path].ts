import type { VercelRequest, VercelResponse } from "@vercel/node";
import Route, { type RouteTree } from "../src/routes.js";

function findRoute(pathname: string): string | null {
    const segments = pathname.split("/").filter(Boolean);
    let current: string | RouteTree = Route;

    for (const segment of segments) {
        if (typeof current === "string" || !(segment in current)) {
            return null;
        }

        current = current[segment];
    }

    return typeof current === "string" ? current : null;
}

export default function handler(
    request: VercelRequest,
    response: VercelResponse,
): void {
    const pathname = new URL(
        request.url || "/",
        `https://${request.headers.host || "localhost"}`,
    ).pathname;

    const target = findRoute(pathname);
    if (!target) {
        response.status(404).type("text/plain").send("Not Found\n");
        return;
    }

    response.redirect(302, target);
}
