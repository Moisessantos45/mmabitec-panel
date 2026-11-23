<template>
  <section
    class="w-11/12 mx-auto flex flex-col gap-6 sm:px-5 sm:py-5"
    aria-labelledby="projects-title"
  >
    <header
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-scale"
    >
      <div class="flex flex-col gap-1">
        <h1
          id="projects-title"
          class="text-xl font-semibold text-midnight-pine font-pp-mori"
        >
          Proyectos
        </h1>
        <p class="text-ash-gray text-sm">
          Gestiona el listado y estado de tus proyectos.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="isImportModalOpen = true"
          class="border border-light-gray-border text-midnight-pine hover:bg-light-gray-border/20 rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Upload :size="16" />
          Importar JSON
        </button>
        <RouterLink
          to="/admin/form-projects"
          class="bg-forest-link hover:bg-forest-link/90 text-white rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus :size="16" />
          Nuevo proyecto
        </RouterLink>
      </div>
    </header>

    <div
      class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in-scale"
    >
      <article
        v-for="project in projectsBasic"
        :key="project.id"
        class="group flex flex-col justify-between bg-canvas-white border border-light-gray-border hover:border-forest-link/40 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all duration-200"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <div
              class="w-9 h-9 rounded-lg overflow-hidden bg-forest-link/10 border border-forest-link/20 shrink-0 flex items-center justify-center shadow-2xs"
            >
              <img
                v-if="project.banner"
                :src="project.banner"
                :alt="project.title"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
              <span
                v-else
                class="text-xs font-semibold text-forest-link uppercase font-pp-mori"
              >
                {{ project.title?.[0] || "P" }}
              </span>
            </div>

            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="openFullView(project.slug)"
                :aria-label="`Compartir ${project.title}`"
                class="px-2 py-1 text-xs font-medium text-ash-gray hover:text-midnight-pine hover:bg-light-gray-border/20 border border-light-gray-border/70 rounded-md transition-colors cursor-pointer"
                title="Compartir"
              >
                Compartir
              </button>
              <RouterLink
                :to="{
                  name: 'admin-form-projects',
                  query: { slug: project.slug },
                }"
                :aria-label="`Editar ${project.title}`"
                class="p-1.5 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 border border-light-gray-border/70 rounded-md transition-colors flex items-center justify-center"
                title="Editar"
              >
                <FileEdit :size="13" />
              </RouterLink>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <h2
              class="text-sm font-semibold text-midnight-pine font-pp-mori tracking-tight line-clamp-1 group-hover:text-forest-link transition-colors"
              :title="project.title"
            >
              {{ project.title }}
            </h2>
            <p class="text-xs text-ash-gray leading-relaxed line-clamp-2">
              Proyecto {{ project.typeProject }} &bull; Creado el {{ project.createdAt }}
            </p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-light-gray-border/60 flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 text-xs">
            <span class="inline-flex items-center gap-1.5 text-slate-text font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-forest-link shrink-0"></span>
              {{ project.typeProject }}
            </span>
            <span class="text-ash-gray font-mono text-[11px]">
              {{ project.createdAt }}
            </span>
          </div>

          <DynamicDropdown
            :model-value="project.stateId"
            :options="postStatusOptions"
            @change="(s) => changeStatus(project.id, Number(s))"
            roundedClass="rounded-lg text-xs"
          />
        </div>
      </article>
    </div>

    <PageNavigator
      v-if="pagination.totalPages > 1"
      :total="pagination.total"
      :page="pagination.page"
      :totalPages="pagination.totalPages"
      :changePage="changePage"
    />
    <ImportProjectsModal
      :open="isImportModalOpen"
      @close="isImportModalOpen = false"
      @success="getData"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { FileEdit, Plus, Upload } from "lucide-vue-next";
import useProjectStore from "@/store/project";
import DynamicDropdown from "@/components/atoms/DynamicDropdown.vue";
import PageNavigator from "@/components/molecules/PageNavigator.vue";
import usePostStore from "@/store/post";
import ImportProjectsModal from "@/features/components/ImportProjectsModal.vue";

const router = useRouter();
const toast = useToast();
const projectStore = useProjectStore();
const postStore = usePostStore();
const { projectsBasic, pagination } = storeToRefs(projectStore);
const { postStatusOptions } = storeToRefs(postStore);

const isImportModalOpen = ref(false);

const getData = async () => {
  await projectStore.getProjects();
};

const changePage = (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  pagination.value.page = page;
  getData();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openFullView = (slug: string) => {
  const routeData = router.resolve({
    name: "full-post",
    params: { slug },
  });
  window.open(routeData.href, "_blank", "noopener,noreferrer");
};

const changeStatus = async (id: number, newStatus: number) => {
  const result = await projectStore.updateProjectState(id, newStatus);
  if (result.isSuccess) {
    toast.success("Estado actualizado correctamente");
  } else {
    toast.error("Error al actualizar el estado");
  }
};

onMounted(() => {
  getData();
});
</script>
