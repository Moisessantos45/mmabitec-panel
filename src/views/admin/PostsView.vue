<template>
  <section class="w-11/12 mx-auto flex flex-col gap-6 sm:px-5 sm:py-5" aria-labelledby="posts-title">
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-scale">
      <div class="flex flex-col gap-1">
        <h1 id="posts-title" class="text-xl font-semibold text-midnight-pine font-pp-mori">
          Posts
        </h1>
        <p class="text-ash-gray text-sm">
          Gestiona el listado y estado de tus publicaciones.
        </p>
      </div>
      <RouterLink to="/admin/editor"
        class="bg-forest-link hover:bg-forest-link/90 text-white rounded-circular py-2 px-5 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
        <Plus :size="16" />
        Nuevo Post
      </RouterLink>
    </header>

    <div
      class="w-full grid grid-cols-1 gap-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in-scale bg-white">
      <article v-for="post in postGenerics" :key="post.id"
        class="flex flex-col gap-2 p-4 bg-canvas-white border border-light-gray-border rounded-xl animate-fade-in-scale">
        <div class="relative w-full overflow-hidden rounded-md">
          <img :src="post.banner" :alt="post.title"
            class="text-slate-text font-medium w-full h-44 object-cover rounded-md hover:scale-110 transition-transform duration-300"
            loading="lazy" decoding="async" fetchpriority="low" />
          <span
            class="absolute top-2 left-2 bg-canvas-white/85 text-midnight-pine text-[11px] font-semibold px-2.5 py-1 rounded-full border border-light-gray-border/70 shadow-sm backdrop-blur">
            {{ post.category ? post.category.toUpperCase() : 'POST' }}
          </span>
          <span
            class="absolute top-2 right-2 bg-canvas-white/85 text-ash-gray text-[11px] font-semibold px-2.5 py-1 rounded-full border border-light-gray-border/70 shadow-sm backdrop-blur">
            {{ post.createdAt.toUpperCase() }}
          </span>
        </div>
        <div class="flex flex-col gap-5">
          <div class="text-slate-text font-medium min-h-48 line-clamp-2" :title="post.title">
            {{ post.title.toUpperCase() }}
          </div>
          <DynamicDropdown :model-value="post.stateId" :options="postStatusOptions"
            @change="(s) => changeStatus(post.slug, post.id, Number(s))" />
          <div class="text-slate-text font-medium flex items-center gap-2">
            <button type="button" @click="openFullView(post.slug)" :aria-label="`Compartir ${post.title}`"
              class="p-1.5 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 border border-light-gray-border rounded-md transition-colors flex flex-1 items-center justify-center gap-2"
              title="Compartir">
              Compartir
              <Share2 :size="16" />
            </button>
            <RouterLink :to="{ name: 'editor', query: { slug: post.slug } }" :aria-label="`Editar ${post.title}`"
              class="p-1.5 text-ash-gray hover:text-forest-link hover:bg-forest-link/10 border border-light-gray-border rounded-md transition-colors flex flex-1 items-center justify-center gap-2"
              title="Editar">
              Editar
              <FileEdit :size="16" />
            </RouterLink>
          </div>
        </div>
      </article>
    </div>

    <PageNavigator v-if="paginatedPostGeneric.totalPages > 1" :total="paginatedPostGeneric.total"
      :page="paginatedPostGeneric.page" :totalPages="paginatedPostGeneric.totalPages" :changePage="changePage" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification"
import { FileEdit, Plus, Share2 } from 'lucide-vue-next'
import usePostStore from '@/store/post';
import DynamicDropdown from '@/components/atoms/DynamicDropdown.vue';
import PageNavigator from '@/components/molecules/PageNavigator.vue'

const router = useRouter()
const toast = useToast()
const postStore = usePostStore()
const { postGenerics, paginatedPostGeneric, postStatusOptions } = storeToRefs(postStore)

const getData = async () => {
  await Promise.allSettled([
    postStore.getPostGenerics(),
    postStore.getStatePost()
  ])
}

const changePage = (page: number) => {
  if (page < 1 || page > paginatedPostGeneric.value.totalPages) return
  paginatedPostGeneric.value.page = page
  getData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const changeStatus = async (slug: string, postId: number, newStatus: number) => {
  const result = await postStore.updatePostState(slug, postId, newStatus)
  if (result.isSuccess) {
    toast.success("Estado actualizado correctamente")
    getData()
  } else {
    toast.error("Error al actualizar el estado")
  }
};

const openFullView = (slug: string) => {
  const routeData = router.resolve({
    name: 'full-post',
    params: { slug },
  });
  window.open(routeData.href, '_blank', 'noopener,noreferrer');
};

onMounted(() => {
  getData()
})
</script>