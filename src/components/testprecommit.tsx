import { useEffect, useState } from "react"

export const PreCommit = () => {
    const [is, setIs] = useState(false)


    useEffect(() => {

        
        setIs(true);
    }, []);

    return <div>

    </div>
}