import React, { useState } from "react";

function App() {
    const [location, setLocation] = useState("");
    const [result, setResult] = useState(null);
    const [trigger, setTrigger] = useState(null);
    const [claim, setClaim] = useState(null);

    const getRisk = async () => {
        const res = await fetch("http://127.0.0.1:8000/risk-premium", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ location }),
        });

        const data = await res.json();
        setResult(data);
    };

    const checkTrigger = async () => {
        const res = await fetch("http://127.0.0.1:8000/check-trigger");
        const data = await res.json();
        setTrigger(data);
    };

    const createClaim = async () => {
        const res = await fetch("http://127.0.0.1:8000/claim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                trigger_type: "Rain",
                zone: "Chennai-North",
            }),
        });

        const data = await res.json();
        setClaim(data);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#0f172a",
                color: "white",
                fontFamily: "Arial",
            }}
        >
            <div
                style={{
                    background: "#1e293b",
                    padding: "30px",
                    borderRadius: "12px",
                    width: "400px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                    textAlign: "center",
                }}
            >
                <h1 style={{ marginBottom: "20px" }}>
                    🛡 DeliverGuard 🛡
                </h1>

                {/* Location Input */}
                <input
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "90%",
                        borderRadius: "6px",
                        border: "none",
                        marginBottom: "10px",
                    }}
                />

                {/* Get Risk Button BELOW input */}
                <button
                    onClick={getRisk}
                    style={{
                        padding: "10px",
                        width: "50%",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Get Risk
                </button>

                {/* Risk Result */}
                {result && (
                    <div style={{ marginTop: "15px" }}>
                        <h3>Risk Score: {result.risk_score}</h3>
                        <h3>Weekly Premium: ₹{result.weekly_premium}</h3>
                    </div>
                )}

                <hr style={{ margin: "20px 0" }} />

                {/* Centered Trigger Button */}
                <button
                    onClick={checkTrigger}
                    style={{
                        padding: "10px",
                        width: "60%",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Check Triggers
                </button>

                {trigger && (
                    <div style={{ marginTop: "15px", textAlign: "left" }}>
                        <h3>Triggered Events:</h3>
                        <ul>
                            {trigger.triggered_events.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr style={{ margin: "20px 0" }} />

                {/* Centered Claim Button */}
                <button
                    onClick={createClaim}
                    style={{
                        padding: "10px",
                        width: "60%",
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Generate Claim
                </button>

                {claim && (
                    <div style={{ marginTop: "15px" }}>
                        <h3>Status: {claim.status}</h3>
                        <h3>Payout: ₹{claim.payout}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;