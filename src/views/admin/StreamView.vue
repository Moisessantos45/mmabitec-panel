<template>
    <div class="w-11/12 mx-auto flex flex-col gap-6 sm:px-5 sm:py-5">
        <div
            class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-light-gray-border/20 pb-4">
            <h1 class="text-slate-800 font-extrabold text-xl md:text-2xl tracking-tight text-left">
                Mis Transmisiones
            </h1>
            <div class="flex items-center gap-3">
                <button type="button" @click="isImportModalOpen = true"
                    class="border border-light-gray-border text-midnight-pine hover:bg-light-gray-border/20 rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                    <Upload :size="16" />
                    Importar JSON
                </button>
                <button @click="open = true" type="button"
                    class="bg-forest-link hover:bg-forest-link/90 text-white rounded-circular py-2 px-5 text-sm font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none">
                    <Plus :size="16" />
                    Nuevo proyecto
                </button>
            </div>
        </div>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-scale"
            aria-label="Cargando transmisiones" aria-busy="true">
            <div v-for="n in 3" :key="n"
                class="bg-white border border-light-gray-border/30 rounded-3xl p-6 flex flex-col justify-between h-48 animate-pulse shadow-xs">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-6 w-20 bg-light-gray-border/40 rounded-full"></div>
                        <div class="h-5 w-24 bg-light-gray-border/40 rounded-full"></div>
                    </div>
                    <div class="h-6 w-3/4 bg-light-gray-border/50 rounded-lg mb-2"></div>
                    <div class="h-4 w-1/2 bg-light-gray-border/30 rounded-lg"></div>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-light-gray-border/20">
                    <div class="h-3.5 w-16 bg-light-gray-border/30 rounded"></div>
                    <div class="flex gap-2">
                        <div class="h-8 w-8 bg-light-gray-border/40 rounded-xl"></div>
                        <div class="h-8 w-8 bg-light-gray-border/40 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="streams.length === 0"
            class="flex flex-col items-center justify-center text-center p-12 bg-white border border-light-gray-border/30 rounded-3xl gap-4 shadow-xs animate-fade-in">
            <div class="p-4 bg-forest-link/10 text-forest-link rounded-full">
                <Video :size="32" aria-hidden="true" />
            </div>
            <div class="max-w-md flex flex-col gap-2">
                <h3 class="text-slate-800 font-extrabold text-lg">No hay transmisiones registradas</h3>
                <p class="text-ash-gray text-sm">
                    Comienza creando tu primer proyecto de stream para compartir contenido en vivo y gestionar tus
                    transmisiones de manera eficiente.
                </p>
            </div>
            <RouterLink to="/admin/editor"
                class="mt-2 bg-forest-link hover:bg-forest-link/90 text-white rounded-full py-2.5 px-6 text-sm font-semibold transition-all shadow-xs hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none">
                Crear nuevo stream
            </RouterLink>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-scale" role="region"
            aria-label="Listado de transmisiones">
            <article v-for="stream in streams" :key="stream.id"
                class="group bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden focus-within:ring-2 focus-within:ring-forest-link/50">
                <div
                    class="absolute inset-0 bg-linear-to-br from-forest-link/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                </div>

                <div class="relative z-10 flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-2">
                        <span
                            class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0"
                            :class="stream.status ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'">
                            <span class="w-1.5 h-1.5 rounded-full"
                                :class="stream.status ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'"></span>
                            {{ stream.status ? 'Activo' : 'Inactivo' }}
                        </span>

                        <div class="flex items-center gap-1.5 text-xs text-ash-gray font-medium">
                            <Calendar :size="14" aria-hidden="true" />
                            <span>{{ stream.createdAt }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5 text-left">
                        <h2
                            class="font-extrabold text-base text-slate-800 leading-tight group-hover:text-forest-link transition-colors duration-200">
                            {{ stream.title }}
                        </h2>
                        <p class="text-ash-gray text-xs leading-relaxed line-clamp-2 min-h-8">
                            {{ stream.description || 'Sin descripción adicional para esta transmisión.' }}
                        </p>
                    </div>
                </div>

                <div
                    class="relative z-10 flex items-center justify-between mt-5 pt-4 border-t border-light-gray-border/20">
                    <span class="text-[10px] text-ash-gray/60 font-mono tracking-wider uppercase">ID: {{ stream.id
                        }}</span>

                    <div class="flex items-center gap-1.5">
                        <a v-if="stream.url" :href="stream.url" target="_blank" rel="noopener noreferrer"
                            class="p-2 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none"
                            title="Visitar enlace de transmisión"
                            :aria-label="'Ver enlace de transmisión de ' + stream.title">
                            <ExternalLink :size="16" />
                        </a>

                        <button @click="openFullView(stream.id.toString())"
                            class="p-2 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none"
                            title="Ver página completa / Compartir"
                            :aria-label="'Ver página de stream de ' + stream.title">
                            <Share2 :size="16" />
                        </button>

                        <button @click="openModal(stream)" type="button"
                            class="p-2 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none"
                            title="Editar transmisión" :aria-label="'Editar transmisión de ' + stream.title">
                            <FileEdit :size="16" />
                        </button>
                    </div>
                </div>
            </article>
        </div>

        <PageNavigator v-if="pagination.totalPages > 1" :total="pagination.total" :page="pagination.page"
            :totalPages="pagination.totalPages" :changePage="changePage" />
    </div>
    <StreamCreateDialog @close="open = false" @success="getData" :open="open" />
    <ImportStreamsModal :open="isImportModalOpen" @close="isImportModalOpen = false" @success="getData" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { FileEdit, Plus, Share2, Calendar, ExternalLink, Video, Upload } from 'lucide-vue-next';
import useStreamStore from '@/store/stream';
import StreamCreateDialog from '@/features/components/StreamCreateDialog.vue';
import PageNavigator from '@/components/molecules/PageNavigator.vue';
import type { Stream } from '@/entities/stream';
import ImportStreamsModal from '@/features/components/ImportStreamsModal.vue';

const router = useRouter();
const streamStore = useStreamStore();
const { streams, pagination, loading } = storeToRefs(streamStore);
const open = ref(false);
const isImportModalOpen = ref(false);

const getData = async () => {
    await streamStore.getStreams();
};

const changePage = (page: number) => {
    if (page < 1 || page > pagination.value.totalPages) return;
    pagination.value.page = page;
    getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openModal = (data: Stream) => {
   // console.log('Stream seleccionado para edición:', data);
    streamStore.setFormStream(data);
    open.value = true;
};

const openFullView = (slug: string) => {
    const routeData = router.resolve({
        name: 'full-post',
        params: { slug },
    });
    window.open(routeData.href, '_blank', 'noopener,noreferrer');
};

onMounted(() => {
    getData();
});

</script>