<template>
    <div v-if="open"
        class="bg-midnight-pine/30 backdrop-blur-sm overflow-visible w-full h-full focus:outline-none flex flex-col items-center justify-center fixed inset-0 z-50 animate-fade-in-scale">
        <div
            class="bg-white border border-light-gray-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative animate-fade-in-scale sm:max-w-md w-full mx-4">
            <div class="flex items-center justify-between border-b border-light-gray-border pb-3">
                <h2 class="text-midnight-pine font-bold text-lg font-pp-mori">
                    Importar Transmisiones (JSON)
                </h2>
                <button type="button"
                    class="p-1.5 text-ash-gray hover:text-midnight-pine hover:bg-light-gray-border/20 rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link cursor-pointer"
                    aria-label="Cerrar modal" @click="handleClose">
                    <X :size="18" />
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                <div class="flex flex-col gap-2 text-left">
                    <label class="text-xs text-ash-gray uppercase tracking-wide font-semibold">Seleccionar archivo
                        JSON</label>
                    <div class="border-2 border-dashed border-light-gray-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-light-gray-border/5 hover:bg-light-gray-border/10 transition-colors cursor-pointer relative"
                        @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
                        <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleFileChange" />
                        <FileCode :size="36" class="text-ash-gray" />
                        <div class="text-center">
                            <p class="text-sm font-medium text-midnight-pine">
                                {{ selectedFile ? selectedFile.name : 'Haz clic para seleccionar o arrastra un archivo'
                                }}
                            </p>
                            <p class="text-xs text-ash-gray mt-1">
                                Solo archivos JSON
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-light-gray-border">
                    <button type="button"
                        class="px-5 py-2.5 rounded-full border border-light-gray-border text-sm font-semibold text-ash-gray hover:bg-light-gray-border/20 transition-all focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer"
                        @click="handleClose">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="!selectedFile || isUploading"
                        class="px-5 py-2.5 rounded-full bg-forest-link hover:bg-forest-link/90 text-white text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        <Upload :size="16" />
                        {{ isUploading ? 'Importando...' : 'Importar' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { X, FileCode, Upload } from 'lucide-vue-next';
import useStreamStore from '@/store/stream';
import { useToast } from 'vue-toastification';

defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'success'): void;
}>();

const streamStore = useStreamStore();
const toast = useToast();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isUploading = ref(false);

const handleClose = () => {
    selectedFile.value = null;
    emit('close');
};

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            selectedFile.value = file;
        } else {
            toast.error('Por favor, selecciona un archivo JSON válido.');
        }
    }
};

const handleDrop = (event: DragEvent) => {
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            selectedFile.value = file;
        } else {
            toast.error('Por favor, arrastra un archivo JSON válido.');
        }
    }
};

const handleSubmit = async () => {
    if (!selectedFile.value) return;
    isUploading.value = true;
    const result = await streamStore.addStreams(selectedFile.value);
    isUploading.value = false;
    if (result.isSuccess) {
        toast.success('Transmisiones importadas correctamente');
        emit('success');
        handleClose();
    } else {
        toast.error('Error al importar las transmisiones');
    }
};
</script>
