<template>
  <aside
    class="group w-16 hover:w-44 overflow-hidden transition-[width] duration-300 ease-out flex flex-col sm:bg-canvas-white/50 bg-canvas-white border-r-4 border-gray-200 shrink-0 h-full py-4">
    <div class="mb-6 flex items-center justify-center">
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

    <nav class="flex flex-col items-center gap-5 flex-1">
      <RouterLink to="/admin"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        exact-active-class="text-slate-900! bg-gray-100!">
        <Home class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Dashboard
        </span>
      </RouterLink>
      <RouterLink to="/admin/projects"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        active-class="text-slate-900! bg-gray-100!">
        <FolderKanban class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Proyectos
        </span>
      </RouterLink>
      <RouterLink to="/admin/posts"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        active-class="text-slate-900! bg-gray-100!">
        <Folder class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Posts
        </span>
      </RouterLink>
      <RouterLink to="/admin/streams"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        active-class="text-slate-900! bg-gray-100!">
        <Radio class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Streams
        </span>
      </RouterLink>
      <!-- <RouterLink to="/admin/editor"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        active-class="text-slate-900! bg-gray-100!">
        <Calendar class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Editor
        </span>
      </RouterLink> -->
      <RouterLink to="/admin/profile"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-50 transition-opacity duration-200 delay-10"
        active-class="text-slate-900! bg-gray-100!">
        <User class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Profile
        </span>
      </RouterLink>
      <button @click="$emit('logout')"
        class="flex items-center justify-center group-hover:justify-start w-full gap-3 px-3 py-3 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-opacity duration-200 delay-10 cursor-pointer">
        <LogOut class="w-6 h-6 shrink-0" stroke-width="1.8" />
        <span class="overflow-hidden whitespace-nowrap max-w-0 opacity-0 translate-x-[-4px]
         transition-[max-width,opacity,transform] duration-200 ease-out delay-75
         group-hover:max-w-25 group-hover:opacity-100 group-hover:translate-x-0">
          Logout
        </span>
      </button>
    </nav>

    <div class="mt-auto pt-4">
      <button
        class="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-sm transition-colors cursor-pointer">
        ?
      </button>
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