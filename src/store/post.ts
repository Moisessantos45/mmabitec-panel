import { reactive, ref, computed } from "vue";
import { defineStore } from "pinia";
import { useApiResult } from "@/composables/useApiResult";
import {
  initialPost,
  initialPostInfoDetailed,
  type Post,
  type PostInfoBasic,
  type PostInfoDetailed,
  type PostInfoGeneric,
  type PostInfoRecent,
} from "@/entities/post";
import type { StatusGeneric } from "@/entities/state";
import {
  mapperPost,
  mapperPostInfoBasic,
  mapperPostInfoDetailed,
  mapperPostInfoGeneric,
  mapperPostInfoRecent,
  postToJson,
} from "@/helpers/mappers/post";
import { mapperStateGeneric } from "@/helpers/mappers/state";
import { apiAuth } from "@/services/api";
import { initialPaginationState, type Pagination } from "@/entities/pagination";
import { mapperPagination } from "@/helpers/mappers/paginated";
import { DEFAULT_THEME, STATUS_THEMES } from "@/composables/colors";
import type { DropdownOption } from "../entities";

const usePostStore = defineStore("post", () => {
  const { exec, loading, alertMessage } = useApiResult();
  const lock = ref(false);
  const statePost = ref<StatusGeneric[]>([]);
  const postPublic = ref<PostInfoBasic[]>([]);
  const postGenerics = ref<PostInfoGeneric[]>([]);
  const postInfoRecent = ref<PostInfoRecent[]>([]);
  const postInfoDetailed = reactive<PostInfoDetailed>(
    structuredClone(initialPostInfoDetailed),
  );
  const paginated = reactive<Pagination>(
    structuredClone(initialPaginationState),
  );
  const paginatedPostGeneric = reactive<Pagination>(
    structuredClone(initialPaginationState),
  );
  const formPost = reactive<Post>(structuredClone(initialPost));

  const clearForm = () => {
    Object.assign(formPost, structuredClone(initialPost));
  };

  const getThemeByName = (name: string) => {
    const key = name?.toLowerCase();
    return STATUS_THEMES[key] ?? DEFAULT_THEME;
  };

  const postStatusOptions = computed<DropdownOption[]>(() => {
    return statePost.value.map((option) => {
      const theme = getThemeByName(option.name);
      return {
        id: option.id,
        label: option.name,
        buttonClass: theme.button,
        dotClass: theme.dot,
        textClass: theme.text,
      };
    });
  });

  const getStatePost = async () => {
    if (statePost.value.length > 0) return;
    await exec(() => apiAuth.get("/post/states"), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        return extractedData.map(mapperStateGeneric);
      },
      onSuccess: (data) => {
        statePost.value = [...data];
      },
      onError: (_) => {},
    });
  };

  const getPostPublic = async (search: string) => {
    await exec(
      () =>
        apiAuth.get("/post/public", {
          params: {
            search,
            pageSize: paginated.pageSize,
            page: paginated.page,
          },
        }),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al obtener los posts públicos.");
          }
          const extractedData = res.data.data.data ?? [];

          return {
            data: extractedData.map(mapperPostInfoBasic),
            pagination: mapperPagination(res.data.data.paginate),
          };
        },
        onSuccess: (data) => {
          postPublic.value = [...data.data];
          Object.assign(paginated, structuredClone(data.pagination));
        },
        onError: (_) => {},
      },
    );
  };

  const getPostInfoRecent = async () => {
    await exec(() => apiAuth.get("/post/user/recent"), {
      mapper(res) {
        const extractedData = res.data.data ?? [];
        return extractedData.map(mapperPostInfoRecent);
      },
      onSuccess: (data) => {
        postInfoRecent.value = [...data];
      },
      onError: (_) => {},
    });
  };

  const getPostGenerics = async () => {
    await exec(
      () =>
        apiAuth.get("/post/user", {
          params: {
            pageSize: paginatedPostGeneric.pageSize,
            page: paginatedPostGeneric.page,
          },
        }),
      {
        mapper(res) {
          if (!res.data.data) {
            throw new Error("Error al obtener los posts del usuario.");
          }
          const extractedData = res.data.data.data ?? [];
          return {
            data: extractedData.map(mapperPostInfoGeneric),
            pagination: mapperPagination(res.data.data.paginate),
          };
        },
        onSuccess: (data) => {
          postGenerics.value = [...data.data];
          Object.assign(paginatedPostGeneric, structuredClone(data.pagination));
        },
        onError: (_) => {},
      },
    );
  };

  const getPostInfoDetailed = async (slug: string) => {
    return await exec(() => apiAuth.get(`/post/slug/${slug}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el post.");
        }
        return mapperPostInfoDetailed(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(postInfoDetailed, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const getPostBySlug = async (slug: string) => {
    return await exec(() => apiAuth.get(`post/slug-private/${slug}`), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al obtener el post.");
        }
        return mapperPost(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(formPost, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const addPost = async () => {
    return await exec(() => apiAuth.post("/post", postToJson(formPost)), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error("Error al agregar el post.");
        }
        return mapperPost(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(formPost, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const updatePost = async (slug: string) => {
    if (lock.value) return;
    return await exec(
      () => apiAuth.put(`/post/${formPost.id}`, postToJson(formPost)),
      {
        mapper(res) {
          const extractedData = res.data.message ?? "";
          if (!extractedData) {
            throw new Error("Error al actualizar el post.");
          }
          return extractedData;
        },
        onSuccess: (_) => {
          getPostInfoDetailed(slug);
        },
        onError: (_) => {},
      },
    );
  };

  const updatePostState = async (
    _: string,
    postId: number,
    stateId: number,
  ) => {
    return await exec(
      () =>
        apiAuth.patch(`/post/${postId}/state`, {
          status: stateId,
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
          getPostGenerics();
        },
        onError: (_) => {},
      },
    );
  };

  return {
    lock,
    statePost,
    postPublic,
    postInfoRecent,
    postInfoDetailed,
    postGenerics,
    formPost,
    paginated,
    paginatedPostGeneric,
    loading,
    alertMessage,
    clearForm,
    postStatusOptions,
    getStatePost,
    getPostPublic,
    getPostGenerics,
    getPostInfoRecent,
    getPostInfoDetailed,
    getPostBySlug,
    addPost,
    updatePost,
    updatePostState,
  };
});

export default usePostStore;
