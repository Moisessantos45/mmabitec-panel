<template>
  <RouterLink
    :to="`/full/${post.slug}`"
    class="group relative bg-canvas-white border border-light-gray-border rounded-3xl p-6 sm:p-8 hover:border-[#12d39d] hover:shadow-md transition-all duration-300 flex flex-col gap-5 no-underline"
  >
    <div
      class="flex items-center gap-2 flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-visible"
    >
      <span
        itemprop="articleSection"
        class="bg-[#12d39d]/10 text-[#0fb889] text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full tracking-wide font-inter whitespace-nowrap uppercase"
      >
        {{ post.category || "General" }}
      </span>
      <span
        v-for="tag in post.tags.slice(0, 3)"
        :key="tag"
        class="bg-gray-50 text-ash-gray border border-light-gray-border text-[11px] sm:text-xs px-3 py-1 rounded-full font-inter whitespace-nowrap"
      >
        #{{ tag }}
      </span>
    </div>
    <h3
      itemprop="headline"
      class="font-pp-mori font-bold text-2xl leading-tight text-midnight-pine group-hover:text-[#12d39d] transition-colors line-clamp-2 tracking-tight"
    >
      {{ post.title.toUpperCase() }}
    </h3>
    <p
      itemprop="abstract"
      class="font-inter text-base text-ash-gray leading-relaxed line-clamp-3"
    >
      {{ post.content }}
    </p>
    <div
      class="flex items-center justify-between mt-2 pt-5 border-t border-light-gray-border/50"
    >
      <div
        class="flex items-center gap-3"
        itemprop="author"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <div
          class="w-9 h-9 rounded-full bg-gray-50 border border-light-gray-border flex items-center justify-center text-sm text-midnight-pine font-bold uppercase shadow-sm"
        >
          {{ post.author?.charAt(0) || "?" }}
        </div>
        <span
          itemprop="name"
          class="font-inter text-midnight-pine font-medium text-sm"
          >{{ post.author || "Anónimo" }}</span
        >
      </div>
      <div class="flex items-center gap-2 font-inter text-ash-gray text-sm">
        <Calendar class="w-4 h-4" />
        <span itemprop="datePublished">{{ post.createdAt }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { PostInfoBasic } from "@/entities/post";
import Calendar from "lucide-vue-next";

defineProps<{
  post: PostInfoBasic;
}>();
</script>
