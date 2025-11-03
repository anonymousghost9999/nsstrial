export interface EventItem {
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image?: string;
}

const events: EventItem[] = [
  {
    name: "Orientation Program",
    startTime: "2025-08-27T10:00:00Z",
    endTime: "2025-08-27T12:00:00Z",
    location: "Main Auditorium",
    description: "Welcome event for new members",
    image: "/carousel_images/1.jpeg",
  },
  {
    name: "Workshop on AI",
    startTime: "2025-09-05T14:00:00Z",
    endTime: "2025-09-05T17:00:00Z",
    location: "Lab 3",
    description: "Hands-on session on AI tools",
    image: "/carousel_images/2.jpg",
  },
  {
    name: "Annual Meetup",
    startTime: "2025-10-10T09:00:00Z",
    endTime: "2025-10-10T18:00:00Z",
    location: "Conference Hall",
    description: "Yearly gathering of all NSS members",
    image: "/carousel_images/3.jpg",
  },
  {
    name: "Clean Campus Drive",
    startTime: "2025-08-30T08:00:00Z",
    endTime: "2025-08-30T11:00:00Z",
    location: "Campus Grounds",
    description: "Join us to keep our campus clean.",
    image: "/carousel_images/2.jpg",
  },
];

export default events;
