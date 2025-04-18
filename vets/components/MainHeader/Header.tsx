import Image from "next/image";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  title: string;
  showSearchBar: boolean;
}

export const Header = ({ title, showSearchBar }: HeaderProps) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "40px 30px",
        paddingTop: "40px",
        paddingBottom: "20px",

        borderBottom: "1px solid #E5E5E5",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ fontSize: "30px", fontWeight: "500" }}>{title}</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {showSearchBar && <SearchBar />}

        <Image
          src="/img/header/reminder-icon.svg"
          alt="Reminder Icon"
          width={24}
          height={24}
        />

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
      </div>
    </header>
  );
};
