import axios from "axios";
import { useEffect, useState } from "react"


export const useWork = ({id}) => {
    const [work, setWork] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/works/${id}`)
            .then(res => {
                setWork(res.data.product);
        })
      
    }, [id])

    return {
        work
    }
}