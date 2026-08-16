export function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v')
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.replace('/embed/', '') || null
      }
    }

    return null
  } catch {
    return null
  }
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const videoId = getYoutubeVideoId(url)
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
}
