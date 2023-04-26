import React, { useEffect, useState } from "react";

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
