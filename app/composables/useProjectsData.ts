import type { Project } from '~/types/project'
import { MOCK_PROJECTS } from '~/data/mock/projects'

export const useProjectsData = () => {
  const config = useRuntimeConfig()
  const useMock = config.public.useMockData === 'true'

  const fetchProjects = async (): Promise<Project[]> => {
    if (useMock) return MOCK_PROJECTS
    return $fetch<Project[]>('/api/projects')
  }

  const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    if (useMock) return MOCK_PROJECTS.find(p => p.slug === slug) ?? null
    return $fetch<Project | null>(`/api/projects/${slug}`)
  }

  const fetchFeaturedProjects = async (limit = 6): Promise<Project[]> => {
    if (useMock) return MOCK_PROJECTS.filter(p => p.featured).slice(0, limit)
    return $fetch<Project[]>(`/api/projects?featured=true&limit=${limit}`)
  }

  return { fetchProjects, fetchProjectBySlug, fetchFeaturedProjects }
}
