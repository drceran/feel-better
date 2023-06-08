import React, { useState } from "react";
import Diaries_Info from "./Diaries";
import Schedule_Info from "./Schedule";
import Resources from "./Resources";
export default function Hamburger_Menu() {
    const [content, setContent] = useState(0)
    const back = () => setContent(0)
    let context;

    switch(content) {
        case 0:
            context = (
                <>
                <div>
                    <h1>Create Personal Diaries</h1>
                    <p
                    onClick={() => setContent(1)}>Learn More</p>
                </div>
                <div>
                    <h1>Schedule Appointments with Certified Therapists</h1>
                    <p
                    onClick={() => setContent(2)}>Learn More</p>
                </div>
                <div>
                    <h1>Resources</h1>
                    <p
                    onClick={() => setContent(3)}>Learn More</p>
                </div>
                </>
            )
            break;
        case 1:
            context = (
                <Diaries_Info
                back = {back}
                />
            )
            break;
        case 2:
            context = (
                <Schedule_Info
                back = {back}
                />
            )
            break;
        case 3:
            context = (
                <Resources
                back = {back}
                />
            )
            break;
        default:
            return null
    }

    return (
        <div>
            {context}
        </div>
    )
}
