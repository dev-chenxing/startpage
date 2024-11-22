import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return <span>{time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })}</span>
}