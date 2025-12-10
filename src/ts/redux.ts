export interface ReactJsErrorsInterface {
  id: string;
  client: string;
  clientAgent: string;
  clientPlatform: string;
  createdAt: string;
  error: string;
  fixed: boolean;
  repeated: false;
  stack: string;
  updatedAt: string;
  host: string;
  href: string;
}

export interface Organization {
  id: string;
  name: string;
  owner: boolean;
  active: boolean;
}

export interface OrganizationMembership {
  id: string;
  isActive: boolean;
  isOwner: boolean;
  organization: Organization;
}
