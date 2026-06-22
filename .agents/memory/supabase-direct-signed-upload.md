---
name: Supabase direct signed-upload (browser → private bucket)
description: Contract for uploading artwork straight to a private Supabase bucket, bypassing the serverless body cap
---

# Direct-to-Supabase artwork upload

To bypass Vercel's ~4.5MB request-body cap, artwork is uploaded DIRECTLY from the browser to
the private `quote-artwork` bucket, never through the function.

## Flow
1. Browser POSTs `{fileName,fileType,fileSize}` to `POST /api/quote-request/upload-url`.
   Server validates type (extension OR MIME allowed) and size (≤25MB) FIRST, then calls
   `supabase.storage.from(bucket).createSignedUploadUrl(objectPath)` and returns
   `{uploadUrl, token, fileId, fileName}`. `objectPath = randomUUID()-slug.ext`.
2. Browser does a RAW `fetch(uploadUrl, {method:"PUT", headers:{"Content-Type":type}, body:file})`.
   No supabase-js on the client — the signed URL is absolute with the token in the query string.
3. `fileId` (the storage object path) is echoed back on submit as `artworkFileId`; the
   notification email signs a download URL from it via `createSignedUrl(path, ttl)`.

## Gotchas
- **25MB is only client-reported at issue time.** The signed URL does NOT cap object size.
  The real backstop is the bucket's `file_size_limit` — set `quote-artwork` to 25MB or a liar
  client can store bigger files.
- **Browser PUT needs Supabase Storage CORS** to allow the prod origin (e.g. merchclub.com),
  method PUT, and the Content-Type header. Node smoke tests do NOT exercise CORS/preflight —
  a passing curl/Node round trip does not prove the real browser upload works.
- Service role key stays server-side; the browser only ever gets a scoped, expiring upload URL.
- The upload-url endpoint is public → abusable for storage consumption; rely on bucket limits +
  rate limiting (note: in-memory rate limiter resets per serverless instance — best-effort only).
