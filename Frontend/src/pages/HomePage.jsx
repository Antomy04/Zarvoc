import React from "react";
import "./HomePage.css";
import Header from "../UserComponents/Header";
import PromotionalBanner from "../UserComponents/PromotionalBanner";
import BestSellers from "../UserComponents/BestSellers";
import TopPicks from "../UserComponents/TopPicks";
import ShowcaseSection from "../UserComponents/ShowCase";
import TrendingSection from "../UserComponents/TrendingSection";
import Promotional from "../UserComponents/Promotional";
import CustomerReview from "../UserComponents/CustomerReview";
import Footer from "../UserComponents/Footer";

function HomePage() {
    return(
        <div className="homepage-container">
            <Header />
            <div className="homepage-content ">
                <div className="homepage-section">
                    <PromotionalBanner />
                    {/* <BestSellers /> */}              
                    <BestSellers />
                    <TopPicks />
                    <ShowcaseSection />
                    <TrendingSection />
                    <Promotional />
                    <CustomerReview />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;