import { setupWorker } from "msw/browser";
import { handlers } from "@/gen";

export const browser = setupWorker(...handlers);
