export interface TeamPerson {
  id: number,
  name: string,
  avatar: string,
}

export type TeamPersons = TeamPerson[]

export interface OrganizationMember {
  job: {
    job_name: string,
    job_id: number,
  },
  TeamPersons: TeamPersons,
}

export type OrganizationMembers = OrganizationMember[]

// auth
export type OrganizationAuth = OrganizationMember

export type OrganizationAuths = OrganizationAuth[]
