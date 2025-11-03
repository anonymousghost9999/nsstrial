"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import eventsDataRaw, { EventItem } from "@/data/eventsData";
import Link from "next/link";
import { Calendar, MapPin, Clock, Share2, ArrowLeft, Info, Users, Flag } from "lucide-react";

function slugify(name: string) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getEventStatus(startTime: string, endTime: string) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (now < start) return { label: "Upcoming", color: "bg-blue-500" };
  if (now >= start && now <= end) return { label: "Ongoing", color: "bg-green-500" };
  return { label: "Completed", color: "bg-gray-500" };
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params as any)?.slug as string | undefined;
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (!slug) return;
    // Try localStorage first (admin overrides)
    try {
      const raw = localStorage.getItem("admin_events");
      const list: EventItem[] = raw ? JSON.parse(raw) : eventsDataRaw;
      const found = list.find(e => slugify(e.name) === decodeURIComponent(slug));
      if (found) {
        setEvent(found);
        return;
      }
    } catch (e) {
      // ignore
    }

    const fallback = eventsDataRaw.find(e => slugify(e.name) === decodeURIComponent(slug));
    if (fallback) setEvent(fallback);
  }, [slug]);

  if (!slug) return <div className="p-8">Invalid event</div>;
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-saffron-light via-white to-green-light p-8">
        <div className="container mx-auto px-4">
          <div className="py-20 text-center">
            <div className="animate-pulse text-gray-600">Loading event details...</div>
          </div>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event.startTime, event.endTime);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-saffron-light via-white to-green-light">
      {/* Enhanced Header with Indian Theme */}
      <section className="relative bg-gradient-to-r from-saffron via-white to-green text-gray-900 py-6 shadow-lg">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-4">
            <Link href="/events" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 group transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">All Events</span>
            </Link>
            
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border">
              <Flag className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-gray-700">NSS Event</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Users className="w-6 h-6 text-saffron" />
              </div>
              <div>
                <h1 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900">{event.name}</h1>
                <p className="text-gray-600 text-sm mt-1">National Service Scheme</p>
              </div>
            </div>
            
            <div className={`${status.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2`}>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {status.label}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Event Content */}
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Event Image */}
            {event.image && (
              <div className="lg:col-span-3">
                <div className="modern-card p-0 overflow-hidden border-2 border-white shadow-lg rounded-xl">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
              </div>
            )}

            {/* Compact Event Info Cards */}
            <div className="modern-card bg-white border-l-4 border-saffron shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-saffron-light p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-saffron" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Date</h3>
                  <p className="text-xs text-gray-600">
                    {formatDateIndian(event.startTime)} - {formatDateIndian(event.endTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="modern-card bg-white border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Time</h3>
                  <p className="text-xs text-gray-600">
                    {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - 
                    {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
              </div>
            </div>

            <div className="modern-card bg-white border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Location</h3>
                  <p className="text-xs text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Compact Description */}
            <div className="lg:col-span-3 modern-card bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-saffron-light p-2 rounded-lg">
                  <Info className="w-4 h-4 text-saffron" />
                </div>
                <h2 className="font-semibold text-gray-800">About this Event</h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
            </div>

            {/* Compact Action Buttons */}
            <div className="lg:col-span-3 flex flex-wrap gap-3 justify-center pt-2">
              <button 
                onClick={() => { 
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Event link copied to clipboard!');
                }} 
                className="btn-base bg-saffron hover:bg-saffron-dark text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                Share Event
              </button>
              <button 
                onClick={() => router.back()} 
                className="btn-base bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NSS Footer Note */}
      <div className="container mx-auto px-4 py-4 text-center">
        <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
          <p>National Service Scheme - "Not Me But You"</p>
        </div>
      </div>
    </div>
  );
}