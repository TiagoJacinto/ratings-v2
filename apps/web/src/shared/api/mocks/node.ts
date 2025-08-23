import { setupServer } from "msw/node";
import { handlers } from "@/gen";

export const server = setupServer(...handlers);
