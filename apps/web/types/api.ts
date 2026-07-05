/**
 * @file types/api.ts
 * @description Standardized API response wrapper types for LearnVeda
 * All API endpoints use these wrappers for consistent error handling
 * Matches the unified response format documented in the API Reference
 */

/* ─── Success Response ────────────────────────────────────────────────────── */
/**
 * Standard success API response shape
 * @example { ok: true, data: { user: { id: "123", name: "Arjun" } } }
 */
export interface ApiSuccess<T> {
  ok:       true;         // Always true for success responses
  data:     T;            // The response payload (generic type)
  message?: string;       // Optional success message (e.g. "Profile updated")
}

/* ─── Error Response ──────────────────────────────────────────────────────── */
/**
 * Standard error API response shape
 * @example { ok: false, error: { code: "NOT_FOUND", message: "User not found" } }
 */
export interface ApiError {
  ok:    false;           // Always false for error responses
  error: {
    code:     string;     // Machine-readable error code (e.g. "UNAUTHORIZED")
    message:  string;     // Human-readable error description
    details?: unknown;    // Optional additional error context (validation errors, etc.)
    field?:   string;     // Form field that caused the error (for validation)
  };
}

/* ─── Unified Response ────────────────────────────────────────────────────── */
/**
 * Union type of success and error responses — use this as your API function return type
 * @example
 * async function fetchUser(id: string): Promise<ApiResponse<User>> { ... }
 * const result = await fetchUser("123");
 * if (result.ok) { console.log(result.data.name); } else { console.error(result.error.message); }
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/* ─── Paginated Response ──────────────────────────────────────────────────── */
/**
 * Wrapper for paginated list responses
 */
export interface PaginatedData<T> {
  items:      T[];     // Array of items for this page
  total:      number;  // Total item count across all pages
  page:       number;  // Current page number (1-based)
  perPage:    number;  // Items per page
  totalPages: number;  // Total number of pages
  hasMore:    boolean; // Whether there are more pages after this one
}

/* ─── Sort Direction ─────────────────────────────────────────────────────── */
export type SortDirection = "asc" | "desc"; // Ascending or descending sort

/* ─── Common Query Params ─────────────────────────────────────────────────── */
/**
 * Standard query parameters for list endpoints
 */
export interface ListQueryParams {
  page?:    number;         // Page number (default: 1)
  perPage?: number;         // Items per page (default: 20)
  sort?:    string;         // Field to sort by
  dir?:     SortDirection;  // Sort direction
  search?:  string;         // Text search query
}

/* ─── Common Error Codes ─────────────────────────────────────────────────── */
export type ApiErrorCode =
  | "UNAUTHORIZED"        // Not authenticated
  | "FORBIDDEN"           // Authenticated but insufficient permissions
  | "NOT_FOUND"           // Requested resource doesn't exist
  | "VALIDATION_ERROR"    // Invalid request data
  | "RATE_LIMITED"        // Too many requests
  | "SERVER_ERROR"        // Internal server error
  | "CONFLICT"            // Resource already exists
  | "PAYMENT_REQUIRED"    // Pro feature requires upgrade
  | "EXTERNAL_ERROR";     // Third-party service failure (Clerk, Stripe, etc.)
