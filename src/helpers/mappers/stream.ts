import type { Stream } from "@/entities/stream";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperStream = (data: Record<string, unknown>): Stream => {
  return {
    id: getNumber(data.id),
    title: getString(data.title),
    description: getString(data.description),
    url: getString(data.url),
    status: data.status?.toString() === "true",
    createdAt: getString(data.created_at),
    recordedAt: getDateToString(data.recorded_at),
    updatedAt: getDateToString(data.updated_at),
  };
};

const mapToJsonStream = (stream: Stream) => {
  return {
    title: stream.title,
    description: stream.description,
    url: stream.url,
    status: stream.status,
    created_at: stream.createdAt,
  };
};

export { mapperStream, mapToJsonStream };
