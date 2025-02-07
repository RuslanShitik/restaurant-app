import type { $Enums } from "@prisma/client";

declare module "#auth-utils" {
  interface User {
    id: number;
    role: $Enums.Role;
  }
}
