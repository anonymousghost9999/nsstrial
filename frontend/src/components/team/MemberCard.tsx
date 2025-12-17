"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Mail } from "lucide-react";

type Member = {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  from: string;
  to: string;
  workHistory?: Array<{ role?: string; team?: string; start?: string; end?: string | null }>;
};

export default function MemberCard({ member }: { member: Member }) {
  const [imageError, setImageError] = useState(false);
  const [hover, setHover] = useState(false);

  const formatYear = (val?: string) => {
    if (!val) return '';
    const s = String(val).trim();
    if (!s) return '';
    if (s.toLowerCase() === 'present') return 'Present';
    if (s.includes('-')) return s.split('-')[0];
    return s;
  };

  const getFallbackImage = () => "/favicon.ico";
  const getImageSrc = (): string => {
    if (imageError) return getFallbackImage();
    if (!member.photoUrl || member.photoUrl.trim() === "" || member.photoUrl === "hi" || member.photoUrl === "-") {
      return getFallbackImage();
    }
    return member.photoUrl;
  };

  const handleImageError = () => setImageError(true);

  const emailUrl = `mailto:${member.email}`;

  const getTeamGradient = () => {
    switch (member.team.toLowerCase()) {
      case 'tech':
        return 'from-green-500 to-blue-600';
      case 'design':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getStatusBadge = () => {
    const isActive = !member.to || member.to.toLowerCase() === 'present';
    if (isActive) {
      return 'bg-green-100 text-green-800 border border-green-200';
    }
    return 'bg-gray-100 text-gray-600 border border-gray-200';
  };
  const router = useRouter();

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const handleClick = () => {
    const uid = getCookie('uid');
    if (uid && (uid === member.rollNumber || uid === member.id || uid === member.email)) {
      router.push(`/me/profile/${member.rollNumber}`);
    } else {
      const preferred = member.email || member.id || member.rollNumber;
      router.push(`/member/profile/${encodeURIComponent(preferred)}`);
    }
  };
  
  return (
    <div
      className="w-full max-w-[280px] min-w-[220px] h-auto aspect-[280/320] mx-auto my-4 relative group"
      style={{ perspective: 1200 }}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 ease-out rounded-3xl cursor-pointer ${
          hover 
            ? 'shadow-2xl shadow-blue-200/50 scale-[1.02]' 
            : 'shadow-lg shadow-gray-200/50'
        }`}
      >
        {/* Front Side */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl flex flex-col items-center p-6 text-center justify-between border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
        >
          {/* Indian Flag Border */}
          <div 
            className="absolute top-0 left-6 right-6 h-1 rounded-full"
            style={{
              background: "linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)"
            }}
          />
          
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div
              className="relative mb-4"
              style={{
              width: 109, // Decreased by 5%
              height: 109, // Decreased by 5%
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid transparent",
              background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF9933, #138808) border-box`,
              padding: 2,
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
              <img
                src={getImageSrc()}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={handleImageError}
              />
              </div>
              
              {/* Status Indicator */}
              <div 
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-3 border-white z-20 ${
                (!member.to || member.to.toLowerCase() === 'present')
                ? 'bg-green-500 animate-pulse' 
                : 'bg-gray-400'
              }`}
              />
            </div>
            
            {/* Team Badge - Top Right with high z-index */}
            <div className={`absolute top-2 right-2 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getTeamGradient()} text-white shadow-lg border-2 border-white z-50`}>
              {member.team}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{member.name}</h3>

            {/* Roll Number and Email (moved from back) */}
            <div className="flex gap-2 items-center justify-center mb-3 mt-1">
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white shadow">
                <span className="text-slate-700 text-sm font-semibold">
                  {member.rollNumber}
                </span>
              </div>
              <a 
                href={emailUrl}
                className="flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full border border-white hover:bg-white hover:scale-110 transition-all duration-300 shadow"
                title={member.email}
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-5 h-5 text-blue-700" />
              </a>
            </div>
          </div>
          
          {/* Duration Info - Positioned on card outline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusBadge()} shadow-xl`}>
              <span className="mr-2">
              {(!member.to || (typeof member.to === 'string' && member.to.toLowerCase() === 'present')) ? 
                <CheckCircle className="w-4 h-4 text-green-600 inline" /> : <></>
                }
              </span>
              <span className="truncate">
              {(() => {
                const wh = member.workHistory || [];
                if (!Array.isArray(wh) || wh.length === 0) {
                return (!member.to || (typeof member.to === 'string' && member.to.toLowerCase() === 'present'))
                  ? `${formatYear(member.from)} - Present`
                  : `${formatYear(member.from)} - ${formatYear(member.to)}`;
                }

                const starts = wh.map(w => w.start).filter(Boolean) as string[];
                const ends = wh.map(w => w.end).filter(Boolean) as string[];

                let earliestStart = starts.length ? starts[0] : member.from;
                for (const s of starts) {
                try {
                  if (new Date(s) < new Date(earliestStart)) earliestStart = s;
                } catch (e) {
                  // ignore invalid dates
                }
                }

                const hasPresent = wh.some(w => !w.end);
                if (hasPresent) return `${formatYear(earliestStart)} - Present`;

                let latestEnd = ends.length ? ends[0] : member.to;
                for (const e of ends) {
                try {
                  if (new Date(e) > new Date(latestEnd)) latestEnd = e;
                } catch (err) {
                  // ignore
                }
                }

                return `${formatYear(earliestStart)} - ${formatYear(latestEnd)}`;
              })()}
              </span>
            </div>
            </div>
        </div>

        {/* Back Side removed (no rotation) */}
      </div>
    </div>
  );
}
