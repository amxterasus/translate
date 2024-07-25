import { prompter } from './prompts'
import { VERSION as DEFAULT_VERSION } from './config'
import { languageToLocale, post } from './utils'

const MAX_TEXT_PROMPT = 2000

interface Config {
    version?: number,
    model: string
}

export class Translator {
    public version: number
    public model: string
    private _token: string = ''

    constructor ({ version, model }: Config) {
        this.version = version || DEFAULT_VERSION
        this.model = model
    }

    setToken(token: string): this {
        this._token = token
        return this
    }

    private createMessage(text: string, language: string) {
        let locale = languageToLocale(language)
        if (text.length >= MAX_TEXT_PROMPT) throw Error('Text too long!')
        if (!Intl.DateTimeFormat.supportedLocalesOf(locale).length) throw Error('Unsupported language!')
        const messages = prompter(text, locale)
        return messages
    }

    public async translate(text: string, language: string): Promise<string> {
        const messages = this.createMessage(text, language)
        const body = JSON.stringify({ model: this.model, messages })

        const response = await post('/chat/completions', {
            headers: {
                'Authorization': `Bearer ${this._token}`
            },           
            body
        })

        const result = response.choices[0].message.content
        return result
    }
}
