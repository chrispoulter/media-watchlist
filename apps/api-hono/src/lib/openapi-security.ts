// Kept as a separately-typed const (not an inline array literal) because a two-entry
// inline `security` array breaks @hono/zod-openapi's request-validation type inference
// for the whole route (a bug in its `ComputeInput` generics, reproduced in isolation).
export const authSecurity: Record<string, string[]>[] = [
    { bearerAuth: [] },
    { cookieAuth: [] },
];
