"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function CreatePet() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

      const [petId, setPetId] = useState("");
      const currId = Cookies.get('userId');


    interface Pet {
        petId: number;
        pet_picture: string;
        breed: string;
        age: string;
        weight: number;
        gender: string;
        sterilized: boolean;
        birthdate: string;
        name: string;
        userId: string;
        doctorId: string;
      }

    const handleGoToCreate = () => {
        router.push("/signup");
    }

    const handleSubmitPetId = async () => {
        if (!petId.trim()) {
          alert("Please enter a valid Pet ID");
          return;
        }
    
        try {
          console.log('Attempting to create pet with:', {
            requestId: petId,
            userId: currId
          });
    
          const response = await fetch(`/api/pet-creation?requestId=${petId}&userId=${currId}`);
          const data = await response.json();
    
          if (!response.ok) {
            console.error('Pet creation failed:', {
              status: response.status,
              statusText: response.statusText,
              error: data
            });
            throw new Error(data.error || 'Failed to create pet');
          }
    
          if (data.petId) {
            console.log('Pet created successfully with ID:', data.petId);
            Cookies.set('petId', data.petId.toString(), { expires: 7 }); // Expires in 7 days
            router.push("/");
          } else {
            console.error('No petId in response:', data);
            throw new Error('No petId received from server');
          }
        } catch (error: any) {
          console.error('Error in handleSubmitPetId:', {
            message: error.message,
            stack: error.stack,
            petId,
            currId
          });
          alert(`Failed to create pet: ${error.message}`);
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

            {/* Login Panel */}

                <div className="flex flex-col w-125 h-96 mt-[30vh] mr-30 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] border-[1px] border-[#DFDFDF] p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={() => router.push("/getpet")}
                        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="text-[#4C4C4C] text-Text-Main text-4xl font-semibold leading-[77px] mb-4">
                        Connect your pet
                    </div>
                    
                    <div className="text-Text-Main text-lg font-normal text-[#4C4C4C] leading-9 mb-6">
                        First, please enter your pet's pin number that your vet has provided.
                    </div>
                    
                    <input
                      type="pinNum"
                      placeholder="Pin Number"
                      value={petId}
                      onChange={(e) => setPetId(e.target.value)}
                      className="w-full h-12 px-5 py-3.5 rounded-[10px] border border-[#DFDFDF] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] text-sm mb-2"
                    />

                    <div className="flex justify-end w-full mb-5">
                      <button
                        className="text-[#004F82] bg-transparent border-none text-xs cursor-pointer"
                      >
                        Add Pet
                      </button>
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        onClick={handleSubmitPetId}
                        className="w-32 h-12 px-5 py-3.5 bg-sky-800 rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] text-white text-base font-normal cursor-pointer">
                        Connect
                      </button>
                    </div>
                </div>
        </div>
    );
}