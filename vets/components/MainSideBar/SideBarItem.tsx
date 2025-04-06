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
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "22px 40px",
        backgroundColor: isSelected ? "#E9EFF4" : "transparent",
        color: isSelected ? "#004D81" : "#444",
        fontWeight: isSelected ? "600" : "400",
        cursor: "pointer",
        width: "100%", 
        borderRight: isSelected ? "4px solid #004D81" : "4px solid transparent",
        transition: "all 0.2s ease",
      }}
    >
      <Image
        src={path}
        alt={text}
        width={18}
        height={18}
        style={{
          marginRight: "12px",
          filter: isSelected ? "none" : "grayscale(100%)",
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
