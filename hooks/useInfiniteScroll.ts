import { useEffect, useRef } from "react";

// Params
// 1. fetchData => function to fetching data when user view in bottom window
// 2. fetchDataTrigger => trigger to execute fetchData param, like hasMore data

export function useInfiniteScroll(fetchData: () => void, fetchDataTrigger: boolean) {
    const loaderTriggerComponent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && fetchDataTrigger) {
                    fetchData();
                }
            },
            {
                root: null,
                rootMargin: "100px",
                threshold: 0.1,
            },
        );

        const currentLoader = loaderTriggerComponent.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [fetchData, fetchDataTrigger]);

    return { loaderTriggerComponent }
}