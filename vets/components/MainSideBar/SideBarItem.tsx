import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface SideBarItemProps {
  path: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
  notificationCount?: number;
}

export const SideBarItem = ({
  path,
  text,
  isSelected,
  onClick,
  notificationCount = 0,
}: SideBarItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const highlightColor: string = isSelected ? "#EEF3F8" : isHovered ? "#f5f8fa" : "transparent";
  const textColor: string = isSelected ? "#0A4B94" : "#767676";
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: highlightColor,
        borderRadius: "10px",
        padding: "8px 4px",
        marginBottom: "6px",
        cursor: "pointer",
        width: "calc(100% - 10px)",
        marginLeft: "5px",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        justifyContent: "center",
        position: "relative",
        marginTop: "20px",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {/* Icon */}
      <div style={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        position: "relative",
        flexShrink: 0
      }}>
        <Image
          src={isSelected ? path.replace('/nonSelectedVersion/', '/selectedVersion/') : path}
          width={20}
          height={20}
          alt={text}
          style={{ 
            width: "18px",
            height: "18px"
          }}
        />
        {notificationCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              backgroundColor: "#d9331a",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            {notificationCount}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {isMounted && (
        <div 
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: "calc(100% + 12px)",
            top: "50%",
            transform: `translateY(-50%) scale(${isHovered ? 1 : 0.8})`,
            backgroundColor: "white",
            color: textColor,
            padding: "6px 12px",
            borderRadius: "6px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            fontWeight: isSelected ? 600 : 400,
            whiteSpace: "nowrap",
            zIndex: 1000,
            opacity: isHovered ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transformOrigin: "left center",
            pointerEvents: "none",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};
