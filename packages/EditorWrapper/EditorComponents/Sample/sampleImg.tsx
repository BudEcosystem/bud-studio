


import { default as React, useRef } from "react";
import styles from "./Sample.module.css"
const SampleImage = ({ data, onDataChange }: any) => {
    const [url, setUrl] = React.useState()
    const [showImage, setShow] = React.useState(false)
    console.log("sam data", data)
    return (
        <> 
            <button onClick={() => {
                console.log("chage")
                onDataChange("New Data")
            }}>Change data</button>
            <h3>the dta</h3>


            {/* {
                showImage &&
                < img src={data} className={styles.image} />
            }
            {
                !showImage &&

                <div className={styles.imageHolder}>
                    <input placeholder="Enter the URL" value={url} onChange={(e: any) => {
                        setUrl(e.target.value)
                    }
                    } />
                    <button onClick={() => {
                        onDataChange(url)
                        setShow(true)
                    }}>Get Image</button>
                </div>
            } */}


        </>
    );
}

export default SampleImage;