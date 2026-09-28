# Rules:

- Never use '\*' as the target origin when sending secrets.
- Always validate e.origin on receive.
- Sandboxed frames without allow-same-origin report e.origin === 'null'. Validate those with e.source instead.
- Treat e.data as untrusted input and validate its shape.

# Controlling who can embed you

Content-Security-Policy: frame-ancestors 'self' https://trusted.com
X-Frame-Options: DENY # legacy; frame-ancestors wins if both present

# control what you can embed

Content-Security-Policy: frame-src https://youtube.com https://usercontent.myapp.com
