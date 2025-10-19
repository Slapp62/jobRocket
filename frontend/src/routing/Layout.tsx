import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navigation/Header.tsx";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import {Footer} from '../components/Navigation/Footer.tsx';
import { useAuthInit } from "@/hooks/UseAuthInit.ts";
import { fetchCardsThunk } from "@/store/cardSlice.tsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "@/hooks/useScrollToTop.ts";
import { useMediaQuery } from "@mantine/hooks";
import { MobileBottomNav } from "@/components/Navigation/MobileNav.tsx";
import { RootState } from "@/store/store.ts";


export function Layout() {
    // refresh all cards in redux when visitin hompage
    const dispatch = useDispatch();
    const location = useLocation();
    const fetchedRef = useRef(false);
    const isMobile = useMediaQuery('(max-width: 700px)');
    const isBusiness = useSelector((state:RootState) => state.userSlice.user?.isBusiness);
    
    useEffect(() => {
        if (location.pathname === '/' 
            || location.pathname.startsWith('/card-details') 
            || location.pathname.startsWith('/my-listings')
          ) 
        {
            if (!fetchedRef.current) {
                dispatch(fetchCardsThunk() as any);
                fetchedRef.current = true;
            }
        } else {
            fetchedRef.current = false;
        }
    }, [location.pathname, dispatch]);
    
    // persist log in between sessions
    useAuthInit();

    //ensure top scrolled on page change
    useScrollToTop();

    return (
      <>
        <Flex direction='column' mih='100vh'>
          
            <Navbar />
            
            <main style={{flex: 1, margin: 0, }}>
            <Outlet />
            </main>
            
            <Footer/>

            {isMobile && isBusiness && <MobileBottomNav/>}

            <ToastContainer 
                position={isMobile ? "top-right" : "bottom-right"}
                toastClassName="custom-toast"
                newestOnTop={!isMobile}
                theme="light"
                autoClose={3000}
                closeOnClick
            />
        </Flex>
      </>
    );
  }