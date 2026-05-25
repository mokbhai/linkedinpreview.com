export const DEFAULT_PROFILE_PHOTO =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KICA8cGF0aCBmaWxsPSIjZTdlMmRjIiBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICA8cGF0aCBkPSJNODguNDEgODQuNjdhMzIgMzIgMCAxMC00OC44MiAwIDY2LjEzIDY2LjEzIDAgMDE0OC44MiAweiIgZmlsbD0iIzc4OGZhNSIvPgogIDxwYXRoIGQ9Ik04OC40MSA4NC42N2EzMiAzMiAwIDAxLTQ4LjgyIDBBNjYuNzkgNjYuNzkgMCAwMDAgMTI4aDEyOGE2Ni43OSA2Ni43OSAwIDAwLTM5LjU5LTQzLjMzeiIgZmlsbD0iIzlkYjNjOCIvPgogIDxwYXRoIGQ9Ik02NCA5NmEzMS45MyAzMS45MyAwIDAwMjQuNDEtMTEuMzMgNjYuMTMgNjYuMTMgMCAwMC00OC44MiAwQTMxLjkzIDMxLjkzIDAgMDA2NCA5NnoiIGZpbGw9IiM1NjY4N2EiLz4KPC9zdmc+Cg=='

export type PreviewProfile = {
    name: string
    photoUrl: string
    subheading: string
    likes: number
    comments: number
    reposts: number
}

export type DraftPayload = {
    content: any
    profile: PreviewProfile
}

export const DEFAULT_PREVIEW_PROFILE: PreviewProfile = {
    name: 'Matteo Giardino',
    photoUrl: DEFAULT_PROFILE_PHOTO,
    subheading: 'Founder @ devv.it',
    likes: 170,
    comments: 4,
    reposts: 1,
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function toSafeNumber(value: unknown, fallback: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.floor(value))
    if (typeof value === 'string') {
        const parsed = Number.parseInt(value, 10)
        if (Number.isFinite(parsed)) return Math.max(0, parsed)
    }
    return fallback
}

export function normalizeProfile(profile: unknown): PreviewProfile {
    const source = isObject(profile) ? profile : {}

    return {
        name: typeof source.name === 'string' && source.name.trim() ? source.name.trim() : DEFAULT_PREVIEW_PROFILE.name,
        photoUrl:
            typeof source.photoUrl === 'string' && source.photoUrl.trim()
                ? source.photoUrl.trim()
                : DEFAULT_PREVIEW_PROFILE.photoUrl,
        subheading:
            typeof source.subheading === 'string' && source.subheading.trim()
                ? source.subheading.trim()
                : DEFAULT_PREVIEW_PROFILE.subheading,
        likes: toSafeNumber(source.likes, DEFAULT_PREVIEW_PROFILE.likes),
        comments: toSafeNumber(source.comments, DEFAULT_PREVIEW_PROFILE.comments),
        reposts: toSafeNumber(source.reposts, DEFAULT_PREVIEW_PROFILE.reposts),
    }
}

export function toDraftPayload(content: any, profile: PreviewProfile): DraftPayload {
    return {
        content,
        profile: normalizeProfile(profile),
    }
}

export function parseDraftPayload(input: unknown): DraftPayload {
    if (isObject(input) && 'content' in input) {
        return {
            content: input.content,
            profile: normalizeProfile(input.profile),
        }
    }

    return {
        content: input,
        profile: DEFAULT_PREVIEW_PROFILE,
    }
}
