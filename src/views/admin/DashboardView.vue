<template>
  <div class="w-11/12 mx-auto flex flex-col gap-8 px-6 py-6 md:px-10 md:py-8 select-none">
    <header class="flex items-center justify-between shrink-0 animate-fade-in-scale">
      <div class="flex flex-col">
        <span class="text-slate-800 font-extrabold text-2xl tracking-tight leading-none">
          Today, {{ currentDate }}
        </span>
      </div>
      <div
        class="flex flex-col gap-1 bg-white border border-gray-100 py-1.5 px-5 rounded-2xl cursor-pointer shadow-xs hover:border-gray-200 transition-all">
        <span class="text-slate-900 font-bold text-xs leading-tight">
          {{ dataForm.name || 'Daria' }}
        </span>
        <span class="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
          {{ dataForm.lastName || 'Lead designer' }}
        </span>

      </div>
    </header>

    <div
      class="bg-[#dcfce7]/70 border border-[#bbf7d0]/40 rounded-4xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs animate-fade-in-scale">
      <div class="flex flex-col text-left items-start max-w-md z-10">
        <span class="text-slate-800 text-sm font-semibold mb-1">
          Welcome back to your
        </span>
        <h2 class="text-slate-950 text-3xl md:text-4xl font-black tracking-tight leading-tight mb-5">
          Daily task manager
        </h2>
        <button
          class="bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer hover:-translate-y-0.5">
          Start tracking
        </button>
      </div>
    </div>

    <div
      class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs animate-fade-in-scale">
      <div class="flex flex-wrap items-center justify-start gap-6 md:gap-12 w-full">
        <div class="flex flex-col text-left">
          <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            Project time tracker
          </span>
          <span class="text-slate-950 text-base font-extrabold">
            {{ userDashboardMetrics.totalPosts * 4 || 16 }} hours
          </span>
        </div>
        <div class="h-8 w-px bg-gray-100 hidden sm:block"></div>
        <div class="flex flex-col text-left">
          <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            Tasks in progress
          </span>
          <span class="text-slate-950 text-base font-extrabold">
            {{ userDashboardMetrics.totalCollaborations || 2 }}
          </span>
        </div>
        <div class="h-8 w-px bg-gray-100 hidden sm:block"></div>
        <div class="flex flex-col text-left">
          <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            Finished tasks
          </span>
          <span class="text-slate-950 text-base font-extrabold">
            {{ userDashboardMetrics.totalLikes || 14 }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-5 flex flex-col gap-5">
        <div class="flex items-center justify-between shrink-0">
          <h3 class="text-slate-900 font-extrabold text-sm tracking-tight">Recent projects</h3>
          <RouterLink to="/admin/posts" class="text-gray-400 hover:text-slate-700 text-md font-bold transition-colors">
            View all
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 gap-4 animate-fade-in-scale">
          <div
            class="bg-[#ff5e84] text-white rounded-3xl p-4.5 flex flex-col justify-between h-56 transition-all duration-200 hover:scale-[1.02] hover:-rotate-1 shadow-md shadow-pink-500/10 cursor-pointer text-left">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center -space-x-1.5">
                <div
                  class="w-5 h-5 rounded-full border border-white/20 bg-white/30 text-[8px] flex items-center justify-center shrink-0">
                  +3
                </div>
              </div>
              <button class="text-white/80 hover:text-white">
                <MoreHorizontal class="w-4 h-4" />
              </button>
            </div>
            <div class="flex flex-col items-start mt-6">
              <h4 class="font-extrabold text-lg leading-tight tracking-tight mb-0.5">
                {{ recentPost1Title }}
              </h4>
              <span class="text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                Cryptocurrency
              </span>
            </div>
            <div class="flex flex-col gap-1.5 w-full mt-4">
              <div class="w-full bg-white/20 rounded-full h-1">
                <div class="bg-white rounded-full h-1" style="width: 45%"></div>
              </div>
              <div class="flex items-center justify-between text-[9px] text-white/80 font-bold">
                <span>110 hours</span>
                <span>45%</span>
              </div>
            </div>
          </div>

          <div
            class="bg-[#f5af3f] text-white rounded-3xl p-4.5 flex flex-col justify-between h-56 transition-all duration-200 hover:scale-[1.02] hover:rotate-1 shadow-md shadow-amber-500/10 cursor-pointer text-left animate-fade-in-scale">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center -space-x-1.5">
                <div
                  class="w-5 h-5 rounded-full border border-white/20 bg-white/30 text-[8px] flex items-center justify-center shrink-0">
                  +2
                </div>
              </div>
              <button class="text-white/80 hover:text-white">
                <MoreHorizontal class="w-4 h-4" />
              </button>
            </div>
            <div class="flex flex-col items-start mt-6">
              <h4 class="font-extrabold text-lg leading-tight tracking-tight mb-0.5">
                {{ recentPost2Title }}
              </h4>
              <span class="text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                Fintech
              </span>
            </div>
            <div class="flex flex-col gap-1.5 w-full mt-4">
              <div class="w-full bg-white/20 rounded-full h-1">
                <div class="bg-white rounded-full h-1" style="width: 85%"></div>
              </div>
              <div class="flex items-center justify-between text-[9px] text-white/80 font-bold">
                <span>140 hours</span>
                <span>85%</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex flex-col items-start justify-between relative overflow-hidden h-32 text-left animate-fade-in-scale">
          <p class="text-slate-800 text-xs font-bold leading-relaxed pr-6 italic">
            "Until we can manage time, we can manage nothing else."
          </p>
          <div class="flex items-center justify-between w-full mt-2">
            <span class="text-gray-400 text-[10px] font-bold">
              Peter Drucker
            </span>
            <svg class="w-12 h-6 text-slate-800 shrink-0 opacity-70" viewBox="0 0 50 20" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M5 10 C15 2, 25 18, 35 10 C40 6, 42 12, 45 8" />
              <path d="M38 12 L48 10" />
            </svg>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 flex flex-col gap-5 animate-fade-in-scale">
        <h3 class="text-slate-900 font-extrabold text-xl tracking-tight text-left">
          Daily tasks ({{ tasks.length }})
        </h3>

        <div class="flex flex-col gap-3.5" role="group" aria-label="Lista de tareas diarias">
          <div v-for="task in tasks" :key="task.id" @click="toggleTask(task)" @keydown.enter="toggleTask(task)"
            @keydown.space.prevent="toggleTask(task)" role="checkbox" :aria-checked="task.checked" tabindex="0"
            :class="['bg-white border rounded-[22px] p-4.5 flex items-center justify-between gap-4 transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-forest-link/50 focus-visible:outline-none', task.checked ? 'border-slate-100 bg-gray-50/50 opacity-80' : 'border-gray-100 hover:border-gray-200']"
            :aria-label="`Tarea: ${task.title} del proyecto ${task.project}`">
            <div class="flex flex-col items-start text-left">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-gray-400 text-[9px] font-bold uppercase tracking-wider">
                  Project: {{ task.project }}
                </span>
                <span v-if="task.timer"
                  class="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100/50">
                  <span class="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                  {{ task.timer }}
                </span>
              </div>
              <h4
                :class="['font-extrabold text-xs text-slate-900 leading-tight mb-2', task.checked && 'line-through text-gray-400']">
                {{ task.title }}
              </h4>
              <div class="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5 text-gray-400" />
                  {{ task.duration }}
                </span>
                <span class="flex items-center gap-1">
                  <Paperclip class="w-3.5 h-3.5 text-gray-400" />
                  {{ task.attachments }} attachments
                </span>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span v-if="task.status === 'New'"
                class="flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-100/80 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shrink-0">
                <span class="w-1 h-1 rounded-full bg-amber-400"></span>
                New
              </span>
              <span v-else-if="task.status === 'In progress'"
                class="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100/80 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shrink-0">
                <span class="w-1 h-1 rounded-full bg-emerald-400"></span>
                In progress
              </span>
              <span v-else-if="task.status === 'Done'"
                class="flex items-center gap-1 bg-slate-900 text-white border border-slate-900 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shrink-0">
                <span class="w-1 h-1 rounded-full bg-white"></span>
                Done
              </span>

              <button type="button" tabindex="-1"
                class="w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                :class="[task.checked ? 'bg-slate-950 text-white' : 'border border-gray-300 bg-white hover:border-gray-400']"
                :aria-label="task.checked ? 'Desmarcar tarea' : 'Marcar tarea'">
                <Check v-if="task.checked" class="w-3 h-3 text-white" stroke-width="3" />
              </button>
            </div>
          </div>
        </div>

        <button @click="addTask"
          class="border border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 bg-white py-3.5 rounded-[22px] text-xs font-bold text-gray-400 hover:text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer">
          <Plus class="w-4 h-4 text-gray-400" stroke-width="2.5" />
          <span>Add a new task</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Plus, Clock, Paperclip, Check, MoreHorizontal } from 'lucide-vue-next';
import useUserStore from '@/store/user';
import usePostStore from '@/store/post';

const userStore = useUserStore();
const postStore = usePostStore();
const { dataForm, userDashboardMetrics } = storeToRefs(userStore);
const { postInfoRecent } = storeToRefs(postStore);

const currentDate = ref('');

const tasks = ref([
  {
    id: 1,
    project: 'Coin Calc',
    title: 'UI design_moodboard creation',
    duration: '2 hrs',
    attachments: 2,
    status: 'New',
    checked: false
  },
  {
    id: 2,
    project: 'Fractal',
    title: 'UI design_design layouts & assets',
    duration: '6 hrs',
    attachments: 8,
    timer: '01:22:45',
    status: 'In progress',
    checked: false
  },
  {
    id: 3,
    project: 'Coin Calc',
    title: 'UI design_presentation',
    duration: '1 hr',
    attachments: 2,
    status: 'Done',
    checked: true
  }
]);

const recentPost1Title = computed(() => {
  if (postInfoRecent.value && postInfoRecent.value.length > 0) {
    return postInfoRecent.value[0].title;
  }
  return 'Coin calc';
});

const recentPost2Title = computed(() => {
  if (postInfoRecent.value && postInfoRecent.value.length > 1) {
    return postInfoRecent.value[1].title;
  }
  return 'Fractal';
});

const updateDate = () => {
  const date = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  currentDate.value = `${date.getDate()} ${months[date.getMonth()]}`;
};

const toggleTask = (task: any) => {
  task.checked = !task.checked;
  task.status = task.checked ? 'Done' : 'New';
};

const addTask = () => {
  const titles = [
    'Review blog post metrics & comments',
    'Write new SEO optimized descriptions',
    'Optimize dashboard page layout design',
    'Update user profile details',
    'Collaborate on draft validation & feedback'
  ];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomProject = Math.random() > 0.5 ? 'Coin Calc' : 'Fractal';
  tasks.value.push({
    id: Date.now(),
    project: randomProject,
    title: randomTitle,
    duration: '1 hr',
    attachments: Math.floor(Math.random() * 5) + 1,
    status: 'New',
    checked: false,
    timer: undefined
  });
};

const getData = async () => {
  await Promise.allSettled([
    userStore.getUserDashboardMetrics(),
    postStore.getPostInfoRecent()
  ]);
};

onMounted(() => {
  updateDate();
  getData();
});
</script>