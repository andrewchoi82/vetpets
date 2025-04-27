"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function signup(credentials: { email: string; password: string; username: string }) {
    const res = await fetch(`/api/auth/signup`, {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Signup failed");
    return data;
  }
  

  const handleCreate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const result = await signup({ email, password, username });
  
      if (!result.success) {
        alert("Signup failed: " + (result.error || "Unknown error"));
        return;
      }
  
      alert("Signup Success! Please log in.");
      router.push("/login");  
  
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup error occurred.");
    }
  };
  
  
  

  return (
    <div className="w-[1512px] h-[982px] relative bg-white overflow-hidden">
      <div className="w-[559px] px-14 py-11 left-[138px] top-[225px] absolute bg-white rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-14 justify-center text-black text-3xl font-['SF_Pro'] leading-[66px]">
          Create an Account!
        </div>

        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
          />
        </div>

        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
          />
        </div>

        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
          />
        </div>

        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
          />
        </div>

        <div
          onClick={handleCreate}
          className="self-stretch h-12 bg-sky-800 rounded-[10px] inline-flex justify-center items-center gap-2.5 cursor-pointer"
        >
          <div className="text-center justify-center text-white text-xl font-normal font-['SF_Pro'] leading-[48.40px]">
            Sign up
          </div>
        </div>

        <div style={{ display: "flex" }}> 
          <button
            onClick={() => router.push("/login")}
            type="button"
            className="justify-center text-side-text text-xs font-normal font-['SF_Pro'] underline leading-7 cursor-pointer"
          >
            Already have an account?
          </button>
        </div>

      </div>

      <img
        className="w-12 h-16 left-[62px] top-[49px] absolute"
        src="/img/vetrail-logo.svg"
      />
      <div className="w-32 h-10 left-[120px] top-[55px] absolute justify-center text-black text-3xl font-bold font-['Sulphur_Point'] leading-[66px]">
        Vetrail
      </div>
      <img
        className="w-[715px] h-96 left-[697px] top-[225px] absolute"
        src="/img/login/login-image.svg"
      />
    </div>
  );
}
