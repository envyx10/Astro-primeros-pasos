import client from "@/lib/client";
import type { Training, TrainingWithLessons, Lesson} from "./model";

export async function getTrainings(): Promise<TrainingWithLessons[]> {
  const trainings = await client.getContentList<Training>({
    contentType: "training",
  });

  // For each training, fetch its lessons and return the enriched object
  const trainingsWithLessons = await Promise.all(
    trainings.map(async (training) => {
      // Fetch the lesson objects using the stored lesson IDs
      const lessons = await getLessons(training.lessons);

      // Return a new object that includes full lesson data
      return {
        ...training,
        lessons,
      };
    }),
  );

  // Return the final list of trainings with full lessons
  return trainingsWithLessons;
}

export async function getLessons(ids: string[]): Promise<Lesson[]> {
  return await client.getContentList<Lesson>({
    contentType: "Lesson",
    id: { in: ids },
  });
}