import React, { useEffect, useState } from "react";
import OmniSearch from "../components/OmniSearch/OmniSearch";

export default function App() {
  

  return (
    <>
      <div>Menu 1</div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
