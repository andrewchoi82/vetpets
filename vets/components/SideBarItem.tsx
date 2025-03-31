import Image from "next/image";

type SideBarItemProps = {
   path: string;
   text: string;
   isSelected?: boolean;
   onClick?: () => void;
};

export const SideBarItem = ({ path, text, isSelected = false, onClick }: SideBarItemProps) => {
   return (
      <div 
         onClick={onClick}
         style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "10px",
            padding: "12px 0",
            backgroundColor: isSelected ? "#004D81" : "transparent",
            color: isSelected ? "white" : "black",
            borderRadius: "10px",
            cursor: "pointer"
         }}
      >
         <Image
            src={path}
            alt={text} 
            width={20} 
            height={20}
            style={{ 
               marginRight: "13px", 
               marginLeft: "13px",
               filter: isSelected ? "brightness(0) invert(1)" : "none" // Makes icon white when selected
            }} 
         />
         <p style={{ margin: 0 }}>{text}</p>
      </div>
   );
};