import { useEffect, useRef } from "react";
import { throttle } from "../utils/throttle.ts";

export const useInfiniteScroll = (currentPage: number, loading: boolean, pages: number, onScroll: () => void) => {
  const elementRef = useRef(null);

  useEffect(() => {
    function loadMoreHandle() {
      if (currentPage < pages && !loading) {
        onScroll();
      }
    }

    const throttledLoadMore = throttle(loadMoreHandle, 5000);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && currentPage < pages && elementRef.current) {
        throttledLoadMore();
      }
    }, { root: null, threshold: 0.3, rootMargin: "0px" });

    if (elementRef.current && pages > 1) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
        observer.disconnect();
      }
    }
  }, [currentPage, loading, pages]);

  return elementRef;
};