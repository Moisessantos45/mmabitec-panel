interface ProjectBase {
  id: number;
  slug: string;
  title: string;
  stateId: number;
  typeProject: string;
  banner: string;
  createdAt: string;
}

interface Project extends ProjectBase {
  description: string;
  technologies: string[];
  characteristics: string[];
  learning: string[];
  images: string[];
  link: string;
  createdAt: string;
  linkFrontend: string[];
  linkBackend: string[];
  counterLikes: number;
}

interface ProjectBasic extends ProjectBase {}

const initialProject: Project = {
  id: -1,
  slug: "",
  title: "",
  typeProject: "",
  description: "",
  technologies: [],
  characteristics: [],
  learning: [],
  banner: "",
  images: [],
  link: "",
  createdAt: "",
  linkFrontend: [],
  linkBackend: [],
  stateId: 1,
  counterLikes: 0,
};

const initialProjectBasic: ProjectBasic = {
  id: -1,
  slug: "",
  title: "",
  typeProject: "",
  banner: "",
  stateId: -1,
  createdAt: "",
};

export { type Project, type ProjectBasic, initialProject, initialProjectBasic };
