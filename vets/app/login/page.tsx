"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await res.json();

    if (!result.success || !result.userId) {
      alert("Invalid email or password");
      return;
    }

    Cookies.set("userId", result.userId, { expires: 7 });

    try {
      const res = await fetch(`/api/me?userId=${result.userId}`, {
        method: "GET",
      });
      const user = await res.json();
      if (user?.userType === 2) {
        router.push("/vet");
      } else if (user?.userType === 1) {
        router.push("/getpet");
      } else {
        alert("Unknown user type.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "white", // Plain white background as base
        position: "relative",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ position: "fixed", top: "20px", left: "10px", zIndex: 110, width: "150px", height: "38px" }}>
        <div style={{ width: "150px", height: "38px", position: "relative" }}>
          <Image 
            src="/img/vetrail-logo-with-text.svg" 
            alt="Vetrail Logo" 
            fill 
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Login Panel */}
      <div style={{ width: "40%", paddingLeft: "138px", paddingTop: "225px" }}>
        <div
          style={{
            width: "142px",
            height: "52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#4C4C4C",
            fontSize: "35px",
            fontWeight: 600,
            lineHeight: "220%",
            marginBottom: "32px",
          }}
        >
          Login
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "flex",
            width: "321px",
            height: "48px",
            padding: "15px 20px",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            border: "1px solid #DFDFDF",
            background: "#FFF",
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "flex",
            width: "321px",
            height: "48px",
            padding: "15px 20px",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            border: "1px solid #DFDFDF",
            background: "#FFF",
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            display: "flex",
            width: "321px",
            height: "48px",
            padding: "15px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            background: "#004F82",
            color: "white",
            fontSize: "16px",
            fontWeight: 500,
            border: "none",
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          Login
        </button>

        <button
          style={{
            display: "flex",
            width: "321px", /* Changed from 176px to 321px to match login button width */
            height: "32px",
            justifyContent: "center",
            alignItems: "center",
            color: "#2563EB",
            background: "none",
            border: "none",
            fontSize: "12px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Forgot your password?
        </button>
      </div>

      {/* Right: Floating Circles with individual gradients */}
      <div 
        style={{ 
          flex: 1, 
          position: "relative", 
          right: 0,
          overflow: "hidden",
          background: "radial-gradient(circle at 50% 50%,rgb(192, 234, 243) 20%, white 80%)",
        }}
      >
        {/* Central circles layout based on mockup measurements */}
        {[
          // Main center dog image - 109x109
          { top: "43%", left: "48%", size: 109, image: "/img/login/sample-dog-1.png" },
          
          // Top line
          { top: "20%", left: "48%", size: 60, color: "#004F82" }, // Top dark blue circle (101.37px from center)
          
          // Right side
          { top: "50%", left: "78%", size: 80, color: "#004F82" }, // Right dark blue large circle (164.57px from center)
          { top: "40%", left: "72%", size: 22, color: "#004F82" }, // Upper right small dark blue
          { top: "35%", left: "65%", size: 16, color: "#6BE0F8" }, // Upper right tiny light blue
          
          // Left side
          { top: "45%", left: "25%", size: 80, color: "#6BE0F8" }, // Left light blue large circle (107px from center)
          { top: "30%", left: "35%", size: 20, color: "#004F82" }, // Upper left small dark blue
          
          // Bottom layout
          { top: "65%", left: "50%", size: 60, color: "#004F82" }, // Bottom dark blue circle (113.97px from center)
          { top: "68%", left: "70%", size: 60, color: "#6BE0F8" }, // Bottom right light blue (109px from bottom center)
          { top: "55%", left: "60%", size: 12, color: "#6BE0F8" }, // Small light blue dot
          { top: "60%", left: "38%", size: 18, color: "#004F82" }, // Bottom left small dark blue (10.65px from position)
          
          // Bottom corner dog image - 88x88
          { top: "68%", left: "30%", size: 88, image: "/img/login/sample-dog-2.png" },
        ].map((circle, index) =>
          circle.image ? (
            <div
              key={index}
              style={{
                position: "absolute",
                top: circle.top,
                left: circle.left,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 5,
                transform: "translate(-50%, -50%)", // Center the circle on its position
              }}
            >
              <img src={circle.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="dog" />
            </div>
          ) : (
            <div
              key={index}
              style={{
                position: "absolute",
                top: circle.top,
                left: circle.left,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                borderRadius: "50%",
                backgroundColor: circle.color,
                zIndex: 5,
                transform: "translate(-50%, -50%)", // Center the circle on its position
              }}
            />
          )
        )}
      </div>
    </div>
  );
}