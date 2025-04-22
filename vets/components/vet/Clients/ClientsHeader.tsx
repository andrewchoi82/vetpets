
"use client";
import React from "react";
import Image from "next/image";
import { SearchBar } from "@/components/MainHeader/SearchBar";


export default function ClientsHeader() {
  return (
    <div style={{ marginLeft: 40, marginTop: 20, marginBottom: 10 }}>   
      <SearchBar/>
    </div>
  );
}
