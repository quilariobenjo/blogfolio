import type { AdapterUser as DefaultAdapterUser } from "@auth/core/adapters"
import { type User } from "@/generated/prisma"

declare module "@auth/core/adapters" {
  export interface AdapterUser extends DefaultAdapterUser {
    role: User["role"]
  }
}
