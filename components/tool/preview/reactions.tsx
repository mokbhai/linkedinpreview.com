import type React from 'react'
import Image from 'next/image'

import type { PreviewProfile } from '@/lib/preview-profile'
import { cn } from '@/lib/utils'

import { useScreenSize } from './preview-size-context'

interface ReactionsProps {
    profile: PreviewProfile
}

function formatCount(count: number, label: string): string {
    return `${count.toLocaleString()} ${label}${count === 1 ? '' : 's'}`
}

export const Reactions: React.FC<ReactionsProps> = ({ profile }) => {
    const { screenSize } = useScreenSize()

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-2'>
                <Image
                    alt='post reactions'
                    loading='lazy'
                    width={24}
                    height={24}
                    className='h-5 w-auto'
                    src='/images/home/post-reactions.svg'
                />
                <span className={cn('font-normal text-[#666]', screenSize === 'mobile' ? 'hidden' : 'text-xs')}>
                    {formatCount(profile.likes, 'like')}
                </span>
            </div>
            <div className='flex items-center justify-end gap-2'>
                {[formatCount(profile.comments, 'comment'), '•', formatCount(profile.reposts, 'repost')].map((text) => (
                    <span
                        key={text}
                        className={cn('font-normal text-[#666]', screenSize === 'mobile' ? 'text-[10px]' : 'text-xs')}>
                        {text}
                    </span>
                ))}
            </div>
        </div>
    )
}
