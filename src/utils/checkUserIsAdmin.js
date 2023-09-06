export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser) return false;
  if (!('userRoles' in currentUser)) return false;
  if (!Array.isArray(currentUser.userRoles)) return false;

  const userRoles = currentUser.userRoles;
  if (userRoles.includes('admin')) return true;
  return false;
};
