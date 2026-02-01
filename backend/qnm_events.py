from model_events import *
from model_members import MemberInput
from database import db
import strawberry
import datetime
import pytz

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addEvent(event: EventInput) -> bool:
    event_data = event.model_dump()
    
    db["events"].insert_one(event_data)
    return True

@strawberry.mutation
def changeEvent(event: EventInput) -> bool:
    event_data = event.model_dump()
    
    result = db["events"].update_one(
        {"name": event.name},
        {"$set": event_data}
    )
    return result.modified_count > 0

@strawberry.field
def viewEvents(name: str | None = None, startTime:str | None = None, endTime:str | None = None)  -> list[Event]:
    if name:
        events = db["events"].find({"name": name})
    elif startTime and endTime:
        events = db["events"].find({"startTime": {"$gte": startTime}, "endTime": {"$lte": endTime}})
    else:
        events = db["events"].find({})
    events = list(events)
    if not events:
        return []
    return [Event(**event) for event in events]

queries = [viewEvents]
mutations = [addEvent, changeEvent]