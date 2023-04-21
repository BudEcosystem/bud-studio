
import { createRoot } from 'react-dom/client'
import { default as React } from "react";
import ImageUpload from './ImageUpload';
export default class ImageRenderer {
    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
        };
    }
    api: any;
    readOnly: boolean;
    data: any;
    CSS: any;
    nodes: any;
    wrapper: any;
    filePath: any;

    constructor({ data, config, api, readOnly, filePath }: any) {
        this.api = api;
        this.readOnly = readOnly;
        this.wrapper = undefined;
        this.data = data;

        // dpn't use , file path is not being transfered
        this.filePath = filePath;

        this.CSS = {
            wrapper: "image-displayer",
        };

        this.nodes = {
            holder: null,
        };
    }
    render() {
        const rootNode = document.createElement('div');
        rootNode.setAttribute('class', this.CSS.wrapper);
        const onDataChange = (newData: any) => {
            this.data = newData;
        };

        createRoot(rootNode).render(
            <ImageUpload />
        )

        return rootNode



    }

    save(blockContent: any) {
        console.log("save called", this)
        return {
            url: this.data
        }
    }
}



