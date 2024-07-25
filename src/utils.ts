import { OPENAI_API } from './config'

/**
 * Request the OpenAI API
 * @param path - The API endpoint path
 * @param options - The request options
 * @returns A Promise that resolves when the message is retreived
 */
export const post = async (path: string, options: RequestInit) => {
    options.method = 'POST'
    const url = new URL(OPENAI_API + path)
    const response = await fetch(url, options)
    const data = await response.json()
    if (!response.ok) throw new Error (`Error: ${response.status} ${data.error.message}`)
    
    return data
}

const languageMap: { [key: string]: string } = {
    'english': 'en-US',
    'spanish': 'es-ES',
    'french': 'fr-FR',
    'german': 'de-DE',
    'italian': 'it-IT',
    'portuguese': 'pt-PT',
    'chinese': 'zh-CN',
    'japanese': 'ja-JP',
    'korean': 'ko-KR',
    'russian': 'ru-RU',
    'arabic': 'ar-SA',
}

export const languageToLocale = (language: string): string => {
    const locale = language.toLowerCase().trim()
    return languageMap[locale] || 'en-US'
}