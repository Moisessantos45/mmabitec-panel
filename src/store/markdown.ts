import { defineStore } from "pinia";
import { ref } from "vue";

const useMarkdownStore = defineStore("markdown", () => {
  const editorRef = ref<HTMLTextAreaElement | null>(null);

  const editor = ref("");
  const textareaRef = ref<HTMLTextAreaElement | null>(null);

  const previousValue = ref("");

  return {
    editorRef,
    editor,
    textareaRef,
    previousValue,
  };
});

export default useMarkdownStore;
