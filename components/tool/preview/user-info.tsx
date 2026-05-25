import type React from 'react'

import { DEFAULT_PREVIEW_PROFILE, DEFAULT_PROFILE_PHOTO, type PreviewProfile } from '@/lib/preview-profile'
import { Icon } from '@/components/icon'

interface UserInfoProps {
    profile: PreviewProfile
}

export const UserInfo: React.FC<UserInfoProps> = ({ profile }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-3'>
                    <span className='relative inline-block shrink-0'>
                        {/* eslint-disable-next-line @next/next/no-img-element -- dynamic user-provided URLs with fallback are easier with native img */}
                        <img
                            alt={`Profile photo of ${profile.name || DEFAULT_PREVIEW_PROFILE.name}`}
                            className='size-12 rounded-full object-cover'
                            src={profile.photoUrl || DEFAULT_PROFILE_PHOTO}
                            onError={(event) => {
                                event.currentTarget.src = DEFAULT_PROFILE_PHOTO
                            }}
                        />
                        <span className='absolute right-0 bottom-0 inline-flex size-4 items-center justify-center rounded-full bg-[#1052B8] text-white ring-2 ring-white'>
                            <Icon name='linkedinLogo' className='size-2.5' />
                        </span>
                    </span>
                    <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-semibold text-neutral-900'>
                            {profile.name || DEFAULT_PREVIEW_PROFILE.name}
                        </p>
                        <p className='truncate text-xs font-normal text-neutral-500'>
                            {profile.subheading || DEFAULT_PREVIEW_PROFILE.subheading}
                        </p>
                        <div className='flex items-center gap-1'>
                            <span className='text-xs font-normal text-neutral-500'>Now</span>
                            <span className='text-xs font-normal text-neutral-500'>•</span>
                            <Icon name='linkedInVisibility' className='size-3.5 text-neutral-500' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
