import type { Media } from "@content-island/api-client";

export interface Training {
  id: string;
  title: string;
  overview: string;
  slug: string;
  thumbnail: Media;
  lessons: string[];
}