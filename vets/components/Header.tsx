import Image from "next/image";

export const Header = () => {

   return(
      <header style={{display: "flex", justifyContent: "space-evenly", marginTop: "20px", paddingTop: "20px"}}>
         <p style={{fontSize: "25px", marginLeft: "220px", fontWeight: "semi-bold"}}>Dashboard</p>

         <div style={{display: "flex", marginLeft: "auto", marginRight: "15px", marginTop: "10px"}}>

            <Image
               src="/img/header/reminder-icon.svg"
               alt="Reminder Icon"
               width={25}
               height={25}
               style={{marginRight: "20px", marginTop: "13px"}}
            />

            <Image
               src="/img/header/doge.png"
               alt="Profile Picture"
               width={50}
               height={50}
               style={{
                  objectFit: "cover",
                  borderRadius: "50%", 
               }} 
            />

            <div style={{display: "flex", flexDirection: "column", marginLeft: "10px", marginTop: "-10px", marginRight: "20px"}}>
               <p style={{fontWeight: "500", marginBottom: "3px"}}>Snowball</p>
               <p style={{marginTop: "0", fontSize: "14px", color: "#919191"}}>Jane Smith</p>
            </div>

            
         </div>
      </header>
   )

}