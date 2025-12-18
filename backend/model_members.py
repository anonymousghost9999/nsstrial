import strawberry
from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import Optional
from enum import Enum
import re


# ==================== ENUMS ====================

@strawberry.enum
class TeamTypeEnum(str, Enum):
    NSS_CORE = "NSS Core"
    TECH = "Tech"
    DESIGN = "Design"
    SOCIAL = "Social"
    LOGISTICS = "Logistics"
    CONTENT = "Content"


@strawberry.enum
class MemberStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


@strawberry.enum
class RoleEnum(str, Enum):
    COORDINATOR = "Coordinator"
    TECH_TEAM_HEAD = "Tech Team Head"
    TECH_TEAM_MEMBER = "Tech Team Member"
    DESIGN_TEAM_HEAD = "Design Team Head"
    DESIGN_TEAM_MEMBER = "Design Team Member"
    SOCIAL_MEDIA_TEAM_HEAD = "Social Media Team Head"
    SOCIAL_MEDIA_TEAM_MEMBER = "Social Media Team Member"
    LOGISTICS_TEAM_HEAD = "Logistics Team Head"
    LOGISTICS_TEAM_MEMBER = "Logistics Team Member"
    CONTENT_TEAM_HEAD = "Content Team Head"
    CONTENT_TEAM_MEMBER = "Content Team Member"


# ==================== WORK HISTORY ====================

class WorkHistoryModel(BaseModel):
    role: str = Field(..., min_length=1)
    team: str = Field(..., min_length=1)
    start: str = Field(...)

    @field_validator('start')
    @classmethod
    def validate_date_format(cls, v: str) -> str:
        if not re.match(r'^\d{4}-\d{2}$', v):
            raise ValueError('Date must be in YYYY-MM format')
        return v

    end: Optional[str] = Field(None)

    @field_validator('end')
    @classmethod
    def validate_end_date_format(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not re.match(r'^\d{4}-\d{2}$', v):
            raise ValueError('Date must be in YYYY-MM format')
        return v


@strawberry.experimental.pydantic.type(model=WorkHistoryModel, all_fields=True)
class WorkHistory:
    pass


@strawberry.experimental.pydantic.input(model=WorkHistoryModel, all_fields=True)
class WorkHistoryInput:
    pass


# ==================== MEMBER MODEL ====================

class MemberModel(BaseModel):
    id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1, max_length=200)
    email: str = Field(...)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v):
            raise ValueError('Invalid email format')
        return v

    rollNumber: str = Field(..., min_length=1)

    @field_validator('rollNumber')
    @classmethod
    def validate_roll_number(cls, v: str) -> str:
        if not re.match(r'^\d{10}$', v):
            raise ValueError('Roll number must be a 10-digit number')
        return v

    batch: str = Field(...)

    @field_validator('batch')
    @classmethod
    def validate_batch(cls, v: str) -> str:
        batch_pattern = r'^(ug|le|pg)\d?k\d{2}$'
        if not re.match(batch_pattern, v, re.IGNORECASE):
            raise ValueError('Batch must be in format like ug2k25, le2k25, pg2k24')
        return v

    department: str = Field(..., min_length=1, max_length=50)
    photoUrl: str = Field(default="-")
    phone: str = Field(default="-")
    linkedin: str = Field(default="-")
    github: str = Field(default="-")
    bio: str = Field(default="", max_length=500)
    achievements: list[str] = Field(default_factory=list)
    interests: list[str] = Field(default_factory=list)
    workHistory: list[WorkHistoryModel] = Field(default_factory=list)


@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass


@strawberry.experimental.pydantic.input(model=MemberModel, fields=[
    "id",
    "name",
    "email",
    "rollNumber",
    "batch",
    "department",
    "photoUrl",
    "phone",
    "linkedin",
    "github",
    "bio",
    "achievements",
    "interests",
    "workHistory"
])
class MemberInput:
    pass


# ==================== TEAM MODEL (Future Use) ====================

class TeamModel(BaseModel):
    id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1, max_length=100)
    teamType: TeamTypeEnum = Field(...)
    description: Optional[str] = Field(None, max_length=500)
    headId: Optional[str] = Field(None)
    memberIds: list[str] = Field(default_factory=list)
    isActive: bool = Field(default=True)
    createdAt: Optional[str] = Field(None)
    isActive: bool = Field(default=True, description="Whether team is currently active")
    createdAt: Optional[str] = Field(None, description="Creation date in ISO format")
    updatedAt: Optional[str] = Field(None, description="Last update date in ISO format")

    @field_validator('createdAt', 'updatedAt')
    @classmethod
    def validate_iso_date(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        # Basic ISO date validation
        iso_pattern = r'^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$'
        if not re.match(iso_pattern, v):
            raise ValueError('Date must be in ISO format')
        return v


@strawberry.experimental.pydantic.type(model=TeamModel, all_fields=True)
class Team:
    pass


@strawberry.experimental.pydantic.input(model=TeamModel, fields=[
    "id",
    "name",
    "teamType",
    "description",
    "headId",
    "memberIds",
    "isActive"
])
class TeamInput:
    pass