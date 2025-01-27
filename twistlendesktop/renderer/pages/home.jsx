import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Admin from "../pages/config/utils/Admin";
export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc.on("message", (message) => {
      setMessage(message);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-javascript)</title>
      </Head>

      <Admin />
    </React.Fragment>
  );
}
