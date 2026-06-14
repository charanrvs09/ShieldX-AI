"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Dashboard from "../components/Dashboard";
import Scanner from "../components/Scanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <Scanner />

      <Dashboard />

      <Footer />
    </main>
  );
}