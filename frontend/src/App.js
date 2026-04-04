// ======================= FRONTEND (App.js) — FIXED TRIGGERS DISPLAY =======================

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BASE_URL = "http://127.0.0.1:8001";

function App() {
    const [screen,setScreen] = useState("home");
    const [user,setUser] = useState(null);

    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [coords,setCoords] = useState(null);

    const [policy,setPolicy] = useState(null);
    const [selectedPolicy,setSelectedPolicy] = useState(null);
    const [selectedTriggers,setSelectedTriggers] = useState([]);
    const [claim,setClaim] = useState(null);

    // REGISTER
    const register = async ()=>{
        try{
            const res = await fetch(`${BASE_URL}/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name,location,zone:"medium"})
            });

            const data = await res.json();
            setUser(data.user);

            const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
            const geoData = await geo.json();

            if(geoData.length>0){
                setCoords([
                    parseFloat(geoData[0].lat),
                    parseFloat(geoData[0].lon)
                ]);
            }

            setScreen("dashboard");

        }catch{
            alert("Backend not running");
        }
    };

    const createPolicy = async (triggers,type)=>{
        const res = await fetch(`${BASE_URL}/create-policy/${user.id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({triggers,type})
        });
        const data = await res.json();
        setPolicy(data.policy);
    };

    const generateClaim = async ()=>{
        const res = await fetch(`${BASE_URL}/auto-claim`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({user_id:user.id})
        });
        const data = await res.json();

        // 🔥 FIX: ALWAYS SET ARRAY (even if no claim)
        if(!data.triggers_hit){
            data.triggers_hit = [];
        }

        setClaim(data);
    };

    const toggleTrigger = (t)=>{
        setSelectedTriggers(prev =>
            prev.includes(t) ? prev.filter(x=>x!==t) : [...prev,t]
        );
    };

    return (
        <div style={styles.app}>

            <div style={styles.navbar}>
                <h2>DeliverGuard</h2>
            </div>

            <div style={styles.main}>

                {user && (
                    <div style={styles.sidebar}>
                        <button onClick={()=>setScreen("dashboard")}>Dashboard</button>
                        <button onClick={()=>setScreen("policy")}>Policies</button>
                        <button onClick={()=>setScreen("claim")}>Claims</button>
                    </div>
                )}

                <div style={styles.content}>

                    {/* HOME */}
                    {screen==="home" && (
                        <div style={styles.centerBox}>
                            <h1>Welcome</h1>
                            <input placeholder="Name" onChange={e=>setName(e.target.value)} />
                            <input placeholder="City" onChange={e=>setLocation(e.target.value)} />
                            <button onClick={register}>Register</button>
                        </div>
                    )}

                    {/* DASHBOARD */}
                    {screen==="dashboard" && user && (
                        <>
                            <h2>Dashboard</h2>
                            <p>User: {user.name}</p>
                            <p>Location: {user.location}</p>

                            <h3>Triggers</h3>
                            <p>Rain → rainfall &gt; 5 mm</p>
                            <p>Heatwave → temperature &gt; 35°C</p>
                            <p>AQI → AQI &gt; 300</p>

                            <h3>Risk Calculation</h3>
                            <p>Risk = (rain/10 + temperature/40 + aqi/300) / 3</p>

                            <h3>Payout Calculation</h3>
                            <p>Payout = premium × multiplier × (1 + risk)</p>

                            {coords && (
                                <MapContainer center={coords} zoom={12} style={{height:"300px"}}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                    <Marker position={coords}/>
                                </MapContainer>
                            )}
                        </>
                    )}

                    {/* POLICY */}
                    {screen==="policy" && (
                        <>
                            <h2>Policies</h2>

                            {policy && (
                                <p><b>Chosen Policy:</b> {policy.type}</p>
                            )}

                            <button onClick={()=>setSelectedPolicy({
                                type:"Basic",
                                triggers:["Rain","AQI"],
                                price:40
                            })}>Basic ₹40</button>

                            <button onClick={()=>setSelectedPolicy({
                                type:"Standard",
                                triggers:["Rain","AQI","Heatwave"],
                                price:50
                            })}>Standard ₹50</button>

                            <button onClick={()=>setSelectedPolicy({
                                type:"Premium",
                                triggers:["Rain","Heatwave","Flood"],
                                price:60
                            })}>Premium ₹60</button>

                            {selectedPolicy && (
                                <div style={styles.box}>
                                    <h3>{selectedPolicy.type}</h3>
                                    <p><b>Triggers:</b> {selectedPolicy.triggers.join(", ")}</p>
                                    <p><b>Price:</b> ₹{selectedPolicy.price}</p>

                                    <button onClick={()=>{
                                        createPolicy(selectedPolicy.triggers, selectedPolicy.type);
                                        setSelectedPolicy(null);
                                    }}>
                                        Confirm Policy
                                    </button>
                                </div>
                            )}

                            <h3>Custom Policy</h3>

                            {["Rain","AQI","Heatwave","Flood","Curfew"].map(t=>(
                                <label key={t}>
                                    <input type="checkbox" onChange={()=>toggleTrigger(t)} /> {t}
                                </label>
                            ))}

                            <button onClick={()=>{
                                setSelectedPolicy({
                                    type:"Custom",
                                    triggers:selectedTriggers,
                                    price:30 + selectedTriggers.length*15
                                });
                            }}>
                                Preview Custom
                            </button>
                        </>
                    )}

                    {/* CLAIM */}
                    {screen==="claim" && (
                        <>
                            <button onClick={generateClaim}>Generate Claim</button>

                            {claim && (
                                <div style={styles.box}>
                                    <p><b>Status:</b> {claim.status}</p>
                                    <p><b>Location:</b> {claim.location}</p>

                                    {/* 🔥 FIX: ALWAYS SHOW */}
                                    <p>
                                        <b>Triggers Hit:</b>{" "}
                                        {claim.triggers_hit.length > 0
                                            ? claim.triggers_hit.join(", ")
                                            : "None"}
                                    </p>

                                    <h3>Calculation</h3>
                                    <p>Payout = premium × multiplier × (1 + risk)</p>
                                    <p>Risk: {claim.risk_score}</p>

                                    <h2>₹{claim.payout}</h2>
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

const styles = {
    app:{height:"100vh",background:"#f4f6f9"},
    navbar:{background:"#111",color:"white",padding:"15px"},
    main:{display:"flex",height:"calc(100vh - 60px)"},
    sidebar:{width:"200px",background:"#1f2937",color:"white",display:"flex",flexDirection:"column",padding:"20px"},
    content:{flex:1,padding:"30px"},
    centerBox:{display:"flex",flexDirection:"column",alignItems:"center"},
    box:{border:"1px solid #ddd",padding:"15px",margin:"20px 0"}
};

export default App;