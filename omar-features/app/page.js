// app/page.js

import Header from "./components/sections/Header";
import CategoryIconsSection from "./components/sections/CategoryIconsSection";
import ExclusiveOffersSection from "./components/sections/ExclusiveOffersSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#ffffff] text-[#060010]">
                  <Header />
                  <CategoryIconsSection />
                   <ExclusiveOffersSection />   
    </main>
  );
}
