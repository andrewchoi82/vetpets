"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleGoToCreate = ()=>{
    router.push("/signup");
  }

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
        background: "white",
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

      {/* Left: Floating Circles with individual gradients */}
      {!isMobile && (
        <div 
          style={{ 
            flex: 1, 
            position: "relative", 
            left: 0,
            overflow: "hidden",
            background: "radial-gradient(circle at 50% 50%,rgb(192, 234, 243) 10%, white 60%)",
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
      )}

      {/* Login Panel */}
      <div style={{ 
        width: isMobile ? "100%" : "40%", 
        paddingRight: isMobile ? "0" : "16%", 
        paddingLeft: isMobile ? "24px" : "0",
        paddingTop: isMobile ? "120px" : "225px", 
        display: "flex", 
        justifyContent: isMobile ? "center" : "flex-end"
      }}>
        <div style={{ width: "321px" }}>
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

          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: "flex",
                width: "100%",
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
                width: "100%",
                height: "48px",
                padding: "15px 20px",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                border: "1px solid #DFDFDF",
                background: "#FFF",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                fontSize: "14px",
              }}
            />

            <button
              type="button"
              style={{
                display: "flex",
                width: "100%",
                height: "32px",
                justifyContent: "end",
                alignItems: "top",
                color: "#004F82",
                background: "none",
                border: "none",
                fontSize: "12px",
                cursor: "pointer",
                padding: "10px",
                marginBottom: "14px"
              }}
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              style={{
                display: "flex",
                width: "100%",
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
                marginBottom: "8px"
              }}
            >
              Login
            </button>
          </form>

          <div
            style={{
              display: "flex",
              width: "100%",
              height: "32px",
              justifyContent: "center",
              alignItems: "center",
              color: "#004F82",
              fontSize: "12px",
            }}
          >
            Don't have an account?
            <button
              onClick={handleGoToCreate}
              style={{
                marginLeft: "5px",
                color: "#004F82",
                background: "none",
                border: "none",
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
                padding: "0"
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}