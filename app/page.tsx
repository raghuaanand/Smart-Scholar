"use client";

import { Button } from "@/components/ui/button";
import {
  AcademicPage,
  JobsPage,
  StudyPlan,
  WritingPage,
} from "@/components/tools";
import otherTools from "@/constants/tools";
import { OrbitingCirclesDemo } from "@/components/cards";
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

      {/* Video Section */}
      {/* <section className="w-full max-w-6xl my-5    px-4 text-center">
        <div className="relative pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/pF1dPfOmIpw?rel=0"
            title="Showcase Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mt-8">
          See Smart Scholar in Action
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Watch how Smart Scholar can transform the way you work, learn, and
          grow. Our tools are designed to empower you every step of the way.
        </p>
      </section> */}

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

      {/* Featured Sections */}
      {/* <section className="w-full px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white  rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Job Opportunities
              </h3>
              <JobsPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Academic Resources
              </h3>
              <AcademicPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Writing Assistance
              </h3>
              <WritingPage />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Study Planner
              </h3>
              <StudyPlan />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="w-full mt-12">
        <div className="max-w-7xl mx-auto">
          <OrbitingCirclesDemo />
        </div>
      </section> */}

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
