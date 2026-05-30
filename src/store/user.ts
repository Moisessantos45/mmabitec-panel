import { useApiResult } from "@/composables/useApiResult";
import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  initialUserDashboardMetrics,
  initialUserState,
  type User,
  type UserDashboardMetrics,
} from "@/entities/user";
import { apiAuth } from "@/services/api";
import {
  mapperUser,
  mapperUserDashboardMetrics,
  userToJson,
} from "@/helpers/mappers/user";
import useAuthStore from "./auth";

const useUserStore = defineStore("user", () => {
  const { exec, loading } = useApiResult();
  const authStore = useAuthStore();
  const dataForm = reactive<User>(structuredClone(initialUserState));

  const userDashboardMetrics = reactive<UserDashboardMetrics>(
    structuredClone(initialUserDashboardMetrics),
  );

  const resetUserState = () => {
    Object.assign(dataForm, structuredClone(initialUserState));
    Object.assign(
      userDashboardMetrics,
      structuredClone(initialUserDashboardMetrics),
    );
  };

  const getUserDashboardMetrics = async () => {
    return await exec(() => apiAuth.get("/profile/dashboard-metrics"), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error(
            "Error al obtener las métricas del dashboard. Por favor, intenta de nuevo.",
          );
        }
        return mapperUserDashboardMetrics(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(userDashboardMetrics, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const getUser = async () => {
    return await exec(() => apiAuth.get("/profile"), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error(
            "Error al obtener el usuario. Por favor, intenta de nuevo.",
          );
        }
        return mapperUser(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, structuredClone(data));
      },
      onError: (_) => {},
    });
  };

  const addUser = async () => {
    return await exec(() => apiAuth.post("/profile", userToJson(dataForm)), {
      mapper(res) {
        const extractedData = res.data.data ?? null;
        if (!extractedData) {
          throw new Error(
            "Error al iniciar sesión. Por favor, intenta de nuevo.",
          );
        }
        return mapperUser(extractedData);
      },
      onSuccess: (data) => {
        Object.assign(dataForm, structuredClone(data));
        authStore.getSession();
      },
      onError: (_) => {},
    });
  };

  const updateUser = async () => {
    return await exec(() => apiAuth.put("/profile", userToJson(dataForm)), {
      mapper(res) {
        const extractedData = res.data.message ?? "";
        if (!extractedData) {
          throw new Error(
            "Error al actualizar el usuario. Por favor, intenta de nuevo.",
          );
        }
        return extractedData;
      },
      onSuccess: () => {
        getUser();
      },
      onError: (_) => {},
    });
  };

  return {
    dataForm,
    loading,
    userDashboardMetrics,
    resetUserState,
    getUserDashboardMetrics,
    getUser,
    addUser,
    updateUser,
  };
});

export default useUserStore;
