import React from 'react';
import { Authentication } from './page/Authentication';
import { Home } from './page/Home'
import { Single } from './page/Single'
import { Multi } from './page/Multi'
import { Setting } from './page/Setting'


import { Route, Routes, useNavigate } from 'react-router-dom'

export function Wrapper () {
  const navigate = useNavigate();
  let url = window.location.href;
  url = url.split('/')
  React.useEffect(function () {
    navigate('/authentication')
  }, [])
  return (
    <Routes>
      <Route path="/authentication" element={<Authentication/>}/>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/single" element={<Single/>}></Route>
      <Route path="/multi" element={<Multi/>}></Route>
      <Route path="/setting" element={<Setting/>}></Route>

    </Routes>

  );
}
