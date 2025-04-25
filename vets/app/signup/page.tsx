"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    phoneNumber: "",
    address: "",
    sex: "Male",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleNext = () => {
    if (!validateStep()) {
      alert("Please complete all fields before continuing.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.birthdate;
    }
    if (step === 2) {
      return formData.phoneNumber && formData.address && formData.sex;
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
    <div className="w-[1512px] h-[982px] relative bg-white overflow-hidden">
      <div className="w-[559px] px-14 py-11 left-[138px] top-[225px] absolute bg-white rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-14 justify-center text-black text-3xl font-['SF_Pro'] leading-[66px]">
          {step === 1 && "Let's get to know you!"}
          {step === 2 && "Tell us a bit more!"}
          {step === 3 && "Create your account!"}
          {step === 4 && "Review Your Info"}
        </div>

        {step === 1 && (
          <>
            <InputField placeholder="First Name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
            <InputField placeholder="Last Name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
            <div className="w-full flex flex-col gap-2">
              <label className="text-black text-base font-['SF_Pro'] mb-1">When's your birthday?</label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value)}
                className="w-full h-12 px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline outline-1 rounded-[10px] outline-Hoover-grey"
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <InputField placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
            <InputField placeholder="Address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
            <select
              value={formData.sex}
              onChange={(e) => handleChange("sex", e.target.value)}
              className="w-full h-12 px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline outline-1 rounded-[10px] outline-Hoover-grey"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
          <div className="w-full text-base text-Hoover-grey font-['SF_Pro'] leading-7">
            <p><strong>Full Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Birthdate:</strong> {formatBirthdate(formData.birthdate)}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Sex:</strong> {formData.sex}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Username:</strong> {formData.username}</p>
          </div>
        )}

        <div className="w-full flex justify-between mt-4">
        <button
          onClick={() => {
            if (step === 1) {
              router.push("/login");
            } else {
              handleBack();
            }
          }}
          className="h-12 bg-gray-300 rounded-[10px] text-white text-xl px-6"
        >
          Back
        </button>

          {step < 4 && (
            <button
              onClick={handleNext}
              className="h-12 bg-sky-800 rounded-[10px] text-white text-xl px-6"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              className="h-12 bg-sky-800 rounded-[10px] text-white text-xl px-6"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      <img className="w-12 h-16 left-[62px] top-[49px] absolute" src="/img/vetrail-logo.svg" />
      <div className="w-32 h-10 left-[120px] top-[55px] absolute justify-center text-black text-3xl font-bold font-['Sulphur_Point'] leading-[66px]">
        Vetrail
      </div>
      <img className="w-[715px] h-96 left-[697px] top-[225px] absolute" src="/img/login/login-image.svg" />
    </div>
  );
}

function InputField({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
      />
    </div>
  );
}
