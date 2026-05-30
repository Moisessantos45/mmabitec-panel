import type { Project } from "@/entities/project";
import { serializeToJson } from "./parse";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperProject = (data: Record<string, unknown>): Project => {
  return {
    id: getNumber(data.id),
    slug: getString(data.slug),
    title: getString(data.title),
    typeProject: getString(data.type_project),
    description: getString(data.description),
    technologies: serializeToJson<string>(data.technologies, []),
    characteristics: serializeToJson<string>(data.characteristics, []),
    learning: serializeToJson<string>(data.learning, []),
    banner: getString(data.banner),
    images: serializeToJson<string>(data.images, []),
    link: getString(data.link),
    createdAt: getDateToString(data.created_at),
    linkFrontend: serializeToJson<string>(data.link_frontend, []),
    linkBackend: serializeToJson<string>(data.link_backend, []),
    stateId: getNumber(data.state_id),
    counterLikes: getNumber(data.counter_likes),
  };
};

const mapperProjectBasic = (data: Record<string, unknown>) => {
  return {
    id: getNumber(data.id),
    slug: getString(data.slug),
    title: getString(data.title),
    typeProject: getString(data.type_project),
    banner: getString(data.banner),
    stateId: getNumber(data.state_id),
    createdAt: getDateToString(data.created_at),
  };
};

const mapToJsonProject = (project: Project): Record<string, unknown> => {
  return {
    title: project.title,
    type_project: project.typeProject,
    description: project.description,
    technologies: project.technologies,
    characteristics: project.characteristics,
    learning: project.learning,
    banner: project.banner,
    images: project.images,
    link: project.link,
    created_at: project.createdAt,
    link_frontend: project.linkFrontend,
    link_backend: project.linkBackend,
    state_id: project.stateId,
  };
};

export { mapperProject, mapperProjectBasic, mapToJsonProject };
