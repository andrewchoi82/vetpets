interface ProgressBarProps {
   step: number;
   style?: React.CSSProperties;
 }
 
 export default function ProgressBar({ step, style }: ProgressBarProps) {
   const totalSteps = 3;
   const circleSize = 20;
   const totalWidth = 408;
   const lineCount = totalSteps - 1;
 
   const lineWidth = (totalWidth - circleSize * totalSteps) / lineCount;
 
   return (
     <div
       style={{
         width: `${totalWidth}px`,
         height: "21px",
         ...style
       }}
       className="flex items-center"
     >
       {[...Array(totalSteps)].map((_, index) => (
         <div key={index} className="flex items-center">
           {/* Circle */}
           <div
             className={`w-5 h-5 rounded-full ${
               index <= step - 1 ? "bg-[#1E4A7E]" : "bg-[#d4d4d4]"
             }`}
           />
 
           {/* Line (render only if not the last circle) */}
           {index < totalSteps - 1 && (
             <div
               style={{
                 width: `${lineWidth}px`,
                 height: "4px",
               }}
               className={`${
                 index < step - 1 ? "bg-[#1E4A7E]" : "bg-[#d4d4d4]"
               }`}
             />
           )}
         </div>
       ))}
     </div>
   );
 }
 