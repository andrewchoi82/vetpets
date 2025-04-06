
interface HeaderProps {
   functionName: string;
   content: string[];
}

export const MessageHeaderBox = ({functionName, content} : HeaderProps) => {

   return(
      <div style={{
         display: "flex",
         backgroundColor: "white",
         width: "700px",
         padding: "20px 30px",
         borderRadius: "20px",
         alignItems: "center",
         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
         margin: "10px"
       }}>
         {functionName === "to" ? (
            <div>
               <span style={{ fontWeight: "bold", fontSize: "18px", marginRight: "10px" }}>
                  To:
               </span>
               {content.map((item, index) => (
                  <span key={index} style={{ fontSize: "18px", marginRight: "5px" }}>
                     {item}{index < content.length - 1 ? "," : ""}
                  </span>
               ))}
            </div>
         
         ) : functionName === "subject" ? (
            <div>
               <span style={{ fontWeight: "bold", fontSize: "18px", marginRight: "10px" }}>
                  Subject:
               </span>

               {content.map((item, index) => (
                  <span key={index} style={{ fontSize: "18px", display: "block" }}>
                     {item}
                  </span>
               ))}
            </div>
         ) : null}
      </div>
   )
}