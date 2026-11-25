/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollyAnatomy } from './components/ScrollyAnatomy';
import { MenuSection } from './components/MenuSection';
import { LocationsSection } from './components/LocationsSection';
import { ZelenogradskSection } from './components/ZelenogradskSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div
      id="top"
      style={{
        background: '#121214',
        color: '#EDE8E1',
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize: '16px',
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
      }}
      data-canvas-width="1440"
      data-canvas-height="6200"
      data-document-role="page"
      data-label="Дюна — сайт"
    >
      {/* 1. HEADER */}
      <Header />

      {/* 2. HERO */}
      <Hero />

      {/* 3. SCROLLYTELLING */}
      <ScrollyAnatomy />

      {/* 4. MENU */}
      <MenuSection />

      {/* 5. LOCATIONS */}
      <LocationsSection />

      {/* 6. ZELENOGRADSK + OPT-IN */}
      <ZelenogradskSection />

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
}
