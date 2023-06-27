import { Ref, onMounted, onUnmounted } from "vue";

export function useClickOutside(element: Ref<HTMLElement>, callback: () => void) {
    function handleClick(e: MouseEvent) {
        console.log(e)
        if (e.target == null) return;
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