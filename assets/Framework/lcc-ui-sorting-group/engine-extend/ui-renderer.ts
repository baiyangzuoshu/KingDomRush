import { UIRenderer } from "cc";

declare module 'cc' {
    interface UIRenderer {
        
        /**
         * 渲染优先级
         */
        renderPriority:number;

        /**
         * 渲染透明度
         */
        renderOpacity:number;
    }
}
