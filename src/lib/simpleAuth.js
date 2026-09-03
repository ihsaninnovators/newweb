// Simple hardcoded email/password list — add or remove entries here.
const USERS = {
  "aayanjafri73@gmail.com": "ihsan30695",
  "ihsaninnovators@gmail.com": "ihsan30695",
};

const STORAGE_KEY = "ihsan_admin_session";

export const simpleAuth = {
  login(email, password) {
    const normalized = (email || "").trim().toLowerCase();
    if (USERS[normalized] && USERS[normalized] === password) {
      localStorage.setItem(STORAGE_KEY, normalized);
      return true;
    }
    return false;
  },
  isAuthed() {
    return !!localStorage.getItem(STORAGE_KEY);
  },
  getUser() {
    return localStorage.getItem(STORAGE_KEY);
  },
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
};