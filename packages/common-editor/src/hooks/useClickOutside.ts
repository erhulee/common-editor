import { Ref, onMounted, onUnmounted } from "vue";

export function useClickOutside(element: Ref<HTMLElement>, callback: () => void) {
    function handleClick(e: MouseEvent) {
        if (e.target == null || element?.value?.contains == null) return;
        if (!element.value.contains(e.target as Node)) {
            callback();
        }
    }
    onMounted(() => {
        document.addEventListener("mousedown", handleClick, true)
    })
    onUnmounted(() => {
        document.removeEventListener("mousedown", handleClick)
    })
}