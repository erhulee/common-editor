import { onMounted, onUnmounted } from "vue";

function useResize(callback: (event?: UIEvent) => void) {
    onMounted(() => {
        callback();
        document.addEventListener("resize", callback);
    });
    onUnmounted(() => document.removeEventListener("resize", callback))
}

export default useResize;