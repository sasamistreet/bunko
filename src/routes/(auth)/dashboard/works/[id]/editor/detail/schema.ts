import { z } from "zod";

const mediatype = ["DIAGRAM", "PHOTO", "VIDEO"] as const;
const transitions = ["FORWARD", "ENLARGE", "SHRINK", "ROTATE", "REPEAT", "TURN", "COMPLETED"] as const;

export const stepDetailSchema = z.object({
    id:z.string(),
    workId: z.number().nullable(),
    step: z.number().nullable(),
    media_default: z.enum(mediatype).nullable(),
    media_diagram: z.string().nullable(),
    media_photo: z.string().nullable(),
    media_video: z.string().nullable(),
    scale: z.number().nullable(),
    position_x: z.number().nullable(),
    position_y: z.number().nullable(),
    angle: z.number().nullable(),
    caption: z.string().min(0).max(200).nullable(),
    transition: z.enum(transitions).optional(),
    transition_caption: z.string().min(0).max(10).nullable(),
});
export type StepDetailSchema = typeof stepDetailSchema;