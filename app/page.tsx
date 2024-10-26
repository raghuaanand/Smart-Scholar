"use client";

import { Button } from "@/components/ui/button";
import { FrequentlyAsked } from "@/components/frequently";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import Link from "next/link";
import React from "react";
import FeaturedTools from "@/components/featuredTools";
import AdditionalResources from "@/components/additionalResources";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-12">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 text-center md:mt-[140px] mt-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Empower Your Work with Smart Scholar
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover our range of tools designed to simplify your work, enhance
          learning, and boost productivity.
        </p>
        <Link href="#tools">
          <Button className="text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Get Started for Free
          </Button>
        </Link>
      </section>

      {/* Main Tools Section */}
      <section id="tools" className="w-full max-w-6xl px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Featured Tools
        </h2>
        <p className="mb-6 font-semibold text-gray-600" >Curated top picks from this week</p>
        <FeaturedTools />
        <Link href="/ai-tools" className="flex items-center justify-center">
          <Button className="mt-8 font-bold text-xl px-6 py-3 bg-blue-500 text-white hover:bg-blue-700 transition-colors">
            Explore More
          </Button>
        </Link>
      </section>

      {/* Other Tools Section */}
      <section className="w-full max-w-6xl px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Additional Resources
        </h2>
        <AdditionalResources />
      </section>


      {/* FAQ Section */}
      <section className="w-full max-w-6xl px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <FrequentlyAsked />
      </section>

      {/* Call to Action Section */}
      <section className="w-full px-4 mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get Started for Free
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Take Smart Scholar for a spin today. No credit card required.
        </p>
        <Link href="#tools">
          <Button className="text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Try Smart Scholar Free
          </Button>
        </Link>
      </section>

      {/* Pricing and Footer */}
      <section className="w-full px-4 mt-12">
        <Pricing />
      </section>
      <div className="w-full mt-12">
        <Footer />
      </div>
    </div>
  );
}
