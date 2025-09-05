"use client";
import { useState } from "react";
import GmailSection from "./GmailSection";
import PasswordSection from "./PasswordSection";

const SignUpField = () => {
  const [page, setPage] = useState("gmail");

  return (
    <div>
      {page === "gmail" ? (
        <GmailSection setPage={setPage} />
      ) : (
        <PasswordSection setPage={setPage} />
      )}
    </div>
  );
};

export default SignUpField;
