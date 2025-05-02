import Image from "next/image";



export const SearchBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        padding: "10px 15px",
        width: "320px",
        backgroundColor: "#fff",
        
      }}
      className=" rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)]"
    >
      <Image
        src="/img/header/search-bar-icon.svg"
        alt="Search"
        width={18}
        height={18}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Search"
        style={{
          border: "none",
          outline: "none",
          fontSize: "16px",
          width: "100%",
        }}
      />
    </div>
  );
};
