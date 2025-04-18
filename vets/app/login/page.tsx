import { useState } from "react";


export default function Login() {
  return (
    <div className="w-[1512px] h-[982px] relative bg-white overflow-hidden">
    <div className="w-[559px] px-14 py-11 left-[138px] top-[225px] absolute bg-white rounded-[10px] inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="self-stretch h-14 justify-center text-black text-3xl font-['SF_Pro'] leading-[66px]">Welcome back!</div>
        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden">
            <div className="left-[11px] top-[4px] absolute justify-center text-Hoover-grey text-base font-normal font-['SF_Pro'] leading-loose">Email</div>
        </div>
        <div className="self-stretch h-12 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-Hoover-grey overflow-hidden">
            <div className="left-[11px] top-[4px] absolute justify-center text-Hoover-grey text-base font-normal font-['SF_Pro'] leading-loose">Password</div>
        </div>
        <div data-property-1="Default" className="self-stretch h-12 bg-sky-800 rounded-[10px] inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-white text-xl font-normal font-['SF_Pro'] leading-[48.40px]">Login</div>
        </div>
        <div className="self-stretch justify-center text-side-text text-xs font-normal font-['SF_Pro'] underline leading-7">Forgot your password?</div>
    </div>
    <img className="w-12 h-16 left-[62px] top-[49px] absolute" src="https://placehold.co/48x65" />
    <div className="w-32 h-10 left-[120px] top-[67px] absolute justify-center text-black text-3xl font-bold font-['Sulphur_Point'] leading-[66px]">Vetrail</div>
    <img className="w-[715px] h-96 left-[697px] top-[225px] absolute" src="https://placehold.co/715x435" />
</div>
  );
}
