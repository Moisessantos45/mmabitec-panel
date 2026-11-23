<template>
  <div
    class="min-h-screen flex flex-col bg-canvas-white relative text-slate-text font-inter"
    itemscope
    itemtype="https://schema.org/WebPage"
  >
    <meta itemprop="name" content="Restablecer Contraseña - publimd" />
    <meta
      itemprop="description"
      content="Crea una nueva contraseña segura para tu cuenta de publimd."
    />
    <Header />

    <main
      class="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 relative z-10"
    >
      <div
        class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 opacity-25"
        aria-hidden="true"
      >
        <svg
          class="w-175 h-175 text-light-gray-border"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="350"
            cy="350"
            r="140"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="3 3"
          />
          <circle
            cx="350"
            cy="350"
            r="240"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="3 3"
          />
          <circle
            cx="350"
            cy="350"
            r="340"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="3 3"
          />
        </svg>
      </div>

      <div
        class="w-full max-w-md bg-canvas-white/95 backdrop-blur-sm rounded-2xl border border-light-gray-border shadow-xs hover:shadow-md transition-shadow duration-200 p-6 sm:p-9"
      >
        <div class="text-center mb-6">
          <div
            class="w-12 h-12 rounded-xl bg-forest-link/10 border border-forest-link/20 flex items-center justify-center mx-auto mb-4 text-forest-link transition-transform duration-200 hover:scale-105"
          >
            <KeyRound class="w-6 h-6" />
          </div>
          <h1
            class="font-pp-mori font-bold text-2xl sm:text-3xl text-midnight-pine tracking-tight mb-2"
          >
            Nueva contraseña
          </h1>
          <p class="text-sm text-ash-gray max-w-xs mx-auto leading-relaxed">
            Ingresa tu nueva clave de acceso para asegurar y activar tu cuenta.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
          <div>
            <label
              for="new-password"
              class="block text-[11px] font-semibold text-ash-gray font-inter uppercase tracking-widest mb-1.5"
            >
              Nueva contraseña
            </label>
            <div class="relative">
              <input
                id="new-password"
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                required
                autocomplete="new-password"
                placeholder="••••••••"
                class="block w-full px-3.5 py-2.5 pr-10 border border-light-gray-border rounded-lg text-slate-text bg-transparent hover:border-forest-link/50 focus:bg-canvas-white focus:outline-none focus:ring-1 focus:ring-forest-link/20 focus:border-forest-link/50 placeholder:text-ash-gray/60 text-sm font-inter transition-all duration-150 caret-forest-link"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-ash-gray hover:text-midnight-pine transition-colors p-1"
                :title="
                  showNewPassword ? 'Ocultar contraseña' : 'Ver contraseña'
                "
                tabindex="-1"
              >
                <EyeOff v-if="showNewPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-[11px] font-semibold text-ash-gray font-inter uppercase tracking-widest mb-1.5"
            >
              Confirmar contraseña
            </label>
            <div class="relative">
              <input
                id="confirm-password"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                required
                autocomplete="new-password"
                placeholder="••••••••"
                class="block w-full px-3.5 py-2.5 pr-10 border border-light-gray-border rounded-lg text-slate-text bg-transparent hover:border-forest-link/50 focus:bg-canvas-white focus:outline-none focus:ring-1 focus:ring-forest-link/20 focus:border-forest-link/50 placeholder:text-ash-gray/60 text-sm font-inter transition-all duration-150 caret-forest-link"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-ash-gray hover:text-midnight-pine transition-colors p-1"
                :title="
                  showConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'
                "
                tabindex="-1"
              >
                <EyeOff v-if="showConfirmPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            class="bg-forest-link/3 rounded-xl border border-light-gray-border/80 p-3.5 space-y-2 mt-1"
          >
            <p
              class="text-[11px] font-semibold text-ash-gray uppercase tracking-widest"
            >
              Requisitos de seguridad
            </p>
            <ul class="space-y-1.5">
              <li
                v-for="req in requirements"
                :key="req.label"
                class="flex items-center gap-2 text-xs transition-colors"
                :class="
                  req.met ? 'text-midnight-pine font-medium' : 'text-ash-gray'
                "
              >
                <div
                  class="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  :class="
                    req.met
                      ? 'bg-forest-link/15 text-forest-link'
                      : 'bg-light-gray-border/40 text-ash-gray/40'
                  "
                >
                  <Check v-if="req.met" class="w-2.5 h-2.5 stroke-3" />
                  <span
                    v-else
                    class="w-1.5 h-1.5 rounded-full bg-current"
                  ></span>
                </div>
                <span>{{ req.label }}</span>
              </li>
            </ul>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-center items-center gap-2 shadow-xs bg-midnight-pine hover:bg-midnight-pine/90 text-white disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-sm"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <span>{{
              loading ? "Actualizando contraseña..." : "Actualizar contraseña"
            }}</span>
            <ArrowRight v-if="!loading" class="w-4 h-4 opacity-80" />
          </button>
        </form>

        <div class="mt-6 pt-5 border-t border-light-gray-border/60 text-center">
          <RouterLink
            :to="{ name: 'login' }"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-ash-gray hover:text-midnight-pine transition-colors"
          >
            <ArrowLeft class="w-3.5 h-3.5" />
            Volver al inicio de sesión
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import {
  KeyRound,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-vue-next";
import Header from "@/components/Header.vue";
import useAuthStore from "@/store/auth";

const toast = useToast();
const route = useRoute();
const newPassword = ref("");
const confirmPassword = ref("");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const authStore = useAuthStore();
const { alertMessage, loading } = storeToRefs(authStore);

const setToast = (message: string, isError = false) => {
  if (isError) {
    toast.error(message);
  } else {
    toast.success(message);
  }
};

const requirements = computed(() => [
  { label: "Mínimo 8 caracteres", met: newPassword.value.length >= 8 },
  { label: "Al menos un número", met: /\d/.test(newPassword.value) },
  { label: "Una letra mayúscula", met: /[A-Z]/.test(newPassword.value) },
  {
    label: "Un carácter especial (@, #, $)",
    met: /[@#$%^&*!]/.test(newPassword.value),
  },
]);

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    setToast("Las contraseñas no coinciden.", true);
    return;
  }

  const token = route.params.token ?? "";
  if (token.toString().length === 0 || !token || typeof token !== "string") {
    setToast("Token de recuperación no válido.", true);
    return;
  }

  const result = await authStore.resetPassword(token, newPassword.value);
  if (result.isSuccess) {
    setToast(alertMessage.value?.msg || "Contraseña actualizada exitosamente.");
  } else {
    setToast(
      alertMessage.value?.msg || "Error al actualizar la contraseña.",
      true,
    );
  }
};
</script>
