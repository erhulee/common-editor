<template>
    <input ref="inputRef" type="file" class="w-0 h-0" @change="handleUpload" >
    <div @click="handleClick">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

interface UploadProgressEvent extends ProgressEvent {
    percent?: number;
}

interface UploadRequestError extends Error {
    status?: number;
    method?: UploadRequestMethod;
    url?: string;
}

interface UploadRequestOption<T = any> {
    onProgress: (event: UploadProgressEvent) => void;
    onError: (event: UploadRequestError | ProgressEvent, body?: T) => void;
    onSuccess: (body: T, xhr?: XMLHttpRequest) => void;
    filename: string;
    file: File;
    action: string;
    method: UploadRequestMethod;
    headers: Record<string, any>;
}
function getError(option: UploadRequestOption, xhr: XMLHttpRequest) {
    const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg) as UploadRequestError;
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
}

function getBody(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}



function xhrUpload(option: UploadRequestOption ){
     // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();

    if (option.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
            if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
            }
            option.onProgress?.(e);
        };
    }

    // eslint-disable-next-line no-undef
    const formData = new FormData();

    // eslint-disable-next-line no-undef
    if (option.file instanceof Blob) {
        formData.append("files", option.file, option.file.name);
    } else {
        formData.append("files", option.file);
    }

    xhr.onerror = function error(e) {
        option.onError?.(e);
    };

    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError?.(getError(option, xhr), getBody(xhr));
        }

        return option.onSuccess?.(getBody(xhr), xhr);
    };
  
    xhr.open(option.method, option.action, true);
      Object.keys(option.headers).forEach(header => {
        if (option.headers[header] !== null) {
            xhr.setRequestHeader(header, option.headers[header])
        }
    })
    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    xhr.send(formData);

    
    return {
        abort() {
            xhr.abort();
        },
    };
}
export default defineComponent({
    name: "c-upload",
    props:{
         // 多文件上传(0:单文件上传，1：多文件上传)
        multiple: {
            type: Number,
            default: 0,
        },
        // 上传数量
        limit: {
            type: Number,
            default: 0,
        },
        // 上传地址 url
        action: {
            type: String,
            default: '',
        },
        // 文件类型
        ext: {
            type: Array,// 数组类型
            default: [".gif", ".jpeg", ".jpg", ".png", ".bmp", ".doc", ".docx", ".xls", ".mp4", ".rmvb", ".zip"],
        },
        // 文件大小（mb）
        size: {
            type: Number,
            default: 0,
        },
        // 列表初始值
        data: {
            type: Array,// 数组类型
            default: [],
        },
        // 上传文件类型（image | file）
        type: {
            type: String,
            default: 'image',
        },
        // 随机名(1或者0)
        autoName: {
            type: Boolean,
            default: 1,
        },
        onProgress:{
            type: Function as PropType<(event: UploadProgressEvent) => void>
        },
        onError: {
            type: Function as PropType<(event: UploadRequestError | ProgressEvent, body?: any) => void>
        },
        onSuccess: {
            type: Function as PropType<(body: any, xhr?: XMLHttpRequest) => void>
        },
        headers: {
            type: Object as PropType<Record<string, any>>,
            default: {}
        }
    },
    setup(props, ctx) {
        const inputRef = ref<HTMLElement | null>(null);
        function handleClick() {
            inputRef.value?.click()
        }

        function handleUpload(e: Event){
            const file = (e.target as any).files[0] as File;
         
            xhrUpload({
                onProgress: props.onProgress!,
                onError: props.onError!,
                onSuccess: props.onSuccess!,
                filename: file.name,
                file: file,
                action: props.action,
                method: "post",
                headers: props.headers
            })
        }

        return {
            inputRef,
            handleClick,
            handleUpload
        }
    }
})

</script>