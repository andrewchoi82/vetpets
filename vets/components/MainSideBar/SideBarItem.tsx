import Image from "next/image";

type SideBarItemProps = {
  path: string;
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  notificationCount?: number;
};

export const SideBarItem = ({
  path,
  text,
  isSelected = false,
  onClick,
  notificationCount = 0,
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
        padding: "22px 40px",
        backgroundColor: isSelected ? "#E9EFF4" : "transparent",
        color: "#4c4c4c",
        cursor: "pointer",
        width: "100%",
        borderRight: isSelected ? "4px solid #004D81" : "4px solid transparent",
        transition: "all 0.2s ease",
      }}
    >
      <Image
        src={imagePath}
        alt={text}
        width={15}
        height={15}
        style={{
          marginRight: "12px",
        }}
      />

      <p style={{ margin: 0, fontSize: "15px", flexGrow: 1 }}>{text}</p>

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
          }}
        >
          {notificationCount}
        </div>
      )}
    </div>
  );
};
