# Feature Flag Interceptor

A NestJS mini-project demonstrating how to use a global interceptor to conditionally modify API responses based on an environment-driven feature flag — without touching the controller logic.

## How It Works

- `GET /profile` returns a profile object that includes a `secretFeature` field (representing a feature still in testing).
- A global `FeatureFlagInterceptor` intercepts every outgoing response.
- It reads the `SHOW_SECRET_FEATURE` flag from `.env` via `ConfigService`.
- If the flag is `"false"`, the `secretFeature` field is stripped from the response before it reaches the client.
- If the flag is `"true"`, the response is returned unchanged.
- The controller itself never changes — toggling the flag in `.env` is enough to turn the field on or off everywhere it's used.

## Setup

```bash
pnpm install
```

Create a `.env` file in the project root:

```
SHOW_SECRET_FEATURE=false
```

## Running

```bash
pnpm run start:dev
```

The server runs on `http://localhost:3000`.

## Testing

```
GET /profile
```

- `SHOW_SECRET_FEATURE=false` → response has only `username` and `email`.
- `SHOW_SECRET_FEATURE=true` → response also includes `secretFeature`.

(Restart the server after changing `.env` to make sure the new value is picked up.)

## Tech Stack

- NestJS
- `@nestjs/config` (for reading `.env`)
- RxJS (`Observable`, `pipe`, `map`)

## What I Learned

- Writing a custom interceptor using the `NestInterceptor` interface and `intercept()` method
- The role of `CallHandler` and `next.handle()` — it returns an `Observable` that only runs the controller once subscribed to (NestJS subscribes to it automatically)
- Using `.pipe()` and `map()` from RxJS to transform the response stream before it reaches the client
- The core difference between a Guard (only decides pass/reject, can't touch the response), a Filter (only runs on errors), and an Interceptor (can transform both request handling and the successful response)
- Removing a field from an object using destructuring (`const { field, ...rest } = obj`)
- Registering a global interceptor using the `APP_INTERCEPTOR` token (same pattern as `APP_GUARD` and `APP_FILTER`)
- Values read from `.env` are always strings, so `"false"` must be compared as a string, not a boolean