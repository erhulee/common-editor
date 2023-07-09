import { Ref } from "vue";
import { fabric } from "fabric";
import { FabricText } from "./fabric-component/text";
import { FabricBase } from "./fabric-component/element";
import { useActorsStore } from "@/store/actors";
import { forEach } from "lodash-es";
import { FabricCircle } from "./fabric-component/circle";
import { FabricRect } from "./fabric-component/rectangle";
export const RenderMapping = {
    "text": FabricText,
    "circle": FabricCircle,
    "rectangle": FabricRect
}


export class FabricController {
    store: any // pinia 状态库
    canvasRef!: Ref<fabric.Canvas>
    mapping: Record<string, { create: (parent: fabric.Canvas, option: any) => FabricBase }>
    constructor() {
        this.mapping = RenderMapping
    }

    init(canvas: Ref<fabric.Canvas>) {
        this.canvasRef = canvas
        this.subscribe()
    }

    add(tag: string, option: any): FabricBase | null {
        const factory = this.mapping[tag];
        if (factory != undefined) {
            const element = factory.create(this.canvasRef.value, option);
            this.canvasRef.value.add(element.instance);
            return element;
        }
        return null
    }

    private subscribe() {
        const store = useActorsStore();
        store.$onAction(({
            name, // action 的名字
            store, // store 实例
            args, // 调用这个 action 的参数
            after, // 在这个 action 执行完毕之后，执行这个函数
            onError, // 在这个 action 抛出异常的时候，执行这个函数
        }) => {
            const type = store.currentActor?.tag;
            console.log("订阅:", name, args)
            switch (name) {
                case "add":
                    after(() => {
                        const [type, setting] = args
                        const options = RenderMapping[type].strategy.add(setting);
                        const element = this.add(type, options);
                        if (element && store.currentActor) {
                            store.currentActor.fabricElement = element;
                        }
                    })
                    break;
                case "updateOption":
                    after(() => {
                        const changeValues = RenderMapping["text"].strategy.update(args)
                        const element = store.currentActor!.fabricElement;
                        forEach(changeValues || {}, (value, key) => {
                            element[key] = value
                        })
                    })
            }

        })
    }
}