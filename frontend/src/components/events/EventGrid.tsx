import React, { useState } from "react";
import Link from "next/link";

import eventsData from "@/data/eventsData";

export type EventItem = {
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image?: string;
};

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

interface EventGridProps {
  selectedDate: Date;
  events?: EventItem[];
}

const EventGrid: React.FC<EventGridProps> = ({ selectedDate, events: passedEvents }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, ongoing, upcoming, past

  // Function to determine event status
  function getEventStatus(event: any) {
    const today = new Date();
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    if (today >= start && today <= end) return "ongoing";
    if (start > today) return "upcoming";
    if (end < today) return "past";
    return "unknown";
  }





  // Use centralized events data or events passed as prop (admin edits saved to localStorage are passed down)
  const events = passedEvents || eventsData || [];
    // Filter events based on search query and status filter
  const filteredEvents = events.filter((event: any) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && getEventStatus(event) === filter;
  });


  const renderEventCard = (event: any, idx: number) => {
    const slug = encodeURIComponent(event.name.replace(/\s+/g, "-").toLowerCase());
    return (
      <Link href={`/events/${slug}`} key={idx} className="group">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          {event.image && (
            <div className="relative overflow-hidden">
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="p-6">
            <h3 className="font-merriweather text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-900 transition-colors duration-300">
              {event.name}
            </h3>
            
            <div className="flex items-center gap-2 text-orange-600 font-medium mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                {formatDateIndian(event.startTime)} - {formatDateIndian(event.endTime)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{event.location}</span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{event.description}</p>

            <div className="w-full">
              <button className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-900 transition-all duration-300 transform hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };



  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-md mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search events by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 bg-white shadow-sm"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Search
        </button>
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { key: "all", label: "All Events" },
          { key: "ongoing", label: "Present" },
          { key: "upcoming", label: "Upcoming" },
          { key: "past", label: "Past" }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              filter === key
                ? "bg-blue-800 text-white hover:bg-blue-900"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Results Count */}
      {filteredEvents.length > 0 && (
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-800">{filteredEvents.length}</span> 
            {filter === "all" ? " events" : ` ${filter} events`}
            {search && ` matching "${search}"`}
          </p>
        </div>
      )}
      
      {/* All Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">
              {search ? `No events match "${search}"` : `No ${filter === "all" ? "" : filter + " "}events available`}
              {(search || filter !== "all") && " - try adjusting your filters"}
            </p>
          </div>
        ) : (
          filteredEvents.map((event, idx) => renderEventCard(event, idx))
        )}
      </div>
    </div>
  );
};
export default EventGrid;
