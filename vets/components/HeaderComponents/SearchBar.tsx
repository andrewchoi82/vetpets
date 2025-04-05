import Image from "next/image";

export const SearchBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "9999px",
        padding: "10px 15px",
        width: "500px",
        backgroundColor: "#fff",
      }}
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
