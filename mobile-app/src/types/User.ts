export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
  avatar_url?: string;
  is_premium?: boolean;
}