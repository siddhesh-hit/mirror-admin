let deData = localStorage.getItem("userInfo");

export const authState = {
  isAuthenticated: deData ? true : null,
  user: deData ? deData : {},
};
