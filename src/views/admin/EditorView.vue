<template>
  <div class="h-full flex flex-col sm:px-3 px-5 sm:py-1 py-5 relative mx-auto animate-fade-in-scale select-none">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <Loading />
    </div>
    <EditorHeader @save="handleClickSavePost" @open-full-view="openFullView" @open-modal="isOpen = true"
      :isNewPost="isNewPost" />

    <div
      class="flex-1 flex flex-col md:flex-row min-h-0 w-full relative mt-3 rounded-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-[#f3f3f5] overflow-hidden">

      <EditorPanel class="panel-left border-r border-gray-200/50" :style="{ '--left-width': leftWidth + 'px' }"
        :slug="slug" :fontSize="fontSize" />

      <div
        class="divider-drag hidden md:flex items-center justify-center cursor-col-resize w-1.5 bg-[#f3f3f5] hover:bg-gray-300 transition-colors z-30 shrink-0 border-x border-gray-200/50"
        @mousedown="startDrag">
        <div class="w-0.5 h-6 rounded-full bg-gray-400/50 pointer-events-none"></div>
      </div>

      <div class="h-1/2 md:h-full flex flex-1 flex-col bg-[#f3f3f5] animate-slide-right min-w-0 relative">
        <div class="h-11 border-b border-gray-200/40 flex items-center bg-[#fafafb] shrink-0 gap-3 px-4 select-none">
          <Eye :size="13" stroke-width="2" class="text-gray-400" />
          <span class="text-[9.5px] text-gray-400 font-bold uppercase tracking-wider">Vista Previa</span>

          <div class="flex-1"></div>

          <div
            class="flex items-center gap-3 bg-gray-200/50 hover:bg-gray-200/70 px-2 py-0.5 rounded-full border border-gray-200/30 transition-all select-none">
            <button @click="decreaseFontSize"
              class="p-0.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded-full transition-all cursor-pointer shadow-xs"
              title="Reducir fuente">
              <ZoomOut :size="11.5" />
            </button>
            <span
              class="text-[9.5px] text-gray-600 font-semibold font-mono leading-none min-w-7 text-center select-none">
              {{ Math.round((fontSize / 14) * 100) }}%
            </span>
            <button @click="increaseFontSize"
              class="p-0.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded-full transition-all cursor-pointer shadow-xs"
              title="Aumentar fuente">
              <ZoomIn :size="11.5" />
            </button>
          </div>

          <div class="w-px h-3.5 bg-gray-200 select-none"></div>

          <button @click="exportStore.downloadMarkdown"
            class="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-md text-[10.5px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Descargar archivo .md">
            <Download :size="11.5" />
            <span class="font-medium">MD</span>
          </button>
          <button @click="exportStore.downloadPreviewImage"
            class="flex items-center gap-1.5 px-2.5 py-1 bg-[#003f2e] text-white rounded-md text-[10.5px] hover:bg-[#003f2e]/90 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Descargar imagen .png">
            <ImageDown :size="11.5" />
            <span class="font-medium">Imagen</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 sm:p-8 flex flex-col items-center">
          <div :ref="setPreviewRef" :style="{ fontSize: fontSize + 'px' }"
            class="w-full max-w-2xl bg-white shadow-[0_12px_45px_rgba(0,0,0,0.025)] border border-gray-200/50 rounded-xl p-10 sm:p-14 min-h-187 flex flex-col prose prose-slate prose-a:text-forest-link prose-headings:text-midnight-pine prose-headings:font-pp-mori prose-p:text-slate-text prose-p:font-inter prose-li:text-slate-text prose-li:font-inter prose-strong:text-midnight-pine prose-blockquote:bg-midnight-pine/5 prose-blockquote:border-l-4 prose-blockquote:border-forest-link prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:font-inter prose-blockquote:not-italic prose-blockquote:text-slate-text [&_pre]:bg-canvas-white [&_pre]:text-slate-text [&_pre]:border [&_pre]:border-light-gray-border [&_pre]:transition-colors [&_pre:hover]:border-forest-link [&_.hljs]:bg-transparent!">
            <div class="mb-8 border-b border-gray-100 pb-6 select-none">
              <h1
                class="text-3xl sm:text-4xl font-extrabold font-pp-mori text-slate-800 leading-tight mb-4 select-text">
                {{ formPost.title || 'Sin Título' }}
              </h1>

              <div class="flex flex-wrap items-center gap-3.5 text-[11px] text-gray-400 font-medium select-text">
                <span v-if="formPost.category"
                  class="bg-[#039861]/10 text-[#039861] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide text-[9px]">
                  {{ formPost.category }}
                </span>

                <span class="flex items-center gap-1">
                  <Clock :size="11.5" />
                  {{ new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                </span>

                <span v-if="formPost.tags && formPost.tags.length > 0"
                  class="flex items-center gap-1.5 truncate max-w-50">
                  <Tag :size="11.5" />
                  {{ formPost.tags.join(', ') }}
                </span>
              </div>
            </div>

            <div
              v-html="compiledMarkdown || '<p class=\'text-gray-300 italic select-none\'>Escribe en el editor para previsualizar aquí...</p>'"
              class="flex-1 max-w-none text-[14.5px] leading-[1.8] select-text"></div>
          </div>
        </div>
      </div>
    </div>

    <PostFormDialog @close="isOpen = false" :open="isOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted, type ComponentPublicInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useToast } from "vue-toastification"
import { Eye, Download, ImageDown, ZoomIn, ZoomOut, Clock, Tag } from 'lucide-vue-next'
import usePostStore from '@/store/post'
import useMarkdownExportStore from '@/store/markdownExport'
import { renderMarkdown } from '@/utils/markdown'
import Loading from '@/components/molecules/Loading.vue'
import EditorHeader from '@/features/components/EditorHeader.vue'
import EditorPanel from '@/features/components/EditorPanel.vue'
import PostFormDialog from '@/features/components/PostFormDialog.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const isOpen = ref(false)
const querySlug = route.query.slug || ''
const slug = typeof querySlug === 'string' ? querySlug : ''
const leftWidth = ref(300)
let dragging = false

const exportStore = useMarkdownExportStore()
const postStore = usePostStore()
const { formPost, alertMessage, loading } = storeToRefs(postStore)

const fontSize = ref(14)

const increaseFontSize = () => {
  if (fontSize.value < 26) fontSize.value += 1
}

const decreaseFontSize = () => {
  if (fontSize.value > 11) fontSize.value -= 1
}

const isNewPost = computed(() => {
  return !route.query.slug || formPost.value.id === -1;
})

const setPreviewRef = (el: Element | ComponentPublicInstance | null) => {
  exportStore.previewRef = el instanceof HTMLDivElement ? el : null
}

const previewChannel = new BroadcastChannel('publimd:preview')

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'admin-posts' })
  }
}

const handleClickSavePost = async () => {
  let result = null

  if (formPost.value.id !== -1 && typeof querySlug === 'string' && querySlug.length > 0) {
    result = await postStore.updatePost(querySlug);
  } else {
    result = await postStore.addPost();
  }

  if (result && result.isSuccess) {
    toast.success(alertMessage.value.msg || 'Post guardado exitosamente');
    isNewPost.value ? goBack() : postStore.getPostBySlug(slug);
  } else {
    toast.error(alertMessage.value.msg || 'Error al guardar el post');
  }
};

const broadcastContent = () => {
  previewChannel.postMessage({
    type: 'content',
    payload: formPost.value.content,
  })
}

const compiledMarkdown = computed(() => {
  return renderMarkdown(formPost.value.content)
})

watch(() => formPost.value.content, () => {
  broadcastContent()
}, { immediate: true })

previewChannel.onmessage = (event) => {
  if (event.data?.type === 'request') {
    broadcastContent()
  }
}

const openFullView = (slug: string) => {
  const routeData = router.resolve({
    name: 'full',
    query: { slug },
  });
  window.open(routeData.href, '_blank', 'noopener,noreferrer');
};

const clearData = () => {
  formPost.value.tags = [];
  postStore.clearForm();
  router.push({
    query: {
      ...route.query,
      raffle: undefined
    }
  });
};

const getData = () => {
  postStore.getStatePost();
  const slug = route.query.slug;
  if (slug && typeof slug === 'string') {
    postStore.getPostBySlug(slug)
  }
}

let startX = 0
let startWidth = 0

const onMouseMove = (e: MouseEvent) => {
  if (!dragging) return
  const deltaX = e.clientX - startX
  leftWidth.value = Math.max(150, Math.min(startWidth + deltaX, window.innerWidth - 150))
}

const stopDrag = () => {
  dragging = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
}

const startDrag = (e: MouseEvent) => {
  dragging = true
  startX = e.clientX
  startWidth = leftWidth.value
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDrag)
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}

onMounted(() => {
  getData();
  if (window.innerWidth > 768) {
    leftWidth.value = window.innerWidth / 2;
  }
});

onBeforeUnmount(() => {
  clearData();
  previewChannel.close()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
@media (min-width: 768px) {
  .panel-left {
    width: var(--left-width) !important;
    flex-shrink: 0;
  }
}
</style>
