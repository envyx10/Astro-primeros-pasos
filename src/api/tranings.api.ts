import client from "@/lib/client";
import type { Training } from "./model";

export async function getTrainings(): Promise<Training[]> {
  return await client.getContentList<Training>({ contentType: "training" });
}