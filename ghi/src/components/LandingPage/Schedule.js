import React, { useState } from "react";

export default function Schedule_Info({back}) {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            "Hi from schedule!!"
            <button
                onClick={back}>back</button>
        </div>
    )
}
