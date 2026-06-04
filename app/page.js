"use client";

const FORM_ACTIVE =
  new Date() >= new Date("2026-06-21T00:00:00");

import { useState } from "react";

export default function Home() {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitForm() {

    if (/\d/.test(name)) {
      alert("Name cannot contain numbers");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter valid 10 digit mobile");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/submit", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        mobile
      })
    });

    const data = await res.json();

    setLoading(false);

    if(data.success){
      generateCertificate(name);
    } else {
      alert(data.message);
    }
  }

  function generateCertificate(name) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const bg = new Image();
  
    bg.src = "/certificate_bg_2026.jpg";
  
    bg.onload = () => {
  
      canvas.width = bg.width;
      canvas.height = bg.height;
  
      ctx.drawImage(bg, 0, 0);
  
      // User Name
      ctx.font = "italic 45px 'Noto Sans Devanagari'";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 2;
  
      // Adjust X and Y after testing
      ctx.fillText(name, 860, 608);
  
      const link = document.createElement("a");
  
      link.download = `${name}-certificate.png`;
  
      link.href = canvas.toDataURL("image/png");
  
      link.click();
    };
  }

  return (

    <div style={mainStyle}>

      <div style={boxStyle}>
      {FORM_ACTIVE ? (
          <>
        <h1 style={{
          textAlign:"center",
          color:"#ffffff"
        }}>
          🧘 Yoga Certificate
        </h1>
        
        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={submitForm}
          style={btnStyle}
        >
          {loading ? "Please Wait..." : "Submit & Download"}
        </button>
        </>
) : (

  <div
    style={{
      textAlign: "center",
      color: "#fff",
      fontSize: "24px",
      lineHeight: "1.8",
      fontWeight: "bold",
      padding: "30px"
    }}
  >
    यह फॉर्म 21 जून 2026 को सक्रिय होगा।
    <br />
    कृपया पुनः पधारें।
  </div>

)}
      </div>

    </div>
  );
}

const mainStyle = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundImage: "url('/yoga-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  padding: "20px",
  paddingTop: "250px",
};

const boxStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "35px",
  borderRadius: "20px",
  background: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 0 25px rgba(0,0,0,0.5)",
  position: "relative",
  zIndex: 10
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  background: "#ffffff",
  color: "#000000",
  outline: "none",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.95)"
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold"
};
