import type { PhotoGroup } from '~/enums/photo'

export interface Photo {
  id: string
  title: string
  place: string
  city: string
  group: PhotoGroup
  date: string
  camera: string
  lens: string
  exif: string
  /** CSS aspect-ratio value, e.g. "4/5" */
  ratio: string
}
