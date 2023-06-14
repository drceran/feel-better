import React from "react";

export default function DiariesInfo({back}) {

    return (
        <div style={{ fontFamily: "Short Stack, cursive"}}>
            <button style={{ fontFamily: "Short Stack, cursive", fontSize: '10px' }}
            onClick={back}>back</button>
            <h1 style={{fontSize: '30px' }}>Create Personal Diaries</h1>
            <p style={{fontSize: '10px' }}>the journal feature empowers users to engage in self-reflection, self-expression, and self-monitoring.
                It serves as a personal tool for emotional well-being, personal growth, and communication with therapists.</p>
            <h3 style={{fontSize: '15px' }}>-Create Journal Entries: Users can create new journal entries by writing and saving their thoughts, emotions, or any other relevant information they wish to record. This feature enables users to express themselves freely and document their experiences.</h3>

            <h3 style={{fontSize: '15px' }}>-Lock Journal Entries: To maintain privacy and confidentiality, the journal feature allows users to lock specific journal entries. This ensures that only the user can access and read those locked entries. It provides an added layer of security for personal and sensitive information.</h3>

            <h3 style={{fontSize: '15px' }}>-Share Journal Entries with Therapist: Users can choose to share specific journal entries with their therapists. This feature facilitates communication and enhances the therapeutic process. Sharing journal entries can provide valuable insights to therapists, allowing them to better understand the user's emotions, challenges, and progress.</h3>

            <h3 style={{fontSize: '15px' }}>-Mood Tracking: The journal feature also includes a mood tracking functionality. Users can record their current mood or emotional state while creating journal entries. This feature enables users to monitor and track their emotional well-being over time. It provides a visual representation of mood patterns and helps users gain insights into their emotional fluctuations.</h3>
        </div>
    )
}
