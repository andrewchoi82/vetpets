"use client";
import React, { useEffect, useState, KeyboardEvent, useRef } from 'react'
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from 'js-cookie';



export default function GetPet() {
  const [showPetIdField, setShowPetIdField] = useState(false);
  const [petId, setPetId] = useState("");
  const router = useRouter();

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

  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (currId) {
      fetch(`/api/pets/petsByUser?userId=${currId}`)
        .then(response => response.json())
        .then(data => {
          setPets(data);
        })
        .catch(error => {
          console.error("Error fetching pets:", error);
        });
    }
  }, [currId]);

  const handlePetSelection = (petId: number) => {
    // Find the selected pet
    const selectedPet = pets.find(pet => pet.petId === petId);
    if (selectedPet) {
      console.log(`Selected pet: ${selectedPet.name}`);
      Cookies.set('petId', selectedPet.petId.toString(), { expires: 7 }); // Expires in 7 days

    }


    router.push("/");
  };

  const handleAddNewPet = () => {
    setShowPetIdField(true);
  };

  const handleSubmitPetId = () => {
    if (petId.trim()) {
      router.push("/");
    } else {
      alert("Please enter a valid Pet ID");
    }
  };

  return (
    <div className= "w-[1512px] h-[982px] relative bg-white overflow-hidden">
      <div className="w-12 h-16 left-[62px] top-[49px] absolute">
        <Image
          src="/img/vetrail-logo.svg"
          alt="Vetrail Logo"
          width={48}
          height={64}
        />
      </div>
      <div className="w-32 h-10 left-[120px] top-[55px] absolute justify-center text-black text-3xl font-bold font-['Sulphur_Point'] leading-[66px]">
        Vetrail
      </div>

      <div className="w-[559px] px-14 py-11 left-[138px] top-[225px] absolute bg-white rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-14 justify-center text-black text-3xl font-['SF_Pro'] leading-[66px]">
          Choose your pet
        </div>

        <div className="self-stretch flex flex-wrap gap-4">
          {
            pets.map(pet => (
              <div 
                key={pet.petId}
                onClick={() => handlePetSelection(pet.petId)}
                className="w-[120px] h-[120px] bg-sky-100 rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-sky-200"
              >
                <div className="text-center text-sky-800 text-xl font-normal font-['SF_Pro']">
                  {pet.name}
                </div>
              </div>
            ))
          }

          <div 
            onClick={handleAddNewPet}
            className="w-[120px] h-[120px] bg-gray-100 rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-200"
          >
            <div className="text-center text-gray-800 text-xl font-normal font-['SF_Pro']">
              Add new pet
            </div>
          </div>
        </div>

        {
          showPetIdField && (
            <div className="self-stretch flex items-center gap-4">
              <div className="flex-grow h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden flex items-center">
                <input
                  type="text"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  placeholder="Enter pet ID"
                  className="w-full h-full px-4 text-base text-Hoover-grey font-['SF_Pro'] bg-transparent outline-none"
                />
              </div>
              <div
                onClick={handleSubmitPetId}
                className="h-12 px-4 bg-sky-800 rounded-[10px] inline-flex justify-center items-center cursor-pointer"
              >
                <div className="text-center text-white text-xl font-normal font-['SF_Pro']">
                  Submit
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div className="w-[715px] h-96 left-[697px] top-[225px] absolute">
        <Image
          src="/img/login/login-image.svg"
          alt="Pet Selection Image"
          width={715}
          height={384}
        />
      </div>
    </div>
  );
}
