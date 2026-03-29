const KEYS = {
  session: "ms_session",
  users: "ms_users",
};

export const getSession = () => {
  const session = localStorage.getItem(KEYS.session);
  return session ? JSON.parse(session) : null;
};

export const saveSession = (user) => {
  localStorage.setItem(KEYS.session, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(KEYS.session);
};

export const getUsers = () => {
  const users = localStorage.getItem(KEYS.users);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
};
