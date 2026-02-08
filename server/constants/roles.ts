export const Roles = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  DISTRIBUTOR: "DISTRIBUTOR",
  DONOR: "DONOR",
};

export const RolePower: Record<string, number> = {
  SUPERADMIN: 4,
  ADMIN: 3,
  DISTRIBUTOR: 2,
  DONOR: 1,
};
