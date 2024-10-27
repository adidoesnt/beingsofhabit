"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export const useIsMobile = async () => {
  const agent = userAgent({ headers: headers() });
  const device = agent.device?.type ?? "";
  return device.includes("mobile");
};
