import { z } from "zod";

// ==========================================
// CORE VALIDATION SCHEMAS - Essential validations for grade points
// ==========================================

// Authentication schemas
export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const RegisterSchema = z.object({
  email: z.string().email("Please enter a valid email"), 
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  full_name: z.string().min(2, "Name must be at least 2 characters")
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Playlist schemas
export const CreatePlaylistSchema = z.object({
  name: z.string().min(1, "Playlist name is required").max(100, "Name too long"),
  user_id: z.string().uuid("Invalid user ID")
});

// User schemas
export const UpdateUserSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  user_id: z.string().uuid("Invalid user ID")
});

// Song schemas
export const SongSearchSchema = z.object({
  query: z.string().min(1, "Search query is required").max(100, "Query too long")
});

export const SaveSongSchema = z.object({
  title: z.string().min(1, "Song title is required"),
  artist: z.string().min(1, "Artist name is required"),
  user_id: z.string().uuid("Invalid user ID"),
  song_path: z.string().min(1, "Song path is required")
});

// ==========================================
// GENERATED TYPES - Auto-inferred from Zod schemas
// ==========================================

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type CreatePlaylistData = z.infer<typeof CreatePlaylistSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
export type SongSearchData = z.infer<typeof SongSearchSchema>;
export type SaveSongData = z.infer<typeof SaveSongSchema>;

// ==========================================
// VALIDATION UTILITIES - Simple helper functions
// ==========================================

// Result type for validation operations
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
};

// Main validation function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  // Transform Zod errors into our format
  const errors: Record<string, string[]> = {};
  result.error.errors.forEach(error => {
    const path = error.path.join('.') || 'general';
    if (!errors[path]) errors[path] = [];
    errors[path].push(error.message);
  });
  
  return { success: false, errors };
}

// Quick validation for forms
export function getFieldError(errors: Record<string, string[]> | undefined, field: string): string | undefined {
  return errors?.[field]?.[0];
}

// Check if validation has errors
export function hasErrors(errors: Record<string, string[]> | undefined): boolean {
  return Boolean(errors && Object.keys(errors).length > 0);
}