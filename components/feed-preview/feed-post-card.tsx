'use client'

import type React from 'react'

import type { PreviewProfile } from '@/lib/preview-profile'
import { PostCard } from '@/components/tool/preview/post-card'
import { ScreenSizeProvider } from '@/components/tool/preview/preview-size-context'
import type { Media } from '@/components/tool/tool'

interface FeedPostCardProps {
    content: any
    profile: PreviewProfile
    media?: Media | null
}

export const FeedPostCard: React.FC<FeedPostCardProps> = ({ content, profile, media = null }) => {
    return (
        <ScreenSizeProvider>
            <PostCard content={content} media={media} profile={profile} className='ring-primary/20 ring-2' />
        </ScreenSizeProvider>
    )
}
