"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    phoneNumber: "",
    address: "",
    sex: "Male",
    contactPreference: "Phone Call",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (!validateStep()) {
      alert("Please complete all fields before continuing.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/login");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.birthdate;
    }
    if (step === 2) {
      return (
        formData.phoneNumber &&
        formData.address &&
        formData.sex &&
        formData.contactPreference
      );
    }
    if (step === 3) {
      return (
        formData.email &&
        formData.username &&
        formData.password &&
        formData.confirmPassword
      );
    }
    return true;
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...submitData } = formData;
    
    // Clean phone number by removing all non-numeric characters
    submitData.phoneNumber = submitData.phoneNumber.replace(/\D/g, '');

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Signup successful! Please log in.");
        router.push("/login");
      } else {
        alert(`Signup failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup error occurred.");
    }
  };

  const formatBirthdate = (dateStr: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateStr).toLocaleDateString("en-US", options);
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

      {/* Signup Panel */}
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
            {step === 1 && "Create Account"}
            {step === 2 && "Tell us a bit more!"}
            {step === 3 && "Create your account!"}
            {step === 4 && "Review Your Info"}
          </div>

          {step === 1 && (
            <>
              <InputField placeholder="First Name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
              <InputField placeholder="Last Name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "#4C4C4C", fontSize: "14px" }}>When is your birthday?</label>
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleChange("birthdate", e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    border: "1px solid #DFDFDF",
                    background: "#FFF",
                    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                    fontSize: "14px",
                  }}
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <InputField placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
              <InputField placeholder="Address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "#4C4C4C", fontSize: "14px" }}>Sex</label>
                <select
                  value={formData.sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    border: "1px solid #DFDFDF",
                    background: "#FFF",
                    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                    fontSize: "14px",
                  }}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "#4C4C4C", fontSize: "14px" }}>Contact Preference</label>
                <select
                  value={formData.contactPreference}
                  onChange={(e) => handleChange("contactPreference", e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    border: "1px solid #DFDFDF",
                    background: "#FFF",
                    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                    fontSize: "14px",
                  }}
                  required
                >
                  <option value="Phone Call">Phone Call</option>
                  <option value="Text Message">Text Message</option>
                  <option value="Email">Email</option>
                  <option value="No Preference">No Preference</option>
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <InputField placeholder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
              <InputField placeholder="Username" value={formData.username} onChange={(e) => handleChange("username", e.target.value)} />
              <InputField placeholder="Password" type="password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} />
              <InputField placeholder="Confirm Password" type="password" value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} />
            </>
          )}

          {step === 4 && (
            <div style={{ color: "#4C4C4C", fontSize: "14px", lineHeight: "1.5" }}>
              <p><strong>Full Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Birthdate:</strong> {formatBirthdate(formData.birthdate)}</p>
              <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Sex:</strong> {formData.sex}</p>
              <p><strong>Contact Preference:</strong> {formData.contactPreference}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Username:</strong> {formData.username}</p>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", gap: "16px" }}>
            <button
              onClick={handleBack}
              style={{
                height: "48px",
                padding: "0 20px",
                borderRadius: "10px",
                background: step === 1 ? "#DFDFDF" : "#004F82",
                color: "white",
                fontSize: "16px",
                fontWeight: 500,
                border: "none",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
            >
              {step === 1 ? "Back to Login" : "Back"}
            </button>

            {step < 4 && (
              <button
                onClick={handleNext}
                style={{
                  height: "48px",
                  padding: "0 20px",
                  borderRadius: "10px",
                  background: "#004F82",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                  border: "none",
                  boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                onClick={handleSubmit}
                style={{
                  height: "48px",
                  padding: "0 20px",
                  borderRadius: "10px",
                  background: "#004F82",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                  border: "none",
                  boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        height: "48px",
        padding: "15px 20px",
        borderRadius: "10px",
        border: "1px solid #DFDFDF",
        background: "#FFF",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
        marginBottom: "16px",
        fontSize: "14px",
      }}
      required
    />
  );
}
