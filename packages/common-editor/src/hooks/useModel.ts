import { ref, watch } from "vue";

export default function useModel<T>(callback: (value: any) => void, value: T) {
    const valueRef = ref<T>(value);
    watch(valueRef, (value, oldValue) => {
        callback(value);
    })
    
    return valueRef
}