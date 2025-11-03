"use client";
import React, { useState } from "react";
import eventsData from "@/data/eventsData";

export default function AdminEventsPage() {
  const [events, setEvents] = useState(eventsData.map(e => ({ ...e })));
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  function updateField(idx: number, key: string, value: string) {
    const copy = [...events];
    (copy[idx] as any)[key] = value;
    setEvents(copy);
  }

  function addEvent() {
    setEvents([...events, { name: "New Event", startTime: "", endTime: "", location: "", description: "", image: "" }]);
  }

  function removeEvent(idx: number) {
    const copy = [...events];
    copy.splice(idx, 1);
    setEvents(copy);
  }

  return (
    <div className="min-h-screen bg-nss-bg p-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm text-gray-600 hover:underline">← Back</a>
            <h1 className="text-2xl font-bold heading-primary">Admin — Events</h1>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="border px-3 py-2 rounded w-72" />
            <button onClick={addEvent} className="btn-base btn-secondary">Add Event</button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Total events: <strong>{events.length}</strong></p>

          {events.filter(ev => {
            const q = search.toLowerCase();
            return ev.name.toLowerCase().includes(q) || (ev.location || "").toLowerCase().includes(q) || (ev.description || "").toLowerCase().includes(q);
          }).map((ev, idx) => (
            <div key={idx} className="modern-card">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{ev.name}</h3>
                    <span className="text-sm text-gray-600">{ev.startTime} — {ev.endTime}</span>
                  </div>
                  <p className="text-sm text-gray-600">{ev.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))} className="p-2 rounded hover:bg-gray-100 text-nss-primary">{expanded[idx] ? '▾' : '▸'}</button>
                  <button onClick={() => setEditingIdx(idx)} className="btn-base btn-primary">Edit</button>
                </div>
              </div>

              {expanded[idx] && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-700">{ev.description}</p>
                  </div>
                  <div>
                    {ev.image && <img src={ev.image} alt={ev.name} className="w-full rounded" />}
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <button onClick={() => removeEvent(idx)} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Edit Modal */}
        {editingIdx !== null && events[editingIdx] && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Edit Event — {events[editingIdx].name}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingIdx(null)} className="text-gray-600">Close</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].name} onChange={e => updateField(editingIdx, 'name', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Location</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].location} onChange={e => updateField(editingIdx, 'location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Start</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].startTime} onChange={e => updateField(editingIdx, 'startTime', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">End</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].endTime} onChange={e => updateField(editingIdx, 'endTime', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600">Description</label>
                  <textarea className="w-full border px-3 py-2 rounded" value={events[editingIdx].description} onChange={e => updateField(editingIdx, 'description', e.target.value)} />
                </div>

                <div>
                  <label className="text-xs text-gray-600">Image URL</label>
                  <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].image || ''} onChange={e => updateField(editingIdx, 'image', e.target.value)} />
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingIdx(null)} className="btn-base btn-outline">Cancel</button>
                  <button onClick={() => setEditingIdx(null)} className="btn-base btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
