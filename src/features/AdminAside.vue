<template>
  <aside
    class="flex flex-col h-full shrink-0 w-60 bg-canvas-white border-r border-light-gray-border py-4 px-3 select-none">
    <div class="mb-6 flex items-center px-1 h-9">
      <div class="w-8 h-8 shrink-0 flex items-center justify-center">
        <svg class="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#000000" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 13.79 8 16C8 18.21 9.79 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z"
            fill="#ffffff" />
          <path
            d="M12 4C12 4 14 6 14 8C14 10 12 12 12 12C12 12 10 14 10 16C10 18 12 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z"
            fill="#f5af3f" />
        </svg>
      </div>
      <span class="ml-2.5 font-bold text-midnight-pine font-pp-mori text-base tracking-wide">
        Space
      </span>
    </div>

    <nav class="flex flex-col gap-1.5 flex-1 w-full">
      <RouterLink
        to="/admin"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-ash-gray hover:text-midnight-pine hover:bg-forest-link/10 transition-colors duration-200"
        exact-active-class="text-forest-link! bg-forest-link/15! font-semibold!">
        <Home class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Dashboard
        </span>
      </RouterLink>

      <RouterLink
        to="/admin/projects"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-ash-gray hover:text-midnight-pine hover:bg-forest-link/10 transition-colors duration-200"
        active-class="text-forest-link! bg-forest-link/15! font-semibold!">
        <FolderKanban class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Proyectos
        </span>
      </RouterLink>

      <RouterLink
        to="/admin/posts"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-ash-gray hover:text-midnight-pine hover:bg-forest-link/10 transition-colors duration-200"
        active-class="text-forest-link! bg-forest-link/15! font-semibold!">
        <Folder class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Posts
        </span>
      </RouterLink>

      <RouterLink
        to="/admin/streams"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-ash-gray hover:text-midnight-pine hover:bg-forest-link/10 transition-colors duration-200"
        active-class="text-forest-link! bg-forest-link/15! font-semibold!">
        <Radio class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Streams
        </span>
      </RouterLink>

      <RouterLink
        to="/admin/profile"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-ash-gray hover:text-midnight-pine hover:bg-forest-link/10 transition-colors duration-200"
        active-class="text-forest-link! bg-forest-link/15! font-semibold!">
        <User class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Profile
        </span>
      </RouterLink>

      <button
        type="button"
        @click="$emit('logout')"
        class="flex items-center w-full px-3 py-2.5 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 transition-colors duration-200 cursor-pointer mt-1">
        <LogOut class="w-5 h-5 shrink-0" stroke-width="1.8" />
        <span class="ml-3 text-sm font-medium whitespace-nowrap">
          Logout
        </span>
      </button>
    </nav>

    <div class="mt-auto pt-3 border-t border-light-gray-border/60 w-full">
      <div class="flex items-center w-full px-3 py-2 rounded-xl text-ash-gray">
        <div
          class="w-5 h-5 rounded-full bg-midnight-pine text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
          ?
        </div>
        <span class="ml-3 text-xs text-ash-gray whitespace-nowrap">
          Ayuda
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Home, FolderKanban, Radio, Folder, User, LogOut } from 'lucide-vue-next';

defineEmits<{
  (e: 'logout'): void;
  (e: 'close'): void;
}>();
</script>