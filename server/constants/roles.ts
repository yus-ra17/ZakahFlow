export const Roles = {
    SUPERADMIN: "SUPERADMIN",
    ADMIN: "ADMIN",
    ZAKAH_OFFICER: "ZAKAH_OFFICER",
    DONOR: "DONOR",
  };
  
  export const RolePower: Record<string, number> = {
    SUPERADMIN: 4,
    ADMIN: 3,
    ZAKAH_OFFICER: 2,
    DONOR: 1,
  };
  