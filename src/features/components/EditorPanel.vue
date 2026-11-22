<template>
    <div class="w-full h-full flex flex-col bg-white animate-slide-left overflow-hidden">
        <textarea :ref="setPreviewRef" v-model="formPost.content" :style="{ fontSize: fontSize + 'px' }"
            class="flex-1 w-full bg-transparent text-[#2d3748] p-8 resize-none outline-none font-['JetBrains_Mono',monospace] leading-[1.8] tracking-[0.015em] placeholder:text-ash-gray/40 caret-forest-link transition-all"
            spellcheck="false" placeholder="Escribe markdown aquí..."></textarea>

        <div class="h-8 border-t border-gray-100 flex items-center px-5 bg-[#fafafb] shrink-0 gap-4 select-none">
            <span class="text-[9px] text-ash-gray font-inter font-semibold tracking-wider uppercase">Markdown</span>
            <div class="flex-1"></div>
            <span class="text-[10px] text-ash-gray/80 font-inter tabular-nums">
                {{ wordCount }} palabras
            </span>
            <div class="w-1 h-1 rounded-full bg-gray-300"></div>
            <span class="text-[10px] text-ash-gray/80 font-inter tabular-nums">
                {{ charCount }} caracteres
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, type ComponentPublicInstance } from 'vue'
import { storeToRefs } from 'pinia';
import usePostStore from '@/store/post';
import useMarkdownStore from '@/store/markdown';

const props = withDefaults(defineProps<{
    slug?: string
    fontSize?: number
}>(), {
    fontSize: 14
})

const postStore = usePostStore()
const markdownStore = useMarkdownStore()
const { formPost } = storeToRefs(postStore)
const { previousValue, editor } = storeToRefs(markdownStore)

watch(() => formPost.value.content, () => {
    editor.value = formPost.value.content
}, { immediate: true })

const setPreviewRef = (el: Element | ComponentPublicInstance | null) => {
    markdownStore.textareaRef = el instanceof HTMLTextAreaElement ? el : null
}

const wordCount = computed(() => {
    const text = formPost.value.content.trim()
    if (!text) return 0
    return text.split(/\s+/).length
})

const charCount = computed(() => formPost.value.content.length)

onMounted(() => {
    previousValue.value = editor.value
})
</script>