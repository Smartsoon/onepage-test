import {makeAutoObservable, set} from "mobx";

type ComponentProps = Record<string, any>

type ComponentData =  {
    name: string;
    props: ComponentProps;
}

type Component = Record<string, ComponentData>;

type Layer = Record<string, Component>;

class PageStore {
    pageLayout: Layer = {
        layerId: {

        }
    };

    constructor() {
        makeAutoObservable(this);
    }

    addLayoutLayer(layerName: string, newLayer: Component) {
        this.pageLayout = {
            ...this.pageLayout,
            [layerName]: newLayer
        };
    }

    addLayerComponent(layerId: string, componentId: string, componentData: ComponentData) {
        if (layerId in this.pageLayout) {
            this.pageLayout[layerId] = {
                ...this.pageLayout[layerId],
                [componentId]: componentData
            };
        }
    }

    removeLayer(layerName: string) {
        const {[layerName]: removedLayer, ...rest} = this.pageLayout;
        this.pageLayout = rest;
    }

    removeComponent(layerName: string, componentName: string) {
        if (layerName in this.pageLayout && componentName in this.pageLayout[layerName]) {
            const {[componentName]: removedComponent, ...rest} = this.pageLayout[layerName];
            this.pageLayout[layerName] = rest;
        }
    }

    updateLayer(layerName: string, newLayer: Component) {
        if (layerName in this.pageLayout) {
            this.pageLayout[layerName] = newLayer;
        }
    }

    updateComponent(layerName: string, componentName: string, newComponentData: ComponentData) {
        if (layerName in this.pageLayout && componentName in this.pageLayout[layerName]) {
            this.pageLayout[layerName][componentName] = newComponentData;
        }
    }

    updateComponentProp(layerName: string, componentName: string, propName: string, propValue: any) {
        if (layerName in this.pageLayout && componentName in this.pageLayout[layerName]) {
            const currentProps = this.pageLayout[layerName][componentName].props;
            set(this.pageLayout[layerName][componentName], "props", {
                ...currentProps,
                [propName]: propValue
            });
        }
    }

    removeAllComponents(layerName: string) {
        if (layerName in this.pageLayout) {
            this.pageLayout[layerName] = {};
        }
    }
}

export const pageStore = new PageStore();