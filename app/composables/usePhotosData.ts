import type { Photo } from '~/types/photo'
import { MOCK_PHOTOS } from '~/data/mock/photos'

export const usePhotosData = () => {
  const config = useRuntimeConfig()
  const useMock = config.public.useMockData === 'true'

  const fetchPhotos = async (): Promise<Photo[]> => {
    if (useMock) return MOCK_PHOTOS
    return $fetch<Photo[]>('/api/photos')
  }

  return { fetchPhotos }
}
