<template>
    <div v-if="open"
        class="bg-midnight-pine/30 backdrop-blur-sm overflow-visible w-full h-full focus:outline-none flex flex-col items-center justify-center fixed inset-0 z-50 animate-fade-in-scale">
        <div
            class="bg-white border border-light-gray-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative animate-fade-in-scale sm:max-w-xl w-full mx-4">
            <div class="flex items-center justify-between border-b border-light-gray-border pb-3">
                <h2 class="text-midnight-pine font-bold text-lg font-pp-mori">
                    Actualizar Imágenes del Proyecto
                </h2>
                <button type="button"
                    class="p-1.5 text-ash-gray hover:text-midnight-pine hover:bg-light-gray-border/20 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link cursor-pointer"
                    aria-label="Cerrar modal" @click="handleClose">
                    <X :size="18" />
                </button>
            </div>

            <article class="flex flex-col gap-5">
                <div class="flex flex-col gap-2 text-left">
                    <InputField label="URL de la Imagen" id="imageUrl" type="url" inputmode="url" v-model="tagInput"
                        placeholder="https://ejemplo.com/imagen.jpg" @keydown.enter.prevent="addTag" />
                </div>

                <div class="flex flex-col gap-2 text-left">
                    <span class="text-xs text-ash-gray uppercase tracking-wide font-semibold">Galería de Imágenes</span>

                    <div v-if="!formProject.images || formProject.images.length === 0"
                        class="text-ash-gray/70 text-xs italic py-4 px-4 bg-light-gray-border/10 rounded-xl border border-dashed border-light-gray-border text-center">
                        No has añadido ninguna imagen todavía.
                    </div>

                    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto w-full pr-1">
                        <div v-for="(imgUrl, i) in formProject.images" :key="i"
                            class="relative group aspect-video rounded-lg border border-light-gray-border shadow-sm bg-light-gray-border/5">
                            <img :src="imgUrl"
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <button type="button" @click="removeTag(i)"
                                class="absolute top-1.5 right-1.5 p-1.5 bg-white/95 hover:bg-red-50 hover:text-red-500 rounded-md text-ash-gray shadow-sm transition-all cursor-pointer flex items-center justify-center">
                                <X :size="12" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-light-gray-border">
                    <button type="button"
                        class="px-5 py-2.5 rounded-full border border-light-gray-border text-sm font-semibold text-ash-gray hover:bg-light-gray-border/20 transition-all focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer"
                        @click="handleClose">
                        Cancelar
                    </button>
                    <button type="submit" @click="handleSubmit"
                        class="px-5 py-2.5 rounded-full bg-forest-link hover:bg-forest-link/90 text-white text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer">
                        Guardar Cambios
                    </button>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { X } from 'lucide-vue-next';
import useProjectStore from '@/store/project';
import InputField from "@/components/molecules/InputField.vue";

defineProps<{
    open: boolean;
}>()

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'success'): void;
}>();

const projectStore = useProjectStore();
const { formProject } = storeToRefs(projectStore);

const tagInput = ref('')

const handleClose = () => {
    emit('close');
};

const handleSubmit = async () => {
    emit('success');
    emit('close');
}

const addTag = () => {
    const value = tagInput.value.trim()
    if (value !== '') {
        formProject.value.images.push(value)
    }
    tagInput.value = ''
}

const removeTag = (index: number) => {
    formProject.value.images.splice(index, 1)
}

</script>