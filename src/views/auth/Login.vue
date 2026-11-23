<template>
  <div
    class="min-h-screen flex flex-col bg-canvas-white relative text-slate-text font-inter"
    itemscope
    itemtype="https://schema.org/WebPage"
  >
    <meta itemprop="name" content="Iniciar Sesión - publimd" />
    <meta
      itemprop="description"
      content="Inicia sesión en publimd para crear posts tipo blog usando Markdown (MD), trabajar con colaboradores y publicar en tiempo real."
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h1
            class="font-pp-mori font-bold text-2xl sm:text-3xl text-midnight-pine tracking-tight mb-2"
          >
            Iniciar sesión
          </h1>
          <p class="text-sm text-ash-gray max-w-xs mx-auto leading-relaxed">
            Ingresa tus credenciales para acceder a tu espacio en Publimd.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-7">
          <InputField
            label="Correo electrónico"
            id="email"
            required
            type="email"
            inputmode="email"
            autocomplete="email"
            v-model="email"
            placeholder="tu@correo.com"
          />

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label
                for="password"
                class="block text-[11px] font-semibold text-ash-gray font-inter uppercase tracking-widest"
              >
                Contraseña
              </label>
              <RouterLink
                to="/forgot-password"
                class="text-xs font-medium text-ash-gray hover:text-forest-link transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </RouterLink>
            </div>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="block w-full px-3.5 py-2.5 pr-10 border border-light-gray-border rounded-lg text-slate-text bg-transparent hover:border-forest-link/50 focus:bg-canvas-white focus:outline-none focus:ring-1 focus:ring-forest-link/20 focus:border-forest-link/50 placeholder:text-ash-gray/60 text-sm font-inter transition-all duration-150 caret-forest-link [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_30px_#ffffff_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#334155]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-ash-gray hover:text-midnight-pine transition-colors p-1"
                :title="showPassword ? 'Ocultar contraseña' : 'Ver contraseña'"
                tabindex="-1"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            v-if="accountNotVerified"
            class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-900 space-y-2 mt-2"
          >
            <p class="font-medium">Tu cuenta aún no ha sido verificada.</p>
            <button
              type="button"
              @click="resendVerification"
              class="w-full py-2 px-3 bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Reenviar correo de verificación
            </button>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-center items-center gap-2 shadow-xs bg-midnight-pine hover:bg-midnight-pine/90 text-white disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-sm"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <span>{{
              loading ? "Iniciando sesión..." : "Iniciar sesión"
            }}</span>
            <ArrowRight v-if="!loading" class="w-4 h-4 opacity-80" />
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-vue-next";
import Header from "@/components/Header.vue";
import InputField from "@/components/molecules/InputField.vue";
import useAuthStore from "@/store/auth";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const { alertMessage, accountNotVerified, loading } = storeToRefs(authStore);

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleSubmit = async () => {
  const result = await authStore.login(email.value, password.value);
  if (!result.isSuccess) {
    toast.error(
      alertMessage.value?.msg ||
        "Error al iniciar sesión. Por favor, intenta nuevamente.",
    );
    return;
  }

  await authStore.getSession();
  toast.success("¡Inicio de sesión exitoso! Redirigiendo...");

  router.push({
    name: authStore.authData.fullProfile ? "admin-dashboard" : "admin-profile",
  });
};

const resendVerification = () => {
  authStore.forwardEmailVerification(email.value);
};

onMounted(() => {
  document.title = "Iniciar Sesión — publimd";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      "Inicia sesión en publimd para crear posts tipo blog usando Markdown (MD), trabajar con colaboradores y publicar en tiempo real.",
    );
});
</script>
