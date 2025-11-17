import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Github,
  MessageCircle,
} from "lucide-react";
import { cn } from "../../../utils/tailwind";

// Constants
const CONTACT_INFO = {
  phone: "+57 300 123 4567",
  email: "support@allnutrition.com",
  address: "Calle Principal #123, Cali, Colombia",
  hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
  social: {
    facebook: "https://facebook.com/allnutrition",
    instagram: "https://instagram.com/allnutrition",
    twitter: "https://twitter.com/allnutrition",
    github: "https://github.com/allnutrition",
  },
};

const TEAM_MEMBERS = [
  {
    name: "John Smith",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Sarah Johnson",
    role: "Nutrition Specialist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Mike Wilson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
];

const TESTIMONIALS = [
  {
    name: "David Martinez",
    rating: 5,
    comment:
      "Amazing products and excellent customer service. The team really knows their stuff!",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Emily Chen",
    rating: 5,
    comment: "Best supplement store in town. Fast shipping and great prices!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Carlos Rodriguez",
    rating: 4,
    comment: "Quality products and knowledgeable staff. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
];

const FAQS = [
  {
    question: "How do your shipping services work?",
    answer:
      "We offer free shipping on orders over $100. Standard shipping takes 3-5 business days, while express shipping delivers in 1-2 business days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Products must be unopened and in original packaging. Contact our support team to initiate a return.",
  },
  {
    question: "Are your supplements guaranteed?",
    answer:
      "Yes! All our products come with a 100% satisfaction guarantee. If you are not happy with your purchase, we will refund your money or replace the product.",
  },
  {
    question: "Where are you located?",
    answer:
      "Our main store is located in Cali, Colombia. We also ship nationwide and offer international shipping to select countries.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you will receive a tracking number via email. You can use this to track your package on our website or the carrier's site.",
  },
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-medium">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="pb-4 text-gray-600 dark:text-gray-400">{faq.answer}</p>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }) {
  return (
    <div className="text-center">
      <div className="mb-4 overflow-hidden rounded-full">
        <img
          src={member.image}
          alt={member.name}
          className="h-40 w-40 object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <div className="flex">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        "{testimonial.comment}"
      </p>
    </div>
  );
}

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1500"
          alt="Gym equipment"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto flex h-full items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold">About AllNutrition</h1>
              <p className="mt-4 text-xl">
                Your trusted partner in health and fitness since 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Founded in 2024, AllNutrition was born from a passion for health
              and fitness. We started with a simple mission: to provide
              high-quality supplements at fair prices, backed by exceptional
              customer service.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Today, we are proud to serve thousands of customers across
              Colombia, helping them achieve their fitness goals with premium
              products and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              To empower individuals in their fitness journey by providing
              premium quality supplements, expert guidance, and exceptional
              service.
            </p>

            <h3 className="mt-12 text-2xl font-bold">Our Values</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h4 className="text-xl font-semibold">Honesty</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We believe in complete transparency in our products, pricing,
                  and business practices.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h4 className="text-xl font-semibold">Commitment</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We are dedicated to delivering the best products and service
                  to our customers, every single time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Meet Our Team</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">
            What Our Customers Say
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="mt-8">
              {FAQS.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
