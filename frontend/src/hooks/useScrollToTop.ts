import { useEffect } from "react";

export function useScrollToTop() {
    const pathName = window.location.pathname;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName]);
}