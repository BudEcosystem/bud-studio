
import styles from "./imageUpload.module.css"
import { useEffect, useState } from "react"
import FilerobotImageEditor from 'filerobot-image-editor';
import Image from "next/image"
const ImageUpload = () => {
    const [step, setStep] = useState<number>(0)
    const [imageUrl, setImageUrl] = useState<string>('');
    const [showOver, setShowOverlay] = useState<boolean>(false)
    const { TABS, TOOLS } = FilerobotImageEditor;
    const config = {
        source: imageUrl,
        onSave: (editedImageObject, designState) => {
            console.log('saved', editedImageObject, designState),
                setImageUrl(editedImageObject?.imageBase64)

        },
        annotationsCommon: {
            fill: '#ff0000'
        },
        Text: { text: 'Filerobot...' },
        Rotate: { angle: 90, componentType: 'slider' },
        tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
        defaultTabId: TABS.ANNOTATE, // or 'Annotate'
        defaultToolId: TOOLS.TEXT, // or 'Text'
    };

    let it = document.querySelector("#editor-container")
    let filerobotImageEditor;
    if (it) {
        console.log(it)
        filerobotImageEditor = new FilerobotImageEditor(
            it,
            config
        );
    }

    const onEdit = () => {
        setStep(2)
        filerobotImageEditor.render({
            onClose: (closingReason) => {
                console.log('Closing reason', closingReason);
                filerobotImageEditor.terminate();
                setStep(1)
            }
        });

    }



    const handleUploadClicked = () => {
        const uploadFileButton = document.getElementById("uploadImage")
        uploadFileButton?.click()
    }


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file)
        setStep(1)
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file as Blob);
    }
    return (
        <>

            {step === 0 &&
                <>
                    <div className={styles.uploadButton}>
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => {
                                handleImageUpload(e)
                            }}
                            style={{ display: "none" }}
                            id="uploadImage" />
                        <button onClick={handleUploadClicked}>Upload Image</button>
                    </div>
                </>

            }
            {step == 1 &&

                imageUrl && (
                    <div className={styles.imageHolder} style={{ height: 500, width: 500 }}
                        onMouseEnter={() => {
                            setShowOverlay(true)
                        }}
                        onMouseLeave={() => {
                            setShowOverlay(false)
                        }}
                    >
                        {showOver &&
                            <div className={styles.imageOverlay}
                                onClick={onEdit}
                            >
                                <button>Edit Image</button>
                            </div>

                        }
                        <Image
                            alt={"Uploaded"}
                            src={imageUrl}
                            width={500}
                            height={500}
                        />
                    </div>


                )

            }
            <div id="editor-container"></div>


        </>


    );
}

export default ImageUpload;