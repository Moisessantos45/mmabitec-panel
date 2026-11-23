<template>
  <div class="w-11/12 mx-auto flex flex-col gap-6 sm:px-1 px-5 sm:py-1 py-5">
    <div
      class="flex items-center justify-between gap-4 border-b border-light-gray-border/20 pb-4"
    >
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="p-2 text-ash-gray hover:text-slate-800 hover:bg-gray-100 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link"
          aria-label="Volver a proyectos"
          @click="goBack"
        >
          <ArrowLeft :size="20" />
        </button>
        <div class="flex flex-col text-left">
          <h1
            class="text-slate-800 font-extrabold text-xl md:text-2xl tracking-tight"
          >
            {{ isEditMode ? "Editar Proyecto" : "Nuevo Proyecto" }}
          </h1>
          <span class="text-xs text-ash-gray font-medium">
            {{
              isEditMode
                ? "Actualiza los detalles del proyecto"
                : "Crea y publica un nuevo proyecto"
            }}
          </span>
        </div>
      </div>

      <button
        type="button"
        :disabled="loading"
        class="bg-forest-link hover:bg-forest-link/90 text-white rounded-full py-2 px-5 text-sm font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
        @click="saveProject"
      >
        <Save :size="16" />
        {{ isEditMode ? "Guardar Cambios" : "Crear Proyecto" }}
      </button>
    </div>

    <form
      @submit.prevent="saveProject"
      class="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div class="lg:col-span-8 flex flex-col gap-6">
        <div
          class="bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col gap-5 shadow-xs"
        >
          <h2
            class="text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-light-gray-border/20 pb-3 text-left"
          >
            Información Principal
          </h2>

          <div class="flex flex-col gap-1.5 text-left">
            <InputField
              label="title"
              id="title"
              required
              type="text"
              inputmode="text"
              v-model="formProject.title"
              placeholder="Escribe el título del proyecto"
            />
          </div>

          <div class="flex flex-col gap-1.5 text-left">
            <label
              for="project-description"
              class="text-xs font-extrabold text-slate-800 uppercase tracking-wider"
            >
              Descripción
            </label>
            <textarea
              id="project-description"
              v-model="formProject.description"
              rows="5"
              required
              class="w-full bg-white border border-light-gray-border/60 rounded-2xl py-3 px-4 text-sm text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all resize-none"
              placeholder="Describe el proyecto, su propósito y objetivo principal..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5 text-left">
              <InputField
                label="link"
                id="project-link"
                required
                type="url"
                inputmode="url"
                v-model="formProject.link"
                placeholder="https://..."
              />
            </div>

            <div class="flex flex-col gap-1.5 text-left">
              <InputField
                label="banner"
                id="project-banner"
                required
                type="url"
                inputmode="url"
                v-model="formProject.banner"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col gap-5 shadow-xs"
        >
          <h2
            class="text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-light-gray-border/20 pb-3 text-left"
          >
            Listas Dinámicas
          </h2>

          <div class="flex flex-col gap-2 text-left">
            <label
              class="text-xs font-extrabold text-slate-800 uppercase tracking-wider"
            >
              Tecnologías
            </label>
            <div
              class="flex flex-wrap gap-1.5 p-2 border border-light-gray-border/60 rounded-md min-h-11 bg-white"
            >
              <button
                type="button"
                @click="openTech = true"
                class="flex items-center gap-1 text-forest-link text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider select-none"
              >
                <PlusCircle :size="16" />
                Agregar tecnología ({{ formProject.technologies.length }})
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2 text-left">
            <label
              class="text-xs font-extrabold text-slate-800 uppercase tracking-wider"
            >
              Características
            </label>
            <div
              class="flex flex-wrap gap-1.5 p-2 border border-light-gray-border/60 rounded-md min-h-11 bg-white"
            >
              <button
                type="button"
                @click="openChar = true"
                class="flex items-center gap-1 text-forest-link text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider select-none"
              >
                <PlusCircle :size="16" />
                Agregar característica ({{
                  formProject.characteristics.length
                }})
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2 text-left">
            <label
              class="text-xs font-extrabold text-slate-800 uppercase tracking-wider"
            >
              Aprendizajes
            </label>
            <div
              class="flex flex-wrap gap-1.5 p-2 border border-light-gray-border/60 rounded-md min-h-11 bg-white"
            >
              <button
                type="button"
                @click="openLearn = true"
                class="flex items-center gap-1 text-forest-link text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider select-none"
              >
                <PlusCircle :size="16" />
                Agregar aprendizaje ({{ formProject.learning.length }})
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2 text-left">
            <label
              class="text-xs font-extrabold text-slate-800 uppercase tracking-wider"
            >
              Imágenes (URLs)
            </label>
            <div
              class="flex flex-wrap gap-1.5 p-2 border border-light-gray-border/60 rounded-md min-h-11 bg-white"
            >
              <button
                type="button"
                @click="open = true"
                class="flex items-center gap-1 text-forest-link text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider select-none"
              >
                <PlusCircle :size="16" />
                Agregar imagen ({{ formProject.images.length }})
              </button>
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col gap-5 shadow-xs"
        >
          <h2
            class="text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-light-gray-border/20 pb-3 text-left"
          >
            Enlaces de Repositorios (URLs)
          </h2>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex-1"
                >Frontend</span
              >
              <button
                type="button"
                class="flex items-center gap-1.5 text-xs font-semibold text-forest-link hover:text-forest-link/80 transition-colors"
                @click="formProject.linkFrontend.push('')"
              >
                <PlusCircle :size="14" />
                Agregar
              </button>
            </div>
            <div
              v-for="(url, i) in formProject.linkFrontend"
              :key="i"
              class="flex items-center gap-2"
            >
              <div class="relative flex items-center flex-1">
                <Code2
                  :size="13"
                  class="absolute left-3 text-ash-gray shrink-0"
                />
                <input
                  :value="url"
                  type="url"
                  class="w-full bg-white border border-light-gray-border/60 rounded-md py-2 pl-9 pr-4 text-xs text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all"
                  placeholder="https://github.com/..."
                  @input="
                    formProject.linkFrontend[i] = (
                      $event.target as HTMLInputElement
                    ).value
                  "
                />
              </div>
              <button
                type="button"
                class="p-1.5 text-ash-gray hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                :aria-label="`Eliminar enlace frontend ${i + 1}`"
                @click="removeItem(i, 'frontend')"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex-1"
                >Backend</span
              >
              <button
                type="button"
                class="flex items-center gap-1.5 text-xs font-semibold text-forest-link hover:text-forest-link/80 transition-colors"
                @click="formProject.linkBackend.push('')"
              >
                <PlusCircle :size="14" />
                Agregar
              </button>
            </div>
            <div
              v-for="(url, i) in formProject.linkBackend"
              :key="i"
              class="flex items-center gap-2"
            >
              <div class="relative flex items-center flex-1">
                <Server
                  :size="13"
                  class="absolute left-3 text-ash-gray shrink-0"
                />
                <input
                  :value="url"
                  type="url"
                  class="w-full bg-white border border-light-gray-border/60 rounded-md py-2 pl-9 pr-4 text-xs text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all"
                  placeholder="https://github.com/..."
                  @input="
                    formProject.linkBackend[i] = (
                      $event.target as HTMLInputElement
                    ).value
                  "
                />
              </div>
              <button
                type="button"
                class="p-1.5 text-ash-gray hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                :aria-label="`Eliminar enlace backend ${i + 1}`"
                @click="removeItem(i, 'backend')"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col gap-6">
        <div
          class="bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col gap-5 shadow-xs"
        >
          <h2
            class="text-slate-800 font-extrabold text-sm uppercase tracking-wider border-b border-light-gray-border/20 pb-3 text-left"
          >
            Configuración
          </h2>

          <div class="flex flex-col gap-1.5 text-left">
            <InputField
              label="typeProject"
              id="project-type"
              required
              type="text"
              inputmode="text"
              v-model="formProject.typeProject"
              placeholder="Ej. Web, Mobile, CLI..."
            />
          </div>

          <div class="flex gap-1.5 text-left w-full">
            <DynamicDropdown
              :model-value="formProject.stateId"
              :options="postStatusOptions"
              rounded-class="rounded-circular"
              @change="(s) => changeStatus(s)"
            />
          </div>

          <div class="flex flex-col gap-1.5 text-left">
            <InputField
              label="project-created"
              id="project-created"
              required
              type="date"
              inputmode="date"
              v-model="formProject.createdAt"
            />
          </div>

          <div
            class="flex flex-col gap-1.5 text-left text-xs text-ash-gray pt-2 border-t border-light-gray-border/20"
          >
            <div class="flex justify-between">
              <span class="font-semibold">❤ Likes</span>
              <span class="font-extrabold text-slate-800">{{
                formProject.counterLikes
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <TagManagerModal
    @close="openTech = false"
    :open="openTech"
    :tags="formProject.technologies"
    @add="(value) => addItem(value, 'tech')"
    @remove="(index) => removeItem(index, 'tech')"
  />
  <TagManagerModal
    @close="openChar = false"
    :open="openChar"
    :tags="formProject.characteristics"
    @add="(value) => addItem(value, 'char')"
    @remove="(index) => removeItem(index, 'char')"
  />
  <TagManagerModal
    @close="openLearn = false"
    :open="openLearn"
    :tags="formProject.learning"
    @add="(value) => addItem(value, 'learn')"
    @remove="(index) => removeItem(index, 'learn')"
  />
  <ProjectImagesModal @close="open = false" :open="open" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import {
  ArrowLeft,
  Save,
  PlusCircle,
  Trash2,
  Code2,
  Server,
} from "lucide-vue-next";
import useProjectStore from "@/store/project";
import usePostStore from "@/store/post";
import DynamicDropdown from "@/components/atoms/DynamicDropdown.vue";
import InputField from "@/components/molecules/InputField.vue";
import ProjectImagesModal from "@/features/components/ProjectImagesModal.vue";
import TagManagerModal from "@/features/components/TagManagerModal.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const projectStore = useProjectStore();
const postStore = usePostStore();
const { postStatusOptions } = storeToRefs(postStore);
const { formProject, loading } = storeToRefs(projectStore);

const querySlug = route.query.slug || "";
const slug = typeof querySlug === "string" ? querySlug : "";
const open = ref(false);
const openTech = ref(false);
const openChar = ref(false);
const openLearn = ref(false);

const isEditMode = computed(() => {
  return route.query.slug || formProject.value.id !== -1;
});

const getData = () => {
  const slug = route.query.slug;
  if (slug && typeof slug === "string") {
    projectStore.getProjectBySlug(slug);
  }
};

const clearData = () => {
  projectStore.clearForm();
  router.push({
    query: {
      ...route.query,
      slug: undefined,
    },
  });
};

const addItem = (value: string, type: string) => {
  if (type === "tech") {
    formProject.value.technologies.push(value);
  } else if (type === "char") {
    formProject.value.characteristics.push(value);
  } else if (type === "learn") {
    formProject.value.learning.push(value);
  }
};

const removeItem = (index: number, type: string) => {
  if (type === "tech") {
    formProject.value.technologies.splice(index, 1);
  } else if (type === "char") {
    formProject.value.characteristics.splice(index, 1);
  } else if (type === "learn") {
    formProject.value.learning.splice(index, 1);
  } else if (type === "backend") {
    formProject.value.linkBackend.splice(index, 1);
  } else if (type === "frontend") {
    formProject.value.linkFrontend.splice(index, 1);
  }
};

const goBack = () => {
  router.push("/admin/projects");
};

const saveProject = async () => {
  if (!formProject.value.title || !formProject.value.description) {
    toast.error("Título y descripción son obligatorios");
    return;
  }

  const result = isEditMode.value
    ? await projectStore.updateProject(slug)
    : await projectStore.addProject();

  if (result.isSuccess) {
    toast.success(
      isEditMode.value
        ? "Proyecto actualizado"
        : "Proyecto creado exitosamente",
    );
    router.push("/admin/projects");
  } else {
    toast.error("Error al guardar el proyecto");
  }
};

const changeStatus = async (newStatus: string | number) => {
  formProject.value.stateId =
    typeof newStatus === "string" ? Number(newStatus) : newStatus;
};

onMounted(() => {
  getData();
});

onBeforeUnmount(() => {
  clearData();
});
</script>
