//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools/editortools"

//props
type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
    //add a reference to editor
    const ref = useRef<EditorJS>();

    //initialize editorjs
    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    console.log(data)
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);


    return <div id={holder} />;
};

export default memo(EditorBlock);
