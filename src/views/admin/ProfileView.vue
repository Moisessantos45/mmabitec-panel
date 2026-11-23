<template>
  <section
    class="w-11/12 mx-auto flex flex-col gap-8 sm:px-1 px-5 sm:py-1 py-5"
    aria-labelledby="profile-title"
  >
    <header
      class="flex flex-col gap-1 pb-6 border-b border-light-gray-border animate-fade-in-scale"
    >
      <h1
        id="profile-title"
        class="text-2xl font-bold text-midnight-pine font-pp-mori"
      >
        Mi Cuenta
      </h1>
      <p class="text-ash-gray text-sm">
        Gestiona tu identidad, enlaces de contacto y seguridad de acceso.
      </p>
    </header>

    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in-scale"
    >
      <div class="flex flex-col gap-6 lg:col-span-1">
        <div
          class="bg-canvas-white border border-light-gray-border rounded-xl p-6 flex flex-col items-center text-center gap-5 shadow-sm"
        >
          <div
            class="relative w-24 h-24 rounded-full bg-linear-to-tr from-forest-link/25 via-forest-link/10 to-midnight-pine/20 flex items-center justify-center border-2 border-forest-link/20 shadow-inner"
          >
            <span
              class="text-3xl font-semibold text-midnight-pine font-pp-mori tracking-wider uppercase"
            >
              {{ dataForm.name?.[0] || "J" }}{{ dataForm.lastName?.[0] || "D" }}
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <h2 class="text-lg font-semibold text-midnight-pine font-pp-mori">
              {{ dataForm.name || "John" }} {{ dataForm.lastName || "Doe" }}
            </h2>
            <span
              class="mx-auto w-fit px-3 py-1 bg-forest-link/10 text-forest-link rounded-full text-[10px] font-bold uppercase tracking-wider"
            >
              Organizador Principal
            </span>
          </div>

          <div class="w-full h-px bg-light-gray-border/60 my-1"></div>

          <div class="flex flex-col gap-3 w-full">
            <span
              class="text-xs text-ash-gray uppercase tracking-wider font-semibold"
              >Enlaces Directos</span
            >
            <div class="flex gap-3 justify-center">
              <a
                v-if="dataForm.cvLink"
                :href="dataForm.cvLink"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 bg-canvas-white hover:bg-forest-link/10 border border-light-gray-border rounded-full text-ash-gray hover:text-forest-link transition-all duration-200 shadow-sm"
                title="Ver CV / Portafolio"
              >
                <FileText :size="16" />
              </a>
              <a
                v-if="dataForm.linkedinLink"
                :href="dataForm.linkedinLink"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 bg-canvas-white hover:bg-forest-link/10 border border-light-gray-border rounded-full text-ash-gray hover:text-forest-link transition-all duration-200 shadow-sm"
                title="Perfil de LinkedIn"
              >
                <Linkedin :size="16" />
              </a>
              <a
                v-if="dataForm.githubLink"
                :href="dataForm.githubLink"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 bg-canvas-white hover:bg-forest-link/10 border border-light-gray-border rounded-full text-ash-gray hover:text-forest-link transition-all duration-200 shadow-sm"
                title="Perfil de GitHub"
              >
                <Github :size="16" />
              </a>
            </div>
          </div>

          <p
            v-if="dataForm.description"
            class="text-xs text-ash-gray italic leading-relaxed line-clamp-4 mt-2"
            :title="dataForm.description"
          >
            "{{ dataForm.description }}"
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-8 lg:col-span-2">
        <div
          class="bg-canvas-white border border-light-gray-border rounded-xl p-6 flex flex-col gap-6 shadow-sm"
        >
          <h2
            class="text-midnight-pine font-semibold flex items-center gap-2 border-b border-light-gray-border/60 pb-3 font-pp-mori"
          >
            <User :size="18" class="text-forest-link" />
            Información Personal
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
              label="Nombre"
              id="name"
              required
              type="text"
              inputmode="text"
              v-model="dataForm.name"
              placeholder="John"
            />
            <InputField
              label="Apellido"
              id="lastName"
              required
              type="text"
              inputmode="text"
              v-model="dataForm.lastName"
              placeholder="Doe"
            />
            <InputField
              label="Link al CV"
              id="cvLink"
              required
              type="url"
              inputmode="url"
              v-model="dataForm.cvLink"
              placeholder="https://example.com/cv"
              class="sm:col-span-2"
            />
            <InputField
              label="Link de LinkedIn"
              id="linkedinLink"
              required
              type="url"
              inputmode="url"
              v-model="dataForm.linkedinLink"
              placeholder="https://linkedin.com/in/johndoe"
            />
            <InputField
              label="Link de GitHub"
              id="githubLink"
              required
              type="url"
              inputmode="url"
              v-model="dataForm.githubLink"
              placeholder="https://github.com/johndoe"
            />

            <div class="sm:col-span-2 flex flex-col gap-1.5">
              <label
                for="description"
                class="text-xs text-ash-gray uppercase tracking-wide font-semibold"
                >Biografía / Descripción</label
              >
              <textarea
                id="description"
                v-model="dataForm.description"
                class="bg-transparent border border-light-gray-border rounded-md px-3.5 py-2.5 text-slate-text text-sm outline-none transition-all duration-200 hover:border-forest-link/50 focus:bg-canvas-white focus:border-forest-link/50 focus:ring-1 focus:ring-forest-link/20 min-h-28 max-h-36 resize-none placeholder:text-ash-gray/60 caret-forest-link font-inter leading-relaxed"
              >
              </textarea>
            </div>
          </div>

          <div
            class="flex justify-end border-t border-light-gray-border/60 pt-4"
          >
            <button
              type="button"
              @click="handleClick"
              :disabled="loading"
              class="bg-forest-link text-white rounded-circular px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-forest-link/90 shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="loading" :size="16" class="animate-spin" />
              <Save v-else :size="16" />
              {{ dataForm.id != -1 ? "Guardar Cambios" : "Crear Perfil" }}
            </button>
          </div>
        </div>

        <div
          class="bg-canvas-white border border-light-gray-border rounded-xl p-6 flex flex-col gap-6 shadow-sm"
        >
          <h2
            class="text-midnight-pine font-semibold flex items-center gap-2 border-b border-light-gray-border/60 pb-3 font-pp-mori"
          >
            <Globe :size="18" class="text-forest-link" />
            Redes Sociales & Enlaces
          </h2>

          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <span
                class="text-xs text-ash-gray uppercase tracking-wide font-semibold"
                >Enlaces Agregados</span
              >
              <div
                v-if="
                  !dataForm.socialLinks || dataForm.socialLinks.length === 0
                "
                class="text-ash-gray/70 text-xs italic py-3 px-4 bg-light-gray-border/10 rounded-lg border border-dashed border-light-gray-border"
              >
                No has agregado ningún enlace de red social todavía.
              </div>
              <TransitionGroup
                v-else
                name="list"
                tag="ul"
                class="w-full flex flex-col gap-2.5"
              >
                <li
                  v-for="item in dataForm.socialLinks"
                  :key="item.url"
                  class="flex items-center justify-between bg-canvas-white hover:bg-light-gray-border/5 border border-light-gray-border rounded-lg p-3 text-xs transition-all duration-200 shadow-sm relative group w-full min-w-0"
                >
                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      class="p-2 bg-light-gray-border/20 rounded-md shrink-0 flex items-center justify-center"
                    >
                      <component
                        :is="getSocialIcon(item.type)"
                        :size="15"
                        class="text-forest-link"
                      />
                    </div>
                    <div class="flex flex-col min-w-0 flex-1">
                      <span
                        class="text-slate-text font-bold text-[10px] uppercase tracking-wider leading-none mb-1"
                        >{{ item.type }}</span
                      >
                      <span
                        class="text-ash-gray truncate text-xs font-mono"
                        :title="item.url"
                        >{{ getCleanUrl(item.url) }}</span
                      >
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeSocialLink(item.url)"
                    :aria-label="`Quitar ${item.type}: ${item.url}`"
                    class="text-ash-gray hover:text-red-500 hover:bg-red-500/10 transition-colors p-1.5 rounded-md shrink-0 cursor-pointer ml-3 flex items-center justify-center"
                  >
                    <Trash2 :size="14" />
                  </button>
                </li>
              </TransitionGroup>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-12 gap-4 w-full items-end pt-3 border-t border-light-gray-border/40"
            >
              <div class="w-full sm:col-span-6">
                <InputField
                  label="Agregar Link Social"
                  id="socialLink"
                  required
                  type="url"
                  inputmode="url"
                  v-model="tag"
                  placeholder="https://example.com/social"
                />
              </div>
              <div class="w-full sm:col-span-3">
                <InputField
                  label="Tipo de Link"
                  id="socialLinkType"
                  required
                  type="text"
                  inputmode="text"
                  v-model="tagType"
                  placeholder="Ej: Twitter, Instagram, etc."
                />
              </div>
              <div class="w-full sm:col-span-3">
                <button
                  type="button"
                  @click="addSocialLink"
                  class="bg-forest-link text-white rounded-circular px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-forest-link/90 shadow-sm flex items-center justify-center gap-1.5 w-full cursor-pointer h-9.5"
                >
                  <Plus :size="16" />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-canvas-white border border-light-gray-border rounded-xl p-6 flex flex-col gap-6 shadow-sm"
        >
          <h2
            class="text-midnight-pine font-semibold flex items-center gap-2 border-b border-light-gray-border/60 pb-3 font-pp-mori"
          >
            <Key :size="18" class="text-forest-link" />
            Seguridad & Credenciales
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label
                for="currentPassword"
                class="text-xs text-ash-gray uppercase tracking-wide font-semibold"
                >Contraseña Actual</label
              >
              <div class="relative flex items-center">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  id="currentPassword"
                  autocomplete="current-password"
                  v-model="currentPassword"
                  placeholder="••••••••"
                  class="block w-full pl-3.5 pr-10 py-2.5 border border-light-gray-border rounded-lg text-slate-text bg-transparent hover:border-forest-link/50 focus:bg-canvas-white focus:outline-none focus:ring-1 focus:ring-forest-link/20 focus:border-forest-link/50 placeholder:text-ash-gray/60 text-sm font-inter transition-all duration-150 caret-forest-link"
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 text-ash-gray hover:text-midnight-pine transition-colors cursor-pointer"
                  :aria-label="
                    showCurrentPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  "
                >
                  <component
                    :is="showCurrentPassword ? EyeOff : Eye"
                    :size="16"
                  />
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="newPassword"
                class="text-xs text-ash-gray uppercase tracking-wide font-semibold"
                >Nueva Contraseña</label
              >
              <div class="relative flex items-center">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="newPassword"
                  autocomplete="new-password"
                  v-model="newPassword"
                  placeholder="••••••••"
                  class="block w-full pl-3.5 pr-10 py-2.5 border border-light-gray-border rounded-lg text-slate-text bg-transparent hover:border-forest-link/50 focus:bg-canvas-white focus:outline-none focus:ring-1 focus:ring-forest-link/20 focus:border-forest-link/50 placeholder:text-ash-gray/60 text-sm font-inter transition-all duration-150 caret-forest-link"
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 text-ash-gray hover:text-midnight-pine transition-colors cursor-pointer"
                  :aria-label="
                    showNewPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  "
                >
                  <component :is="showNewPassword ? EyeOff : Eye" :size="16" />
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex justify-start border-t border-light-gray-border/60 pt-4"
          >
            <button
              type="button"
              :disabled="passwordLoading"
              @click="handleUpdatePassword"
              class="bg-light-gray-border/40 hover:bg-light-gray-border/80 text-slate-text rounded-circular px-5 py-2.5 text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="passwordLoading" :size="16" class="animate-spin" />
              Actualizar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import {
  User,
  Key,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Trash2,
  Plus,
  Loader2,
  Save,
  FileText,
  Eye,
  EyeOff,
} from "lucide-vue-next";
import InputField from "@/components/molecules/InputField.vue";
import useUserStore from "@/store/user";
import useAuthStore from "@/store/auth";

const toast = useToast();
const userStore = useUserStore();
const authStore = useAuthStore();
const { dataForm, loading } = storeToRefs(userStore);

const tag = ref<string>("");
const tagType = ref<string>("");
const currentPassword = ref("");
const newPassword = ref("");
const passwordLoading = ref(false);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);

const getSocialIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("github")) return Github;
  if (t.includes("linkedin")) return Linkedin;
  if (t.includes("twitter") || t.includes("x")) return Twitter;
  if (t.includes("instagram")) return Instagram;
  return Globe;
};

const getCleanUrl = (url: string) => {
  try {
    const withoutProtocol = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    return withoutProtocol.endsWith("/")
      ? withoutProtocol.slice(0, -1)
      : withoutProtocol;
  } catch {
    return url;
  }
};

const addSocialLink = () => {
  if (tag.value.trim()) {
    const itemUnique = new Set(
      dataForm.value.socialLinks.map((item) => item.url),
    );
    if (!itemUnique.has(tag.value.trim()) && tagType.value.trim()) {
      dataForm.value.socialLinks.push({
        url: tag.value.trim(),
        type: tagType.value.trim() || "Otro",
      });
      tag.value = "";
      tagType.value = "";
    } else {
      toast.error("Este link social ya ha sido agregado.");
    }
  }
};

const removeSocialLink = (url: string) => {
  dataForm.value.socialLinks = dataForm.value.socialLinks.filter(
    (link) => link.url !== url,
  );
};

const handleClick = async () => {
  const result = await (dataForm.value?.id
    ? userStore.updateUser()
    : userStore.addUser());
  if (result.isSuccess) {
    toast.success("Información del usuario actualizada correctamente.");
  } else {
    toast.error("Error al actualizar la información del organizador.");
  }
};

const handleUpdatePassword = async () => {
  if (!currentPassword.value.trim() || !newPassword.value.trim()) {
    toast.error("Debes completar la contraseña actual y la nueva contraseña.");
    return;
  }

  passwordLoading.value = true;
  const result = await authStore.updatePassword(
    currentPassword.value,
    newPassword.value,
  );
  passwordLoading.value = false;

  if (result.isSuccess) {
    toast.success("Contraseña actualizada correctamente.");
    currentPassword.value = "";
    newPassword.value = "";
  } else {
    toast.error(
      authStore.alertMessage.msg || "No se pudo actualizar la contraseña.",
    );
  }
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
</style>
