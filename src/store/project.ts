import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import {
  initialProject,
  type Project,
  type ProjectBasic,
} from "@/entities/project";
import { initialPaginationState, type Pagination } from "@/entities/pagination";
import { useApiResult } from "@/composables/useApiResult";
import { apiAuth } from "@/services/api";
import { mapperPagination } from "@/helpers/mappers/paginated";
import {
  mapperProject,
  mapperProjectBasic,
  mapToJsonProject,
} from "@/helpers/mappers/project";

const useProjectStore = defineStore("project", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const projects = ref<Project[]>([]);
  const projectsBasic = ref<ProjectBasic[]>([]);
  const formProject = reactive<Project>(structuredClone(initialProject));
  const pagination = reactive<Pagination>(
    structuredClone(initialPaginationState),
  );

  const clearForm = () => {
    Object.assign(formProject, structuredClone(initialProject));
  };

  const getProjects = async () => {
    await exec(
      () =>
        apiAuth.get("/project", {
          params: {
            pageSize: pagination.pageSize,
            page: pagination.page,
          },
        }),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al obtener los proyectos.");
          }
          const extractedData = res.data.data.data ?? [];

          return {
            data: extractedData.map(mapperProjectBasic),
            pagination: mapperPagination(res.data.data.paginate),
          };
        },
        onSuccess: (data) => {
          projectsBasic.value.splice(
            0,
            projectsBasic.value.length,
            ...data.data,
          );
          Object.assign(pagination, structuredClone(data.pagination));
        },
        onError: (_) => {},
      },
    );
  };

  const getProjectBySlug = async (slug: string) => {
    await exec(() => apiAuth.get(`/project/slug/${slug}`), {
      mapper(res) {
        if (!res.data.data) {
          throw new Error("Error al obtener el proyecto.");
        }

        return mapperProject(res.data.data);
      },
      onSuccess: (data) => {
        Object.assign(formProject, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const addProject = async () => {
    return await exec(
      () => apiAuth.post("/project", mapToJsonProject(formProject)),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al agregar el proyecto.");
          }

          return mapperProject(res.data.data);
        },
        onSuccess: (data) => {
          projects.value.unshift(data);
          Object.assign(formProject, structuredClone(initialProject));
        },
        onError: (_) => {},
      },
    );
  };

  const addProjects = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return await exec(
      () =>
        apiAuth.post("/project/all", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      {
        mapper(res) {
          const extractedData = res.data.message ?? "";
          if (!extractedData) {
            throw new Error("Error al actualizar el estado del post.");
          }
          return extractedData;
        },
        onSuccess: (_) => {
          getProjects();
        },
        onError: (_) => {},
      },
    );
  };

  const updateProject = async (slug: string) => {
    return await exec(
      () => apiAuth.put(`/project/${slug}`, mapToJsonProject(formProject)),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al actualizar el proyecto.");
          }

          return mapperProject(res.data.data);
        },
        onSuccess: (data) => {
          const index = projects.value.findIndex((p) => p.id === data.id);
          if (index !== -1) {
            projects.value[index] = data;
          }
          Object.assign(formProject, structuredClone(initialProject));
        },
        onError: (_) => {},
      },
    );
  };

  const updateProjectState = async (postId: number, stateId: number) => {
    return await exec(
      () =>
        apiAuth.patch(`/project/${postId}/state`, {
          state_id: stateId,
        }),
      {
        mapper(res) {
          const extractedData = res.data.message ?? "";
          if (!extractedData) {
            throw new Error("Error al actualizar el estado del post.");
          }
          return extractedData;
        },
        onSuccess: (_) => {
          getProjects();
        },
        onError: (_) => {},
      },
    );
  };

  return {
    projects,
    projectsBasic,
    formProject,
    pagination,
    loading,
    alertMessage,
    clearForm,
    getProjects,
    getProjectBySlug,
    addProject,
    addProjects,
    updateProject,
    updateProjectState,
  };
});

export default useProjectStore;
