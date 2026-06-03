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

  // function generateCertificate(name){

  //   const canvas = document.createElement("canvas");
  //   canvas.width = 1400;
  //   canvas.height = 1000;
    
  //   const ctx = canvas.getContext("2d");
    
  //   const bg = new Image();
    
  //   bg.src = "/certificate_bg.jpg";
    
  //   bg.onload = () => {
    
  //     // Draw Background
  //     ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    
  //     // Overlay for readability
  //     ctx.fillStyle = "rgba(255,255,255,0.75)";
  //     ctx.fillRect(80, 80, 1240, 840);
    
  //     // Heading
  //     ctx.fillStyle = "#9a3412";
  //     ctx.font = "bold 54px 'Noto Sans Devanagari'";
  //     ctx.textAlign = "center";
    
  //     ctx.fillText("अंतर्राष्ट्रीय योग दिवस 2026", 700, 140);
    
  //     // Sub Heading
  //     ctx.fillStyle = "#14532d";
  //     ctx.font = "bold 40px 'Noto Sans Devanagari'";
    
  //     ctx.fillText("प्रशस्ति प्रमाण पत्र", 700, 210);
    
  //     // Main Text
  //     ctx.fillStyle = "#1f2937";
  //     ctx.font = "32px 'Noto Sans Devanagari'";
  //     ctx.textAlign = "center";
    
  //     ctx.fillText("यह प्रमाणित किया जाता है कि", 700, 320);
    
  //     // Dynamic Name
  //     ctx.fillStyle = "#7c2d12";
  //     ctx.font = "bold 48px 'Noto Sans Devanagari'";
    
  //     ctx.fillText(name, 700, 410);
    
  //     // Decorative Line
  //     ctx.beginPath();
  //     ctx.moveTo(420, 440);
  //     ctx.lineTo(980, 440);
  //     ctx.strokeStyle = "#7c2d12";
  //     ctx.lineWidth = 2;
  //     ctx.stroke();
    
  //     // Paragraph
  //     ctx.fillStyle = "#111827";
  //     ctx.font = "30px 'Noto Sans Devanagari'";
    
  //     const lines = [
  //       "ने अंतर्राष्ट्रीय योग दिवस 2026 के अवसर पर",
  //       "विवेकानन्द केन्द्र, जोधपुर द्वारा आयोजित योग कार्यक्रम में",
  //       "उत्साहपूर्वक सहभागिता की।",
  //       "",
  //       "इन्होंने योगाभ्यास, प्राणायाम एवं स्वस्थ जीवन शैली",
  //       "के संदेश को आत्मसात करते हुए कार्यक्रम को सफल",
  //       "बनाने में अपना महत्वपूर्ण योगदान दिया।",
  //       "",
  //       "उनकी सक्रिय सहभागिता एवं समर्पण सराहनीय है।",
  //       "",
  //       "हम उनके उज्ज्वल, स्वस्थ एवं अनुशासित जीवन",
  //       "की मंगलकामना करते हैं।"
  //     ];
    
  //     let y = 520;
    
  //     lines.forEach((line) => {
  //       ctx.fillText(line, 700, y);
  //       y += 48;
  //     });
    
  //     // Footer
  //     ctx.font = "28px 'Noto Sans Devanagari'";
  //     ctx.fillStyle = "#374151";
    
  //     ctx.fillText("विवेकानन्द केन्द्र, जोधपुर", 250, 900);
    
  //     ctx.fillText("अंतर्राष्ट्रीय योग दिवस 2026", 1100, 900);
    
  //     // Date
  //     const date = new Date().toLocaleDateString("hi-IN");
    
  //     ctx.font = "24px 'Noto Sans Devanagari'";
    
  //     ctx.fillText("दिनांक : " + date, 700, 950);
    
  //     // Download
  //     const link = document.createElement("a");
    
  //     link.download = `${name}-certificate.png`;
    
  //     link.href = canvas.toDataURL("image/png");
    
  //     link.click();
  //   };
  // }

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
      ctx.font = "bold 45px 'Noto Sans Devanagari'";
      ctx.fillStyle = "#0d2a7a";
      ctx.textAlign = "center";
      
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 2;
  
      // Adjust X and Y after testing
      ctx.fillText(name, , 608);
  
      const link = document.createElement("a");
  
      link.download = `${name}-certificate.png`;
  
      link.href = canvas.toDataURL("image/png");
  
      link.click();
    };
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
