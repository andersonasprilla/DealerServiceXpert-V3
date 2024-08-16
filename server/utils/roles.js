// roles.js

// Define roles
const ROLES = {
  USER: 'User',
  SERVICE_ADVISOR: 'Service Advisor',
  MANAGER: 'Manager',
  ADMIN: 'Admin'
};

// Define permissions
const PERMISSIONS = {
  READ_PROFILE: 'read:profile',
  UPDATE_PROFILE: 'update:profile',
  READ_USERS: 'read:users',
  CREATE_USER: 'create:user',
  UPDATE_USER: 'update:user',
  DELETE_USER: 'delete:user',
  READ_REPAIR_ORDERS: 'read:repair_orders',
  CREATE_REPAIR_ORDER: 'create:repair_order',
  UPDATE_REPAIR_ORDER: 'update:repair_order',
  DELETE_REPAIR_ORDER: 'delete:repair_order'
};

// Define role-based permissions
const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE
  ],
  [ROLES.SERVICE_ADVISOR]: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.READ_REPAIR_ORDERS,
    PERMISSIONS.CREATE_REPAIR_ORDER,
    PERMISSIONS.UPDATE_REPAIR_ORDER,
    PERMISSIONS.READ_USERS,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.READ_USERS,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.READ_REPAIR_ORDERS,
    PERMISSIONS.CREATE_REPAIR_ORDER,
    PERMISSIONS.UPDATE_REPAIR_ORDER,
    PERMISSIONS.DELETE_REPAIR_ORDER
  ],
  [ROLES.ADMIN]: Object.values(PERMISSIONS) // Admin has all permissions
};

// Helper function to check if a role has a specific permission
const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

// Helper function to get all permissions for a role
const getPermissionsForRole = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

export { ROLES, PERMISSIONS, hasPermission, getPermissionsForRole };