
interface MessageProps {
   message : string;
   setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const MessageMain = ({message, setMessage} : MessageProps) => {

   return(
      <textarea
         value={message}
         onChange={(e) => setMessage(e.target.value)}

         style={{
            display: "flex",
            backgroundColor: "white",
            width: "700px",
            height: "500px",
            padding: "20px 30px",
            borderRadius: "20px",
            alignItems: "center",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            margin: "10px",
            fontSize: "16px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            outline: "none",
            resize: "none",
            verticalAlign: "top",
            lineHeight: "1.5",
         }}
      />
   )
}