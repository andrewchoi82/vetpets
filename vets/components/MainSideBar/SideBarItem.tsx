import Image from "next/image";

type SideBarItemProps = {
  path: string;
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  notificationCount?: number;
  iconsOnly?: boolean;
};

export const SideBarItem = ({
  path,
  text,
  isSelected = false,
  onClick,
  notificationCount = 0,
  iconsOnly = false,
}: SideBarItemProps) => {
  const imagePath = isSelected
    ? path.replace("nonSelectedVersion", "selectedVersion")
    : path;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: iconsOnly ? "center" : "flex-start",
        padding: iconsOnly ? "22px 0" : "22px 40px",
        backgroundColor: isSelected ? "#E9EFF4" : "transparent",
        color: "#4c4c4c",
        cursor: "pointer",
        width: "100%",
        borderRight: isSelected ? "4px solid #004D81" : "4px solid transparent",
        transition: "all 0.2s ease",
        position: iconsOnly ? "relative" : "static",
      }}
    >
      <Image
        src={imagePath}
        alt={text}
        width={15}
        height={15}
        style={{
          marginRight: iconsOnly ? 0 : "12px",
        }}
      />

      {!iconsOnly && (
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            flexGrow: 1,
            color: isSelected ? "#004D81" : "#4c4c4c",
            fontWeight: isSelected ? 500 : 400,
          }}
        >
          {text}
        </p>
      )}

      {notificationCount > 0 && (
        <div
          style={{
            backgroundColor: "#004D81",
            color: "#fff",
            fontSize: "12px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
            position: iconsOnly ? "absolute" : "relative",
            right: iconsOnly ? "12px" : "auto",
          }}
        >
          {notificationCount}
        </div>
      )}
    </div>
  );
};
