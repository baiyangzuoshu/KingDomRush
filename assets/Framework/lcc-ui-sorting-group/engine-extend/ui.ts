import { clamp, gfx,Node,RenderData,UI,StencilManager,UIRenderer, renderer } from 'cc';
import { JSB } from 'cc/env';

declare module 'cc' {
    interface UI {

        /**
         * 渲染器缓存
         */
        rendererCache:UIRenderer[];

        /**
         * 渲染器排序
         */
        rendererOrder:boolean;

        /**
         * 刷新渲染缓存
         */
        flushRendererCache();
    }
}

export enum _cocos_2d_renderer_stencil_manager__Stage {
    DISABLED = 0,
    CLEAR = 1,
    ENTER_LEVEL = 2,
    ENABLED = 3,
    EXIT_LEVEL = 4,
    CLEAR_INVERTED = 5,
    ENTER_LEVEL_INVERTED = 6
}

export function updateOpacity (renderData: RenderData, opacity: number) {
    const vfmt = renderData.vertexFormat;
    const vb = renderData.chunk.vb;
    let attr; let format; let stride;
    // Color component offset
    let offset = 0;
    for (let i = 0; i < vfmt.length; ++i) {
        attr = vfmt[i];
        format = gfx.FormatInfos[attr.format];
        if (format.hasAlpha) {
            stride = renderData.floatStride;
            if (format.size / format.count === 1) {
                const alpha = ~~clamp(Math.round(opacity * 255), 0, 255);
                // Uint color RGBA8
                for (let color = offset; color < vb.length; color += stride) {
                    vb[color] = ((vb[color] & 0xffffff00) | alpha) >>> 0;
                }
            } else if (format.size / format.count === 4) {
                // RGBA32 color, alpha at position 3
                for (let alpha = offset + 3; alpha < vb.length; alpha += stride) {
                    vb[alpha] = opacity;
                }
            }
        }
        offset += format.size >> 2;
    }
}

UI.prototype.flushRendererCache = function(){
    const rendererCache = this.rendererCache;
    if(rendererCache.length > 0){
        if(this.rendererOrder){
            rendererCache.sort((a, b)=>{ return a.renderPriority - b.renderPriority; });
        }
        //console.log(`flushRendererCache `,rendererCache.length,this.rendererOrder);
        for(let render of rendererCache){
            //console.log(`${render.node.name} render hash ${render.renderPriority}`);
            render.fillBuffers(this);
            if(render.renderOpacity >= 0){
                updateOpacity(render.renderData, render.renderOpacity);
                const buffer = render.renderData.getMeshBuffer();
                if (buffer) {
                    buffer.setDirty();
                }
            }
        }
        rendererCache.length = 0;
    }
    this.rendererOrder = false;
}

UI.prototype.update = function() {
    if (JSB) {
        return;
    }
    this.rendererCache = this.rendererCache ?? [];
    this.rendererOrder = false;
    const screens = this._screens;
    let offset = 0;
    for (let i = 0; i < screens.length; ++i) {
        const screen = screens[i];
        const scene = screen._getRenderScene();
        if (!screen.enabledInHierarchy || !scene) {
            continue;
        }
        // Reset state and walk
        this._opacityDirty = 0;
        this._pOpacity = 1;

        this.walk(screen.node);
        this.flushRendererCache();

        this.autoMergeBatches(this._currComponent!);
        this.resetRenderStates();

        let batchPriority = 0;
        if (this._batches.length > offset) {
            for (; offset < this._batches.length; ++offset) {
                const batch = this._batches.array[offset];

                if (batch.model) {
                    const subModels = batch.model.subModels;
                    for (let j = 0; j < subModels.length; j++) {
                        subModels[j].priority = batchPriority++;
                    }
                } else {
                    batch.descriptorSet = this._descriptorSetCache.getDescriptorSet(batch);
                }
                scene.addBatch(batch);
            }
        }
    }
}

UI.prototype.walk = function(node: Node, level = 0, sortingPriority = 0, sortingLevel = 0){
    if (!node.activeInHierarchy) {
        return;
    }
    const children = node.children;
    const uiProps = node._uiProps;
    const render = uiProps.uiComp as UIRenderer;
    
    const stencilEnterLevel = render && (render.stencilStage === _cocos_2d_renderer_stencil_manager__Stage.ENTER_LEVEL || render.stencilStage === _cocos_2d_renderer_stencil_manager__Stage.ENTER_LEVEL_INVERTED);
    const transform = uiProps.uiTransformComp;
    sortingPriority = (transform && transform._sortingEnabled) ? transform._sortingPriority : sortingPriority;
    if((transform && transform._sortingEnabled)){
        ++sortingLevel;
    }

    // Save opacity
    const parentOpacity = this._pOpacity;
    let opacity = parentOpacity;
    // TODO Always cascade ui property's local opacity before remove it
    const selfOpacity = render && render.color ? render.color.a / 255 : 1;
    this._pOpacity = opacity *= selfOpacity * uiProps.localOpacity;
    // TODO Set opacity to ui property's opacity before remove it
    // @ts-expect-error temporary force set, will be removed with ui property's opacity
    uiProps._opacity = opacity;
    if (uiProps.colorDirty) {
        // Cascade color dirty state
        this._opacityDirty++;
    }

    // Render assembler update logic
    if (render && render.enabledInHierarchy) {
        if(sortingLevel > 0){
            if(stencilEnterLevel){
                console.log("11111111111111111111111111111");
                this.flushRendererCache();
    
                render.fillBuffers(this);// for rendering
    
                // Update cascaded opacity to vertex buffer
                if (this._opacityDirty && render && !render.useVertexOpacity && render.renderData && render.renderData.vertexCount > 0) {
                    // HARD COUPLING
                    updateOpacity(render.renderData, opacity);
                    const buffer = render.renderData.getMeshBuffer();
                    if (buffer) {
                        buffer.setDirty();
                    }
                }
            }else{
                this.rendererCache.push(render);
                render.renderPriority = sortingPriority;
                if(sortingPriority != 0){
                    this.rendererOrder = true;
                }
                if (this._opacityDirty && render && !render.useVertexOpacity && render.renderData && render.renderData.vertexCount > 0) {
                    render.renderOpacity = opacity;
                }else{
                    render.renderOpacity = -1;
                }
            }
        }else{
            render.fillBuffers(this);
            if(render.renderOpacity >= 0){
                updateOpacity(render.renderData, render.renderOpacity);
                const buffer = render.renderData.getMeshBuffer();
                if (buffer) {
                    buffer.setDirty();
                }
            }
        }
    }

    if (children.length > 0 && !node._static) {
        for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            this.walk(child, level, sortingPriority, sortingLevel);
        }
    }

    if (uiProps.colorDirty) {
        // Reduce cascaded color dirty state
        this._opacityDirty--;
        // Reset color dirty
        uiProps.colorDirty = false;
    }
    // Restore opacity
    this._pOpacity = parentOpacity;
    // Post render assembler update logic
    // ATTENTION: Will also reset colorDirty inside postUpdateAssembler
    if (render && render.enabledInHierarchy) {
        render.postUpdateAssembler(this);
        if (stencilEnterLevel
        && (StencilManager.sharedManager!.getMaskStackSize() > 0)) {
            this.flushRendererCache();

            this.autoMergeBatches(this._currComponent!);
            this.resetRenderStates();
            StencilManager.sharedManager!.exitMask();
        }
    }

    if((transform && transform._sortingEnabled)){
        --sortingLevel;
        if(sortingLevel <= 0){
            //console.log("3333333333333333333333333",transform._sortingEnabled,sortingLevel);
            //this.flushRendererCache();
        }
    }

    level += 1;
};
