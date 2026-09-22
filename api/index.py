"""FastAPI application for configurable path redirects on Vercel."""

from collections.abc import Mapping
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, PlainTextResponse

from api.routes import ROUTES

app = FastAPI(title="Link Redirect Service", docs_url=None, redoc_url=None)


def resolve_target(path: str) -> str | None:
    """Resolve a slash-separated path to a configured URL."""
    current: object = ROUTES
    for part in path.strip("/").split("/"):
        if not part:
            continue
        if not isinstance(current, Mapping) or part not in current:
            return None
        current = current[part]

    return current if isinstance(current, str) else None


def append_query(target: str, request: Request) -> str:
    """Preserve incoming query parameters without discarding target parameters."""
    if not request.url.query:
        return target

    parsed = urlsplit(target)
    target_query = parse_qsl(parsed.query, keep_blank_values=True)
    incoming_query = parse_qsl(request.url.query, keep_blank_values=True)
    return urlunsplit(parsed._replace(query=urlencode(target_query + incoming_query)))


@app.api_route("/{path:path}", methods=["GET", "HEAD"])
async def redirect(request: Request, path: str):
    target = resolve_target(path)
    if target is None:
        return PlainTextResponse("Not Found", status_code=404)
    return RedirectResponse(append_query(target, request), status_code=302)


@app.get("/")
async def root():
    return PlainTextResponse("Not Found", status_code=404)
