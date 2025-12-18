# MongoDB Setup for NSS Website

This guide explains how to import the NSS Website data into MongoDB and use MongoDB Compass for data management.

## Prerequisites

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install [MongoDB Compass](https://www.mongodb.com/try/download/compass) (GUI tool)
3. Install Python requirements:
   ```
   pip install pymongo
   ```

## Setup Process

### 1. Start MongoDB Server
- If you installed MongoDB as a service, it should be running automatically
- Otherwise, start it manually:
  ```
  mongod --dbpath="C:\data\db"
  ```

### 2. Import Sample Data

We've created sample JSON files that match the structure of your frontend data:
- `sample_members_mongodb.json`: Contains member data from `Data.tsx`
- `sample_events_mongodb.json`: Contains event data from `eventsData.ts`

Run the import script:
```
python mongodb_import_script.py
```

This will:
- Create a database called `nss_website`
- Create two collections: `members` and `events`
- Import the sample data into these collections

### 3. Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to your MongoDB server:
   - For local development: `mongodb://localhost:27017/`
3. Navigate to the `nss_website` database
4. You will see two collections:
   - `members`: Contains member data
   - `events`: Contains event data
5. You can:
   - View documents by clicking on a collection
   - Edit documents directly in the Compass interface
   - Create queries using the filter bar
   - Export data to various formats
   - Monitor database performance

### 4. Collection Structure

#### Members Collection
```javascript
{
  "id": "email@example.com",
  "name": "Full Name",
  "email": "email@example.com",
  "rollNumber": "2025101033",
  "batch": "ug2k25",
  "department": "CSE",
  "photoUrl": "/path/to/photo.jpg",
  "phone": "1234567890",
  "linkedin": "https://linkedin.com/in/username",
  "github": "https://github.com/username",
  "bio": "Short biography",
  "achievements": ["Achievement 1", "Achievement 2"],
  "interests": ["Interest 1", "Interest 2"],
  "workHistory": [
    {
      "role": "Tech Team Member",
      "team": "Tech",
      "start": "2024-01",
      "end": "2025-01"
    }
  ]
}
```

#### Events Collection
```javascript
{
  "_id": ObjectId("..."),
  "event_name": "Event Name",
  "start": "2025/06/21",
  "end": "2025/06/21",
  "venue": "Venue Name",
  "description": "Event description",
  "audience": ["ug1", "ug2", "faculty"],
  "event_profile": "/path/to/image.jpg",
  "status": "upcoming",
  "eventHeadId": "head@example.com",
  "organizerIds": ["organizer1@example.com", "organizer2@example.com"],
  "createdAt": "2025-03-15T10:30:00Z",
  "updatedAt": "2025-03-15T10:30:00Z"
}
```

## Connecting Your Backend to MongoDB

Update your backend configuration to connect to MongoDB:

```python
# Example MongoDB connection in your backend
from pymongo import MongoClient

# Connection string
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["nss_website"]

# Access collections
members_collection = db["members"]
events_collection = db["events"]

# Example query
member = members_collection.find_one({"id": "email@example.com"})
```

## Querying MongoDB from Your Backend

Common operations:

```python
# Find all members
all_members = list(members_collection.find({}))

# Find a specific member by ID
member = members_collection.find_one({"id": "email@example.com"})

# Find members by team (using work history)
team_members = list(members_collection.find({
    "workHistory": {
        "$elemMatch": {
            "team": "Tech",
            "end": None  # Current members (end is null)
        }
    }
}))

# Find upcoming events
upcoming_events = list(events_collection.find({"status": "upcoming"}))

# Insert a new member
new_member = {...}  # Member data
members_collection.insert_one(new_member)

# Update a member
members_collection.update_one(
    {"id": "email@example.com"},  # Filter
    {"$set": {"phone": "9876543210"}}  # Update
)

# Delete a member
members_collection.delete_one({"id": "email@example.com"})
```
