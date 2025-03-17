"use client"
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React, { useEffect } from 'react'
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// NProgress.configure({
//     minimum: 0.3,
//     easing: "ease",
//     speed: 800,
//     showSpinner: false,
//   });
  
  // Router.events.on("routeChangeStart", () => NProgress.start());
  // Router.events.on("routeChangeComplete", () => NProgress.done());
  // Router.events.on("routeChangeError", () => NProgress.done());
  
  const NP = () => {
    const pathname = usePathname();
    useEffect(() => {
      // NProgress.start();

      return () => {
        // NProgress.done();
      };


    }, [pathname]);
    return (
      <ProgressBar
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
    />
    )
  }
  
  export default NP
  