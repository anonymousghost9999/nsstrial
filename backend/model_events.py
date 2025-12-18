import strawberry
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from enum import Enum
import re


# ==================== ENUMS ====================

@strawberry.enum
class AudienceTypeEnum(str, Enum):
    UG1 = "ug1"
    UG2 = "ug2"
    UG3 = "ug3"
    UG4 = "ug4"
    PG = "pg"
    STAFF = "staff"
    FACULTY = "faculty"
    INTERNAL = "internal"
    EXTERNAL = "external"


@strawberry.enum
class EventStatusEnum(str, Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


# ==================== EVENT MODEL ====================

class EventModel(BaseModel):
    event_name: str = Field(..., min_length=1, max_length=200, description="Name of the event")
    start: str = Field(..., description="Start date in YYYY/MM/DD format")
    end: str = Field(..., description="End date in YYYY/MM/DD format")
    venue: str = Field(..., min_length=1, description="Event venue")
    description: str = Field(default="", max_length=2000, description="Event description")
    event_profile: Optional[str] = Field(None, description="Path to event profile image")
    audience: list[str] = Field(default_factory=list, description="Target audience list")

    @field_validator('start', 'end')
    @classmethod
    def validate_date_format(cls, v: str) -> str:
        if not re.match(r'^\d{4}/\d{2}/\d{2}$', v):
            raise ValueError('Date must be in YYYY/MM/DD format')
        return v

    @field_validator('audience')
    @classmethod
    def validate_audience(cls, v: list[str]) -> list[str]:
        valid_audiences = {'ug1', 'ug2', 'ug3', 'ug4', 'pg', 'staff', 'faculty', 'internal', 'external'}
        for audience in v:
            if audience.lower() not in valid_audiences:
                raise ValueError(f'Invalid audience type: {audience}')
        return v

    @field_validator('event_profile')
    @classmethod
    def validate_event_profile(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v == "":
            return None
        if not v.startswith('/'):
            raise ValueError('Event profile path must start with /')
        return v


@strawberry.experimental.pydantic.type(model=EventModel, all_fields=True)
class Event:
    pass


@strawberry.experimental.pydantic.input(model=EventModel, fields=[
    "event_name",
    "start",
    "end",
    "venue",
    "description",
    "event_profile",
    "audience"
])
class EventInput:
    pass


# ==================== EXTENDED EVENT MODEL (For Backend Operations) ====================

class EventExtendedModel(BaseModel):
    id: str = Field(..., min_length=1, description="Unique event identifier")
    event_name: str = Field(..., min_length=1, max_length=200, description="Name of the event")
    start: str = Field(..., description="Start date in YYYY/MM/DD format")
    end: str = Field(..., description="End date in YYYY/MM/DD format")
    venue: str = Field(..., min_length=1, description="Event venue")
    description: str = Field(default="", max_length=2000, description="Event description")
    event_profile: Optional[str] = Field(None, description="Path to event profile image")
    audience: list[str] = Field(default_factory=list, description="Target audience list")
    status: EventStatusEnum = Field(default=EventStatusEnum.UPCOMING, description="Event status")
    eventHeadId: Optional[str] = Field(None, description="Member ID of event head")
    organizerIds: list[str] = Field(default_factory=list, description="List of organizer member IDs")
    createdAt: Optional[str] = Field(None, description="Creation date in ISO format")
    updatedAt: Optional[str] = Field(None, description="Last update date in ISO format")

    @field_validator('start', 'end')
    @classmethod
    def validate_date_format(cls, v: str) -> str:
        if not re.match(r'^\d{4}/\d{2}/\d{2}$', v):
            raise ValueError('Date must be in YYYY/MM/DD format')
        return v

    @field_validator('audience')
    @classmethod
    def validate_audience(cls, v: list[str]) -> list[str]:
        valid_audiences = {'ug1', 'ug2', 'ug3', 'ug4', 'pg', 'staff', 'faculty', 'internal', 'external'}
        for audience in v:
            if audience.lower() not in valid_audiences:
                raise ValueError(f'Invalid audience type: {audience}')
        return v

    @field_validator('createdAt', 'updatedAt')
    @classmethod
    def validate_iso_date(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        iso_pattern = r'^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$'
        if not re.match(iso_pattern, v):
            raise ValueError('Date must be in ISO format')
        return v


@strawberry.experimental.pydantic.type(model=EventExtendedModel, all_fields=True)
class EventExtended:
    pass


@strawberry.experimental.pydantic.input(model=EventExtendedModel, fields=[
    "id",
    "event_name",
    "start",
    "end",
    "venue",
    "description",
    "event_profile",
    "audience",
    "status",
    "eventHeadId",
    "organizerIds"
])
class EventExtendedInput:
    pass