import http, { type IncomingMessage, type ServerResponse } from "node:http";
import Route, { type RouteTree } from "./routes.js";

const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

export function findRoute(pathname: string): string | null {
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

function sendText(
    response: ServerResponse,
    statusCode: number,
    body: string,
): void {
    response.writeHead(statusCode, {
        "Content-Type": "text/plain; charset=utf-8",
    });
    response.end(body);
}

function handleRequest(
    request: IncomingMessage,
    response: ServerResponse,
): void {
    if (!request.url) {
        sendText(response, 400, "Bad Request\n");
        return;
    }

    let url: URL;
    try {
        url = new URL(
            request.url,
            `http://${request.headers.host || "localhost"}`,
        );
    } catch {
        sendText(response, 400, "Bad Request\n");
        return;
    }

    const target = findRoute(url.pathname);
    if (!target) {
        sendText(response, 404, "Not Found\n");
        return;
    }

    response.writeHead(302, { Location: target });
    response.end();
}

export function createServer(): http.Server {
    return http.createServer(handleRequest);
}

const server = createServer();
server.listen(PORT, HOST, () => {
    console.log(`Redirect server listening on http://${HOST}:${PORT}`);
});

function shutdown(signal: NodeJS.Signals): void {
    console.log(`Received ${signal}, shutting down...`);
    server.close((error) => {
        if (error) {
            console.error(error);
            process.exitCode = 1;
        }
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
