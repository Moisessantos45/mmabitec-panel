import { ref, reactive, toRaw } from "vue";
import { defineStore } from "pinia";
import { initialPaginationState, type Pagination } from "@/entities/pagination";
import { useApiResult } from "@/composables/useApiResult";
import { apiAuth } from "@/services/api";
import { mapperPagination } from "@/helpers/mappers/paginated";
import { initialStream, type Stream } from "@/entities/stream";
import { mapperStream, mapToJsonStream } from "@/helpers/mappers/stream";

const useStreamStore = defineStore("stream", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const streams = ref<Stream[]>([]);
  const formStream = reactive<Stream>(structuredClone(initialStream));
  const pagination = reactive<Pagination>(
    structuredClone(initialPaginationState),
  );

  const resetForm = () => {
    Object.assign(formStream, structuredClone(initialStream));
  };

  const setFormStream = (stream: Stream) => {
    Object.assign(formStream, structuredClone(toRaw(stream)));
  };

  const getStreams = async () => {
    await exec(
      () =>
        apiAuth.get("/stream", {
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
            data: extractedData.map(mapperStream),
            pagination: mapperPagination(res.data.data.paginate),
          };
        },
        onSuccess: (data) => {
          streams.value.splice(0, streams.value.length, ...data.data);
          Object.assign(pagination, structuredClone(data.pagination));
        },
        onError: (_) => {},
      },
    );
  };

  const addStream = async () => {
    return await exec(
      () => apiAuth.post("/stream", mapToJsonStream(formStream)),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al agregar el proyecto.");
          }

          return mapperStream(res.data.data);
        },
        onSuccess: (data) => {
          streams.value.unshift(data);
          Object.assign(formStream, structuredClone(initialStream));
        },
        onError: (_) => {},
      },
    );
  };

  const addStreams = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return await exec(
      () =>
        apiAuth.post("/stream/all", formData, {
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
          getStreams();
        },
        onError: (_) => {},
      },
    );
  };

  const updateStream = async () => {
    return await exec(
      () =>
        apiAuth.put(`/stream/${formStream.id}`, mapToJsonStream(formStream)),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al actualizar el proyecto.");
          }

          return mapperStream(res.data.data);
        },
        onSuccess: (data) => {
          const index = streams.value.findIndex((s) => s.id === data.id);
          if (index !== -1) {
            streams.value[index] = data;
          }
          Object.assign(formStream, structuredClone(initialStream));
        },
        onError: (_) => {},
      },
    );
  };

  return {
    streams,
    formStream,
    pagination,
    loading,
    alertMessage,
    resetForm,
    setFormStream,
    getStreams,
    addStream,
    addStreams,
    updateStream,
  };
});

export default useStreamStore;
