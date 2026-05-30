<template>
    <section class="w-11/12 mx-auto flex flex-col gap-6 sm:px-5 sm:py-5" aria-labelledby="projects-title">
        <header
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-scale">
            <div class="flex flex-col gap-1">
                <h1 id="projects-title" class="text-xl font-semibold text-midnight-pine font-pp-mori">
                    Proyectos
                </h1>
                <p class="text-ash-gray text-sm">
                    Gestiona el listado y estado de tus proyectos.
                </p>
            </div>
            <div class="flex items-center gap-3">
                <button type="button" @click="isImportModalOpen = true"
                    class="border border-light-gray-border text-midnight-pine hover:bg-light-gray-border/20 rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                    <Upload :size="16" />
                    Importar JSON
                </button>
                <RouterLink to="/admin/form-projects"
                    class="bg-forest-link hover:bg-forest-link/90 text-white rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Plus :size="16" />
                    Nuevo proyecto
                </RouterLink>
            </div>
        </header>


        <div
            class="w-full grid grid-cols-1 gap-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in-scale bg-white">
            <article v-for="project in projectsBasic" :key="project.id"
                class="flex flex-col gap-2 p-4 bg-canvas-white border border-light-gray-border rounded-xl animate-fade-in-scale">
                <div class="relative w-full">
                    <img :src="project.banner" :alt="project.title"
                        class="text-slate-text font-medium w-full h-44 object-cover rounded-md hover:scale-110 transition-transform duration-300"
                        loading="lazy" decoding="async" fetchpriority="low" />
                    <span
                        class="absolute top-2 left-2 bg-canvas-white/85 text-midnight-pine text-[11px] font-semibold px-2.5 py-1 rounded-full border border-light-gray-border/70 shadow-sm backdrop-blur">
                        {{ project.typeProject.toUpperCase() }}
                    </span>
                    <span
                        class="absolute top-2 right-2 bg-canvas-white/85 text-ash-gray text-[11px] font-semibold px-2.5 py-1 rounded-full border border-light-gray-border/70 shadow-sm backdrop-blur">
                        {{ project.createdAt.toUpperCase() }}
                    </span>
                </div>
                <div class="flex flex-col gap-5">
                    <div class="text-slate-text font-medium">
                        {{ project.title.toUpperCase() }}
                    </div>
                    <DynamicDropdown :model-value="project.stateId" :options="postStatusOptions"
                        @change="(s) => changeStatus(project.id, Number(s))" />
                    <div class="text-slate-text font-medium flex items-center gap-2">
                        <button type="button" @click="openFullView(project.slug)"
                            :aria-label="`Compartir ${project.title}`"
                            class="p-1.5 text-ash-gray border border-light-gray-border rounded-md transition-colors flex flex-1"
                            title="Compartir">
                            compartir
                        </button>
                        <RouterLink :to="{ name: 'admin-form-projects', query: { slug: project.slug } }"
                            :aria-label="`Editar ${project.title}`"
                            class="p-1.5 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 border border-light-gray-border transition-colors w-full flex items-center justify-center gap-2"
                            title="Editar">
                            Editar
                            <FileEdit :size="16" />
                        </RouterLink>
                    </div>
                </div>
            </article>
        </div>


        <PageNavigator v-if="pagination.totalPages > 1" :total="pagination.total" :page="pagination.page"
            :totalPages="pagination.totalPages" :changePage="changePage" />
        <ImportProjectsModal :open="isImportModalOpen" @close="isImportModalOpen = false" @success="getData" />
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { FileEdit, Plus, Upload } from 'lucide-vue-next'
import useProjectStore from '@/store/project';
import DynamicDropdown from '@/components/atoms/DynamicDropdown.vue';
import PageNavigator from '@/components/molecules/PageNavigator.vue'
import usePostStore from '@/store/post';
import ImportProjectsModal from '@/features/components/ImportProjectsModal.vue';

const router = useRouter()
const toast = useToast()
const projectStore = useProjectStore()
const postStore = usePostStore()
const { projectsBasic, pagination } = storeToRefs(projectStore)
const { postStatusOptions } = storeToRefs(postStore)

const isImportModalOpen = ref(false)

const getData = async () => {
    await projectStore.getProjects()
}

const changePage = (page: number) => {
    if (page < 1 || page > pagination.value.totalPages) return
    pagination.value.page = page
    getData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openFullView = (slug: string) => {
    const routeData = router.resolve({
        name: 'full-post',
        params: { slug },
    });
    window.open(routeData.href, '_blank', 'noopener,noreferrer');
};

const changeStatus = async (id: number, newStatus: number) => {
    const result = await projectStore.updateProjectState(id, newStatus)
    if (result.isSuccess) {
        toast.success("Estado actualizado correctamente")
    } else {
        toast.error("Error al actualizar el estado")
    }
};

onMounted(() => {
    getData()
})
</script>