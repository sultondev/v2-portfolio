import type { ProjectCategory, ProjectStatus } from '~/enums/project'

export type CoverKind =
  | 'glyph'
  | 'grid'
  | 'radar'
  | 'terminal'
  | 'editor'
  | 'chart'
  | 'keys'
  | 'timeline'
  | 'swatch'

export interface ProjectCover {
  kind: CoverKind
  palette: [string, string]
  glyph?: string
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectLinks {
  live?: string
  repo?: string
  case_study?: boolean
}

export interface Project {
  id: string
  slug: string
  num: string
  name: string
  title: string
  tagline: string
  summary: string
  body: string[]
  tech: string[]
  category: ProjectCategory
  role: string
  client: string
  year: number
  status: ProjectStatus
  featured: boolean
  accent: string
  cover: ProjectCover
  links: ProjectLinks
  metrics: ProjectMetric[]
}
