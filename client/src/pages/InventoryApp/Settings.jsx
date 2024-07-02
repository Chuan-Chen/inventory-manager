import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch } from "react-redux";
const Page = styled.div`
/* ----------------------------------------------
 * Generated by Animista on 2024-7-1 18:2:47
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}


	-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    height: 100%;
    width: 100%;

    display: grid;
    align-items: center;
    justify-content: center;



`
export default function Settings(){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(authSlice.actions.checkToken());
    },[]);

    return (
        <Page>
            Settings
        </Page>
    )
}