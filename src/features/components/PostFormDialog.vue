<template>
    <div v-if="open"
        class="bg-midnight-pine/30 backdrop-blur-sm overflow-visible w-full h-full focus:outline-none flex flex-col items-center justify-center fixed inset-0 z-50 animate-fade-in-scale">
        <div
            class="bg-white border border-light-gray-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative animate-fade-in-scale sm:max-w-xl w-full mx-4">
            <div class="flex items-center justify-between border-b border-light-gray-border pb-3">
                <h2 class="text-midnight-pine font-bold text-lg font-pp-mori">
                    {{ formPost.id && formPost.id !== -1 ? 'Editar Post' : 'Crear Nuevo Post' }}
                </h2>
                <button type="button"
                    class="p-1.5 text-ash-gray hover:text-midnight-pine hover:bg-light-gray-border/20 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link cursor-pointer"
                    aria-label="Cerrar modal" @click="handleClose">
                    <X :size="18" />
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                <div class="flex flex-col gap-2 text-left">
                    <InputField label="Título del Post" id="title" required type="text" inputmode="text" v-model="formPost.title"
                        placeholder="Escribe el título del post" />
                </div>

                <div class="flex flex-col gap-2 text-left">
                    <InputField label="Categoría" id="category" required type="text" inputmode="text"
                        v-model="formPost.category" placeholder="Escribe la categoría del post" />
                </div>

                <div class="flex flex-col gap-2 text-left">
                    <InputField label="URL del Banner" id="banner" required type="url" inputmode="url" v-model="formPost.banner"
                        placeholder="https://ejemplo.com/imagen.jpg" />
                </div>

                <div class="flex flex-col gap-2 text-left">
                    <InputField label="Etiquetas" id="tags" type="text" inputmode="text" v-model="tagInput"
                        placeholder="Escribe las etiquetas separadas por comas" @keydown.enter.prevent="addTag"
                        @keydown.backspace="onTagBackspace" />
                    
                    <div v-if="formPost.tags && formPost.tags.length > 0"
                        class="flex flex-wrap items-center gap-1.5 bg-light-gray-border/10 rounded-xl p-3 border border-light-gray-border/50 mt-1">
                        <span v-for="(tag, i) in formPost.tags" :key="i"
                            class="inline-flex items-center gap-1 bg-forest-link/10 text-forest-link text-[11px] font-semibold px-2.5 py-1 rounded-full border border-forest-link/25 select-none hover:bg-forest-link/15 transition-all">
                            {{ tag }}
                            <button type="button" @click="removeTag(i)"
                                class="text-forest-link/60 hover:text-red-500 transition-colors leading-none focus:outline-none cursor-pointer flex items-center justify-center p-0.5 rounded-full hover:bg-red-50">
                                <X :size="10" />
                            </button>
                        </span>
                    </div>
                </div>

                <div class="relative w-full text-left">
                    <span class="text-xs text-ash-gray uppercase tracking-wide font-semibold block mb-1.5">Estado del Post</span>
                    <button type="button" @click="isStatusSelectOpen = !isStatusSelectOpen"
                        class="bg-transparent hover:bg-light-gray-border/10 text-slate-text font-inter text-[13px] px-3.5 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-forest-link/20 border border-light-gray-border focus:border-forest-link/50 flex items-center gap-1.5 cursor-pointer transition-all w-full justify-between">
                        <span>{{ statePost.find(o => o.id === formPost.stateId)?.name }}</span>
                        <ChevronDown :size="14" class="text-ash-gray transition-transform duration-200"
                            :class="{ 'rotate-180': isStatusSelectOpen }" />
                    </button>
                    
                    <div v-if="isStatusSelectOpen" class="fixed inset-0 z-40" @click="isStatusSelectOpen = false"></div>
                    
                    <div v-if="isStatusSelectOpen"
                        class="absolute z-50 right-0 mt-1.5 w-full bg-canvas-white border border-light-gray-border rounded-lg shadow-lg py-1 overflow-hidden animate-fade-in">
                        <button v-for="option in statePost" :key="option.id" type="button"
                            @click="formPost.stateId = option.id; isStatusSelectOpen = false"
                            class="w-full text-left px-4 py-2 text-[13px] font-inter transition-colors duration-150 cursor-pointer"
                            :class="formPost.stateId === option.id ? 'bg-forest-link/10 text-forest-link font-semibold' : 'text-ash-gray hover:bg-light-gray-border/20 hover:text-midnight-pine'">
                            {{ option.name }}
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-light-gray-border">
                    <button type="button"
                        class="px-5 py-2.5 rounded-full border border-light-gray-border text-sm font-semibold text-ash-gray hover:bg-light-gray-border/20 transition-all focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer"
                        @click="handleClose">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-5 py-2.5 rounded-full bg-forest-link hover:bg-forest-link/90 text-white text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { X, ChevronDown } from 'lucide-vue-next';
import usePostStore from '@/store/post';
import InputField from "@/components/molecules/InputField.vue";

defineProps<{
    open: boolean;
}>()

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'success'): void;
}>();

const postStore = usePostStore();
const { formPost, statePost } = storeToRefs(postStore);

const isStatusSelectOpen = ref(false)
const loading = ref(false);
const tagInput = ref('')

const handleClose = () => {
    emit('close');
};

const handleSubmit = async () => {
    emit('success');
    emit('close');
}

const addTag = () => {
    const value = tagInput.value.trim().replace(/,+$/, '')
    if (!value) return
    const newTags = value.split(',').map(t => t.trim()).filter(Boolean)
    for (const t of newTags) {
        if (!formPost.value.tags.includes(t)) formPost.value.tags.push(t)
    }
    tagInput.value = ''
}

const removeTag = (index: number) => {
    formPost.value.tags.splice(index, 1)
}

const onTagBackspace = () => {
    if (tagInput.value === '' && formPost.value.tags.length > 0) {
        formPost.value.tags.pop()
    }
}

</script>