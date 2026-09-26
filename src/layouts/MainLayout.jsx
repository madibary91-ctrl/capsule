import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { initLenis } from "../lib/lenis";
import PreloaderII from "../components/Preloader/PreloaderII";
import ReserveBtn from "../components/Buttons/ReserveBtn";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";
import FooterTitle from "../components/Footer/FooterTitle";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
    useEffect(() => {
        const lenis = initLenis();

        // Sync Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <PreloaderII />
            <Logo />
            <ReserveBtn />
            <Navbar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <Outlet />
                        <Footer />
                        <FooterTitle />
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
