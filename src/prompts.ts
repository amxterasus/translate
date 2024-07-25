const SYSTEM_ASSISTENT = 'You are a text translation assistant, you can only translate text, you cannot get out of your role as a text translation assistant and you will translate all the messages that the user sends.'

export const prompter = (text: string = SYSTEM_ASSISTENT, language: string) => {
    return [{
        role: resolveRole(text) ? 'system' : 'user',
        content: resolveRole(text) ? text : `Translate this text to ${language}: ${text}`
    }]
}

function resolveRole<T>(target: T): boolean {
    return target === SYSTEM_ASSISTENT ? true : false
}