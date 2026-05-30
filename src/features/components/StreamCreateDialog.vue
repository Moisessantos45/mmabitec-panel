<template>
    <div v-if="open"
        class="p-0 bg-black/40 overflow-visible w-full h-full focus:outline-none flex flex-col items-center justify-center fixed inset-0 z-50 animate-fade-in-scale">
        <div
            class="bg-white border border-light-gray-border/40 rounded-3xl p-6 flex flex-col gap-6 shadow-xl relative animate-fade-in-scale sm:max-w-5/12 w-full">
            <div class="flex items-center justify-between">
                <h2 class="text-slate-800 font-extrabold text-lg">Crear Nueva Transmisión</h2>
                <button type="button"
                    class="p-1.5 text-ash-gray hover:text-slate-800 hover:bg-gray-100 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-forest-link"
                    aria-label="Cerrar modal" @click="handleClose">
                    <X :size="20" />
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
                <div class="flex flex-col gap-1.5 text-left">
                    <label for="stream-title" class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Título
                    </label>
                    <input id="stream-title" v-model="formStream.title" type="text" required
                        class="w-full bg-white border border-light-gray-border/60 rounded-2xl py-2.5 px-4 text-sm text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all"
                        placeholder="Escribe el título de la transmisión" />
                </div>

                <div class="flex flex-col gap-1.5 text-left">
                    <label for="stream-desc" class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Descripción
                    </label>
                    <textarea id="stream-desc" v-model="formStream.description" rows="3"
                        class="w-full bg-white border border-light-gray-border/60 rounded-2xl py-2.5 px-4 text-sm text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all resize-none"
                        placeholder="Agrega una descripción para esta transmisión"></textarea>
                </div>

                <div class="flex flex-col gap-1.5 text-left">
                    <label for="stream-url" class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Enlace de la Transmisión
                    </label>
                    <input id="stream-url" v-model="formStream.url" type="url" required
                        class="w-full bg-white border border-light-gray-border/60 rounded-2xl py-2.5 px-4 text-sm text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all"
                        placeholder="https://ejemplo.com/live" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5 text-left">
                        <label for="stream-date" class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                            Fecha de Creación
                        </label>
                        <input id="stream-date" v-model="formStream.createdAt" required type="date"
                            class="w-full bg-white border border-light-gray-border/60 rounded-2xl py-2 px-3 text-sm text-slate-800 focus:border-forest-link focus:ring-1 focus:ring-forest-link outline-none transition-all" />
                    </div>

                    <div class="flex flex-col gap-1.5 text-left justify-center">
                        <span class="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                            Estado inicial
                        </span>
                        <label class="flex items-center gap-2.5 cursor-pointer select-none">
                            <input v-model="formStream.status" type="checkbox" class="sr-only peer" />
                            <div
                                class="relative w-11 h-6 bg-light-gray-border/80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-link">
                            </div>
                            <span class="text-xs font-semibold text-slate-700">
                                {{ formStream.status ? 'Activo' : 'Inactivo' }}
                            </span>
                        </label>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-light-gray-border/20">
                    <button type="button"
                        class="px-5 py-2.5 rounded-full border border-light-gray-border text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:text-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none"
                        @click="handleClose">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-5 py-2.5 rounded-full bg-forest-link hover:bg-forest-link/90 text-white text-sm font-semibold transition-all hover:scale-[1.02] flex items-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-forest-link focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none">
                        <Video :size="16" />
                        Crear Transmisión
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { X, Video } from 'lucide-vue-next';
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
const { formStream } = storeToRefs(streamStore);
const toast = useToast();
const loading = ref(false);

const handleClose = () => {
    streamStore.resetForm();
    emit('close');
};

const handleSubmit = async () => {
    loading.value = true;
    const res = await streamStore.addStream();
    loading.value = false;
    if (res.isSuccess) {
        toast.success('Transmisión creada exitosamente');
        emit('success');
    } else {
        toast.error('Error al crear la transmisión');
    }
};

</script>