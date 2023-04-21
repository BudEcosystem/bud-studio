
import { createRoot } from 'react-dom/client'
import SampleImage from './sampleImg';
import { default as React } from "react";
export default class SimpleImage {
    static get toolbox() {
        return {
            title: 'Custom Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
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
        rootNode.setAttribute('class', "superitem");
        const onDataChange = (newData: any) => {
            this.data = newData;
        };

        createRoot(rootNode).render(
            <SampleImage
                onDataChange={onDataChange}
                data={this.data}
            />)

        return rootNode



    }

    save(blockContent: any) {
        console.log("save called", this)
        return {
            url: this.data
        }
    }
}



