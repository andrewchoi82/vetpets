"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  
    const result = await res.json();
  
    if (!result.success || !result.userId) {
      alert("Invalid email or password");
      return;
    }
  
    // 🔁 Step 2: Get the user data using the userId
    const userRes = await fetch(`/api/users/${result.userId}`);
    const user = await userRes.json();
  
    if (user?.userType === 2) {
      router.push("/vet");
    } else {
      router.push("/");
    }
  };
  
  

  return (
    <div className="w-[1512px] h-[982px] relative bg-white overflow-hidden">
      <div className="w-[559px] px-14 py-11 left-[138px] top-[225px] absolute bg-white rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-14 justify-center text-black text-3xl font-['SF_Pro'] leading-[66px]">
          Welcome back!
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
          />
        </div>

        <div
          onClick={handleLogin}
          className="self-stretch h-12 bg-sky-800 rounded-[10px] inline-flex justify-center items-center gap-2.5 cursor-pointer"
        >
          <div className="text-center justify-center text-white text-xl font-normal font-['SF_Pro'] leading-[48.40px]">
            Login
          </div>
        </div>

        <div className="self-stretch justify-center text-side-text text-xs font-normal font-['SF_Pro'] underline leading-7 cursor-pointer">
          Forgot your password?
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
