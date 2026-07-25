export interface SessionData {
  username: string;
  role: 'viewer' | 'editor';
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: '',
  role: 'viewer',
  isLoggedIn: false,
};
