"use client";

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

  function generateCertificate(name){

    const canvas = document.createElement("canvas");

    canvas.width = 1400;
    canvas.height = 1000;

    const ctx = canvas.getContext("2d");

    // Background
    let bg = ctx.createLinearGradient(0,0,1400,1000);

    bg.addColorStop(0,"#ecfdf5");
    bg.addColorStop(1,"#bbf7d0");

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,1400,1000);

    // Border
    ctx.strokeStyle = "#166534";
    ctx.lineWidth = 16;
    ctx.strokeRect(30,30,1340,940);

    // Om Symbol
    ctx.fillStyle = "#166534";
    ctx.font = "70px serif";
    ctx.textAlign = "center";
    ctx.fillText("ॐ",700,120);

    // Title
    ctx.fillStyle = "#14532d";
    ctx.font = "bold 58px Georgia";
    ctx.fillText("YOGA CERTIFICATE",700,220);

    ctx.font = "30px Arial";
    ctx.fillText("Awarded To",700,320);

    // Name
    ctx.font = "bold 68px cursive";
    ctx.fillText(name,700,450);

    // Description
    ctx.font = "28px Arial";
    ctx.fillText("For Successfully Participating",700,560);
    ctx.fillText("In International Yoga Session",700,610);

    // Yoga Icon
    ctx.font = "90px serif";
    ctx.fillText("🧘",700,760);

    // Footer
    ctx.font = "22px Arial";
    ctx.fillText(new Date().toLocaleDateString(),1150,930);

    // Download
    const link = document.createElement("a");

    link.download = "yoga-certificate.png";
    link.href = canvas.toDataURL();

    link.click();
  }

  return (

    <div style={mainStyle}>

      <div style={boxStyle}>

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
  paddingTop: "220px",
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
