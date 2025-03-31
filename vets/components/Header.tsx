import Image from "next/image";

interface HeaderProps {
   title: string;
}

export const Header = ({ title }: HeaderProps) => {
   return(
      <header style={{display: "flex", justifyContent: "space-evenly", marginTop: "20px", paddingTop: "20px", maxWidth: "1400px", marginLeft: "250px", alignItems: "center"}} className="2xl:ml-[350px]">
         <p style={{fontSize: "35px", fontWeight: "bold"}}>{title}</p>

         <div style={{display: "flex", marginLeft: "auto", marginRight: "15px", alignItems: "center"}}>

            <Image
               src="/img/header/reminder-icon.svg"
               alt="Reminder Icon"
               width={25}
               height={25}
               style={{marginRight: "20px"}}
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

            <div style={{display: "flex", flexDirection: "column", marginLeft: "10px", marginRight: "20px"}}>
               <p style={{fontWeight: "500", marginBottom: "3px"}}>Snowball</p>
               <p style={{marginTop: "0", fontSize: "14px", color: "#919191"}}>Jane Smith</p>
            </div>

            
         </div>
      </header>
   )

}