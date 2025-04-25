export async function createNewPet(requestId: string, userId: number) {
    const res = await fetch(`/api/requests?requestId=${requestId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch request");
    
    const contentParsed = JSON.parse(data.content);
    
    // Create pet data object using contentParsed.petInfo and parameters
    const petData = {
        userId: userId,
        doctorId: data.doctorId,
        pet_picture: "dog1.svg",
        breed: contentParsed.petInfo.breed,
        age: contentParsed.petInfo.age,
        weight: contentParsed.petInfo.weight,
        sex: contentParsed.petInfo.sex.toLowerCase(),
        sterilized: contentParsed.petInfo.sterilized,
        birthdate: contentParsed.petInfo.birthdate,
        name: contentParsed.petInfo.name
    };
    
    // Post to pets API
    const petRes = await fetch('/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData)
    });
    
    const petResponseData = await petRes.json();
    if (!petRes.ok) throw new Error(petResponseData.error || "Failed to create pet");
    
    const petId = petResponseData.id;
    
    return petId;
}
