export async function parsePdf(file: File) {
   const formData = new FormData();
   formData.append("file", file);
 
   const res = await fetch(`/api/parse-pdf`, {
     method: "POST",
     body: formData,
   });
 
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to parse PDF");
   return data;
 }