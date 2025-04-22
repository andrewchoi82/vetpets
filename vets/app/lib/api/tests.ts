export async function getTests(petId: string) {
   const res = await fetch(`/api/tests?petId=${petId}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch test results");
   return data;
 }
 
 export async function addTestResult(testData: any) {
   const res = await fetch(`/api/tests`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(testData),
   });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to add test result");
   return data;
 }
 