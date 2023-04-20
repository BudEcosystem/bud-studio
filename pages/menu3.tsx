import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'

export default function App() {
    const count = useSelector((state: RootState) => state.counter)
    useEffect(()=>{
        console.log(count)
    },[count])
  return (
    <div>Menu 3-</div>
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}