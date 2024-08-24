import React from 'react';
import { Authentication } from './page/Authentication';
import { Home } from './page/Home'
import { Create } from './page/Create'
import { Room } from './page/Room';
import { Setting } from './page/Setting'
import { Join } from './page/Join'

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
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/setting" element={<Setting/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
      <Route path="/room/:id" element={<Room/>}></Route>

    </Routes>

  );
}
