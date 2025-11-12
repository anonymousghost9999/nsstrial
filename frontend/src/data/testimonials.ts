//  instead of this data later we will fetch data from backend and also that part of code will be in folder GraphQL_Q&M
// for events members and testimonials etc
export type Testimonial = {
  name: string;
  title: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Meera Subramanian",
    title: "Regional Director, NSS South Zone",
    quote:
      "NSS inspires the youth to step out of their comfort zones and work selflessly for the betterment of society.",
  },
  {
    name: "Prof. Rakesh Singh",
    title: "Program Coordinator, NSS Delhi University",
    quote:
      "The strength of NSS lies in its volunteers — young hearts who are ready to serve and lead.",
  },
  {
    name: "Dr. Kavita Deshmukh",
    title: "State NSS Officer, Maharashtra",
    quote:
      "Each NSS activity is a step toward building a responsible and compassionate generation.",
  },
  {
    name: "Prof. Suresh Babu",
    title: "Program Officer, NSS Kerala",
    quote:
      "Through NSS, students learn the true meaning of ‘Not Me But You’ — service above self.",
  },
  {
    name: "Dr. Anita Reddy",
    title: "Coordinator, NSS Telangana",
    quote:
      "NSS bridges the gap between academia and real-world problems by promoting social responsibility among youth.",
  },
  {
    name: "Prof. Ajay Verma",
    title: "National Coordinator, NSS New Delhi",
    quote:
      "NSS represents the spirit of youth service. Together, we can build a stronger, more inclusive India.",
  },
];
