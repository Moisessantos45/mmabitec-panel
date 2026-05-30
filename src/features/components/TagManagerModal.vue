<template>
    <div v-if="open"
        class="bg-midnight-pine/30 backdrop-blur-sm overflow-visible w-full h-full focus:outline-none flex flex-col items-center justify-center fixed inset-0 z-50 animate-fade-in-scale">
        <div
            class="bg-white border border-light-gray-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative animate-fade-in-scale sm:max-w-xl w-full mx-4">
            <div class="flex items-center justify-between border-b border-light-gray-border pb-3">
                <h2 class="text-midnight-pine font-bold text-lg font-pp-mori">
                    Administrar Etiquetas
                </h2>
                <button type="button"
                    class="p-1.5 text-ash-gray hover:text-midnight-pine hover:bg-light-gray-border/20 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link cursor-pointer"
                    aria-label="Cerrar modal" @click="handleClose">
                    <X :size="18" />
                </button>
            </div>

            <article class="flex flex-col gap-5">
                <div class="flex flex-col gap-2 text-left">
                    <InputField label="Nueva Etiqueta" id="tags" type="text" inputmode="text" v-model="tagInput"
                        placeholder="Escribe la etiqueta y presiona Enter" @keydown.enter.prevent="addTag" />
                </div>

                <div class="flex flex-col gap-2 text-left">
                    <span class="text-xs text-ash-gray uppercase tracking-wide font-semibold">Etiquetas Agregadas</span>
                    
                    <div v-if="!tags || tags.length === 0"
                        class="text-ash-gray/70 text-xs italic py-4 px-4 bg-light-gray-border/10 rounded-xl border border-dashed border-light-gray-border text-center">
                        No has añadido ninguna etiqueta todavía.
                    </div>

                    <div v-else class="flex flex-wrap gap-2 text-left max-h-60 overflow-y-auto w-full pr-1 justify-start">
                        <span v-for="(tag, i) in tags" :key="i"
                            class="inline-flex items-center gap-1.5 bg-forest-link/10 text-forest-link text-xs font-semibold px-3 py-1.5 rounded-full border border-forest-link/25 select-none hover:bg-forest-link/15 transition-all">
                            {{ tag }}
                            <button type="button" @click="removeTag(i)"
                                class="text-forest-link/60 hover:text-red-500 transition-colors leading-none focus:outline-none cursor-pointer flex items-center justify-center p-0.5 rounded-full hover:bg-red-50/80">
                                <X :size="12" />
                            </button>
                        </span>
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
import { X } from 'lucide-vue-next';
import InputField from "@/components/molecules/InputField.vue";

defineProps<{
    open: boolean;
    tags: string[];
}>()

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'success'): void;
    (e: "add", value: string): void;
    (e: "remove", index: number): void;
}>();

const tagInput = ref('')

const handleClose = () => {
    emit('close');
};

const handleSubmit = async () => {
    emit('close');
}

const addTag = () => {
    const value = tagInput.value.trim()
    if (value !== '') {
        emit("add", value)
        tagInput.value = ''
    }
}

const removeTag = (index: number) => {
    emit("remove", index)
}

</script>