import React from 'react';
import { getMembersFromDB } from '@/graphql_Q&M/getMembers';
import MembersSection from '@/components/team/MembersSection';

export default async function MembersPage() {
  // Fetch all members from the database
  const membersData = await getMembersFromDB();
  
  // Transform the data to match MembersSection expected format
  const members = membersData.map((member: any, index: number) => ({
    id: member.rollNumber || `member-${index}`,
    email: member.email || '',
    name: member.name || '',
    photoUrl: member.photoUrl || '',
    team: member.team || '',
    rollNumber: member.rollNumber || '',
    status: member.status || 'inactive',
    from: member.start || '',
    to: member.end || '',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-4 drop-shadow-lg tracking-tight leading-tight">
            Our Team
        </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated volunteers and alumni who make NSS a force for positive change
          </p>
        </div>

        {/* Members Section */}
        <MembersSection members={members} />
      </div>
    </div>
  );
}
