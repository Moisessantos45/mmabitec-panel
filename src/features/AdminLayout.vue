<template>
  <div class="h-screen w-full bg-canvas-white/50 overflow-hidden font-inter select-none">
    <Loading v-if="loading" />

    <div v-else-if="authenticated" class="flex h-full w-full overflow-hidden">
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="md:hidden fixed inset-0 bg-black/40 z-40"></div>

      <AdminAside :class="[
        'transition-transform duration-300 ease-in-out z-50 shrink-0 h-full',
        sidebarOpen ? 'fixed inset-y-0 left-0 translate-x-0 shadow-2xl' : 'fixed inset-y-0 left-0 -translate-x-full md:static md:translate-x-0'
      ]" @logout="logout" @close="sidebarOpen = false" />

      <div class="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        <div
          class="md:hidden flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 z-30 shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#000000" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 13.79 8 16C8 18.21 9.79 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z"
                fill="#ffffff" />
            </svg>
            <span class="text-slate-900 font-bold text-sm">Space</span>
          </div>
          <button @click="sidebarOpen = true"
            class="text-slate-700 hover:text-slate-900 p-1 bg-gray-50 rounded-lg cursor-pointer">
            <Menu class="w-5 h-5" />
          </button>
        </div>

        <main class="flex-1 overflow-y-auto py-5">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Menu } from 'lucide-vue-next';
import AdminAside from './AdminAside.vue';
import Loading from '@/components/molecules/Loading.vue';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import usePostStore from '@/store/post';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const postStore = usePostStore()
const { authData, authenticated, loading, alertMessage } = storeToRefs(authStore);

const sidebarOpen = ref(false);

const getData = async () => {
  if (!authenticated.value) {
    await authStore.getSession();
  }

  if (authData.value.fullProfile) {
    Promise.allSettled([
      postStore.getStatePost(),
      userStore.getUser()
    ])
  }
};

const logout = async () => {
  await authStore.logout();
  if (!alertMessage.value.error) {
    router.replace("/");
  }
};

onMounted(() => {
  getData();
});

watch(
  authenticated,
  (isAuthenticated) => {
    if (isAuthenticated && authData.value.fullProfile) {
      userStore.getUser();
    }
  }
);
</script>
