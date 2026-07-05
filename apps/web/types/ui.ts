/**
 * @file types/ui.ts
 * @description Shared UI component prop types and design system tokens
 * Used across all UI components for consistent typing and design
 */

/* ─── Color Variants ──────────────────────────────────────────────────────── */
export type ColorVariant =
  | "brand"    // Primary purple brand color
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "cyan"
  | "gray";

/* ─── Size Variants ───────────────────────────────────────────────────────── */
export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

/* ─── Status Type ─────────────────────────────────────────────────────────── */
export type StatusType =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "empty";

/* ─── Navigation Item ─────────────────────────────────────────────────────── */
/**
 * Used in navbar, sidebar, breadcrumbs
 */
export interface NavItem {
  href:    string;          // Route destination
  label:   string;          // Display text
  icon?:   React.ReactNode; // Optional icon
  badge?:  string | number; // Optional notification badge
  active?: boolean;         // Whether this item is currently active
  external?: boolean;       // Opens in new tab
  disabled?: boolean;       // Greyed out/non-clickable
}

/* ─── Tab Item ────────────────────────────────────────────────────────────── */
export interface TabItem {
  id:      string;          // Unique tab identifier
  label:   string;          // Display label
  icon?:   React.ReactNode; // Optional icon
  count?:  number;          // Badge count
  content?: React.ReactNode; // Tab panel content
}

/* ─── Table Column ────────────────────────────────────────────────────────── */
/**
 * Column definition for data tables
 */
export interface TableColumn<T> {
  key:       keyof T | string;    // Data key to display
  header:    string;              // Column header label
  width?:    string;              // Optional CSS width
  sortable?: boolean;             // Whether this column can be sorted
  render?:   (value: unknown, row: T) => React.ReactNode; // Custom cell renderer
  align?:    "left" | "center" | "right"; // Text alignment
}

/* ─── Toast Notification ──────────────────────────────────────────────────── */
export interface ToastMessage {
  id:       string;                             // Unique toast ID
  type:     "success" | "error" | "warning" | "info"; // Toast style
  title:    string;                             // Short title
  message?: string;                            // Optional longer description
  duration?: number;                           // Auto-dismiss time in ms (0 = persistent)
  action?:  { label: string; onClick: () => void }; // Optional action button
}

/* ─── Modal Props ─────────────────────────────────────────────────────────── */
export interface ModalProps {
  isOpen:    boolean;      // Whether modal is visible
  onClose:   () => void;   // Close handler
  title?:    string;       // Modal title
  children:  React.ReactNode; // Modal content
  size?:     "sm" | "md" | "lg" | "xl" | "full"; // Modal size
}

/* ─── Chart Data Point ────────────────────────────────────────────────────── */
export interface ChartDataPoint {
  label:    string;  // X-axis label
  value:    number;  // Y-axis value
  color?:   string;  // Bar/line color
  tooltip?: string;  // Custom tooltip text
}

/* ─── Skeleton Loader Props ───────────────────────────────────────────────── */
export interface SkeletonProps {
  width?:  string | number; // Width (CSS value or pixels)
  height?: string | number; // Height (CSS value or pixels)
  rounded?: boolean;        // Circular skeleton (for avatars)
  className?: string;       // Additional CSS classes
}
