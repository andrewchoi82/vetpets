import Image from "next/image"

export const ClientsProfile = () => {

   return (

      <div style={{ display:"flex" }}>
         <Image
            src="/img/header/doge.png"
            alt="Profile Picture"
            width={40}
            height={40}
            style={{
            objectFit: "cover",
            borderRadius: "50%",
            overflow: "hidden",
            aspectRatio: "1/1",
            }}
         />

         <div style={{ display:"flex" }}>
            <h6>Jane Doe</h6>
            <p>Snowball</p>
         </div>

         <div style={{ display:"flex" }}>
            <h6>Phone Number</h6>
            <p>424-628-3290</p>
         </div>

         <div style={{ display:"flex" }}>
            <h6>Email</h6>
            <p>janedoe@gmail.com</p>
         </div>

         <div style={{ display:"flex" }}>
            <h6>Contact preference</h6>
            <p>Text</p>
         </div>
      </div>
   )

}