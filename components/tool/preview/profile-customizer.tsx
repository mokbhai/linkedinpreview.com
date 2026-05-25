'use client'

import type React from 'react'

import { DEFAULT_PREVIEW_PROFILE, type PreviewProfile } from '@/lib/preview-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileCustomizerProps {
    profile: PreviewProfile
    onProfileChange: (profile: PreviewProfile) => void
}

const numberFields = [
    { key: 'likes', label: 'Likes' },
    { key: 'comments', label: 'Comments' },
    { key: 'reposts', label: 'Reposts' },
] as const

export const ProfileCustomizer: React.FC<ProfileCustomizerProps> = ({ profile, onProfileChange }) => {
    const handleTextChange =
        (key: 'name' | 'subheading' | 'photoUrl') => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            onProfileChange({
                ...profile,
                [key]: value,
            })
        }

    const handleNumberChange =
        (key: 'likes' | 'comments' | 'reposts') => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number.parseInt(event.target.value, 10)
            onProfileChange({
                ...profile,
                [key]: Number.isFinite(value) && value >= 0 ? value : 0,
            })
        }

    return (
        <div className='mx-auto w-full max-w-[555px] rounded-lg border border-black/8 bg-white p-3'>
            <div className='mb-2 flex items-center justify-between'>
                <h3 className='text-xs font-semibold text-neutral-700'>Customize profile preview</h3>
                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => onProfileChange(DEFAULT_PREVIEW_PROFILE)}>
                    Reset
                </Button>
            </div>

            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                <div className='space-y-1'>
                    <Label htmlFor='preview-name'>Name</Label>
                    <Input id='preview-name' value={profile.name} onChange={handleTextChange('name')} />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor='preview-subheading'>Subheading</Label>
                    <Input
                        id='preview-subheading'
                        value={profile.subheading}
                        onChange={handleTextChange('subheading')}
                    />
                </div>
                <div className='space-y-1 md:col-span-2'>
                    <Label htmlFor='preview-photo'>Photo URL</Label>
                    <Input
                        id='preview-photo'
                        type='url'
                        value={profile.photoUrl}
                        onChange={handleTextChange('photoUrl')}
                        placeholder='https://example.com/profile.jpg'
                    />
                </div>
                {numberFields.map((field) => (
                    <div key={field.key} className='space-y-1'>
                        <Label htmlFor={`preview-${field.key}`}>{field.label}</Label>
                        <Input
                            id={`preview-${field.key}`}
                            type='number'
                            min={0}
                            step={1}
                            value={profile[field.key]}
                            onChange={handleNumberChange(field.key)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
