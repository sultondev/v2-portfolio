export type PostTag = 'Vue' | 'Perf' | 'DX' | 'Design' | 'Career'

export interface Post {
  id: number
  slug: string
  date: string
  tags: PostTag[]
  readMin: number
  featured?: boolean
  /**
   * i18n dictionary key for the post title, e.g. "post.1.t"
   * When connecting to a real API, the API would return `title` directly (localized)
   * and this field would be unused.
   */
  titleKey: string
  /**
   * i18n dictionary key for the post excerpt/lead, e.g. "post.1.x"
   */
  excerptKey: string
  /**
   * Whether full body paragraphs exist in the i18n dict (keys: post.{id}.b1/b2/b3)
   * When connecting to API, body content would come directly on the post object.
   */
  hasBody?: boolean
}
