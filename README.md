# FastAPI redirect service

Routes are configured independently in [`routes.py`](routes.py). Each nested path ending in a URL returns a `302` redirect; unknown paths and intermediate configuration nodes return `404 Not Found`.

## Local development

```bash
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn api.index:app --reload
```

The service is then available at `http://127.0.0.1:8000`.

## Vercel

Set the project root to this directory and deploy. Vercel detects `api/index.py` as a Python function. `vercel.json` forwards all incoming paths to the FastAPI application.
