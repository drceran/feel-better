import React, { useState } from "react";

export default function Diaries_Info({back}) {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            "Hello from Diaries"
            <button
            onClick={back}>back</button>
        </div>
    )
}
