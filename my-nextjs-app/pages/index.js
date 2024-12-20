import { useState, useEffect } from "react";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/data")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
            <h1>Next.js with Flask</h1>
            <p>{data ? data.message : "Loading..."}</p>
        </div>
    );
}
