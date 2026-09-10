"""Controlled CSP fixtures; these do not change browser-wide preferences."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3] / 'dist'


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        if '?nojs' in self.path:
            self.send_header('Content-Security-Policy', "script-src 'none'")
        if '?missing' in self.path:
            self.send_header('Content-Security-Policy', "img-src 'none'")
        super().end_headers()


ThreadingHTTPServer(('127.0.0.1', 4198), Handler).serve_forever()
