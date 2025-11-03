"use client";
import React from "react";
import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-playfair font-bold text-blue-800 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/members" className="block p-6 bg-white rounded-2xl shadow hover:shadow-xl border">
            <h2 className="text-2xl font-semibold">Members</h2>
            <p className="text-sm text-gray-600 mt-2">View and edit member admin flags and work history.</p>
          </Link>

          <Link href="/admin/events" className="block p-6 bg-white rounded-2xl shadow hover:shadow-xl border">
            <h2 className="text-2xl font-semibold">Events</h2>
            <p className="text-sm text-gray-600 mt-2">Full edit access to event data (add/edit/delete).</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
