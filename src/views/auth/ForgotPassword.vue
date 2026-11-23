<template>
  <div
    class="min-h-screen flex flex-col bg-canvas-white relative text-slate-text font-inter"
    itemscope
    itemtype="https://schema.org/WebPage"
  >
    <meta itemprop="name" content="Recuperar Contraseña - publimd" />
    <meta
      itemprop="description"
      content="Recupera el acceso a tu cuenta de publimd mediante tu correo electrónico."
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
            <Mail class="w-6 h-6" />
          </div>
          <h1
            class="font-pp-mori font-bold text-2xl sm:text-3xl text-midnight-pine tracking-tight mb-2"
          >
            Recuperar contraseña
          </h1>
          <p class="text-sm text-ash-gray max-w-xs mx-auto leading-relaxed">
            Ingresa tu correo electrónico registrado y te enviaremos un enlace
            para restablecer tu contraseña.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
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

          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-center items-center gap-2 shadow-xs bg-midnight-pine hover:bg-midnight-pine/90 text-white disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-sm"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <span>
              {{
                loading ? "Enviando enlace..." : "Enviar enlace de recuperación"
              }}
            </span>
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import { Mail, Loader2, ArrowRight, ArrowLeft } from "lucide-vue-next";
import Header from "@/components/Header.vue";
import InputField from "@/components/molecules/InputField.vue";
import useAuthStore from "@/store/auth";

const toast = useToast();
const authStore = useAuthStore();
const email = ref("");

const { alertMessage, loading } = storeToRefs(authStore);

const handleSubmit = async () => {
  const result = await authStore.forgotPassword(email.value);
  if (result.isSuccess) {
    toast.success(
      alertMessage.value?.msg || "Correo de recuperación enviado exitosamente.",
    );
  } else {
    toast.error(
      alertMessage.value?.msg || "Error al enviar el correo de recuperación.",
    );
  }
};
</script>
