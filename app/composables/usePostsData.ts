import type { Post } from '~/types/post'
import { MOCK_POSTS } from '~/data/mock/posts'

export const usePostsData = () => {
  const config = useRuntimeConfig()
  const useMock = config.public.useMockData === 'true'

  const fetchPosts = async (): Promise<Post[]> => {
    if (useMock) return MOCK_POSTS
    return $fetch<Post[]>('/api/posts')
  }

  const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
    if (useMock) return MOCK_POSTS.find(p => p.slug === slug) ?? null
    return $fetch<Post | null>(`/api/posts/${slug}`)
  }

  const fetchFeaturedPost = async (): Promise<Post | null> => {
    if (useMock) return MOCK_POSTS.find(p => p.featured) ?? null
    return $fetch<Post | null>('/api/posts?featured=true&limit=1')
  }

  const fetchRelatedPosts = async (post: Post, limit = 3): Promise<Post[]> => {
    if (useMock) {
      const related = MOCK_POSTS.filter(
        p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag))
      ).slice(0, limit)
      return related.length ? related : MOCK_POSTS.filter(p => p.id !== post.id).slice(0, limit)
    }
    return $fetch<Post[]>(`/api/posts/${post.slug}/related?limit=${limit}`)
  }

  return { fetchPosts, fetchPostBySlug, fetchFeaturedPost, fetchRelatedPosts }
}
