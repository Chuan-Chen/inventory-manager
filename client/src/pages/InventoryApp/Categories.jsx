import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Global from "../../styles/Global";
const Page = styled.div`
    ${Global.Animations.SlideInTop}

    height: 100%;
    width: 100%;

    display: grid;
    align-items: center;
    justify-content: center;



`
export default function Categories(){


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(authSlice.actions.checkToken());
  },[]);

    return (
        <Page>
            Categories
        </Page>
    )
}