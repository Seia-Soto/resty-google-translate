const fetch = require('node-fetch')
const tokenizer = require('google-translate-token')
const querystring = require('querystring')

const languages = require('./languages')

const translate = async opts => {
  try {
    opts.source = (opts.source || 'auto').toLowerCase()
    opts.target = (opts.target || '').toLowerCase()

    if (!opts.text) {
      return {
        error: 'There is no text to translate.'
      }
    }
    if (!opts.target) {
      return {
        error: 'Target language was not provided.'
      }
    }
    if (!languages[opts.source]) {
      return {
        error: 'Source language was not found.'
      }
    }
    if (!languages[opts.target]) {
      return {
        error: 'Target language was not found.'
      }
    }

    const data = {
      client: 'gtx',
      sl: opts.source,
      tl: opts.target,
      hl: opts.target,
      dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
      ie: 'UTF-8',
      oe: 'UTF-8',
      otf: 1,
      ssel: 0,
      tsel: 0,
      kc: 7,
      q: encodeURIComponent(opts.text)
    }
    const translated = {
      text: '',
      language: {
        expected: false,
        iso: ''
      },
      source: {
        autoCorrected: false,
        expected: false
      }
    }
    const token = await tokenizer.get(opts.text)

    data[token.name] = token.value

    const url = 'https://translate.google.com/translate_a/single?' + querystring.stringify(data)
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36'
      }
    })
    const json = await response.json()

    for (let i = 0, l = json[0].length; i < l; i++) {
      if (json[0][i][0]) {
        translated.text += decodeURIComponent(json[0][i][0])
      }
    }

    if (json[2] === json[8][0][0]) {
      translated.language.iso = json[2]
    } else {
      translated.language.expected = true
      translated.language.iso = body[8][0][0]
    }

    if (json[7] && json[7][0]) {
      const text = body[7][0]
        .replace(/<b><i>/g, '[')
        .replace(/<\/i><\/b>/g, ']')

      if (json[7][5]) {
        translated.source.autoCorrected = text
      } else {
        translated.source.expected = true
      }
    }

    return translated
  } catch (error) {
    return {
      error
    }
  }
}
const tts = async opts => {
  if (!opts.text) {
    return {
      error: 'There is no text to translate.'
    }
  }
  if (!opts.target) {
    return {
      error: 'Target language was not provided.'
    }
  }
  if (!languages[opts.target]) {
    return {
      error: 'Target language was not found.'
    }
  }

  const data = {
    client: 'gtx',
    tl: opts.language,
    hint: opts.hint || 'en',
    ie: 'UTF-8',
    ttsspeed: opts.speed || 1,
    idx: 0,
    total: 1,
    textlen: opts.text.length,
    q: opts.text
  }

  return 'https://translate.google.com/translate_tts?' + querystring.stringify(data)
}

module.exports.languages = languages
module.exports.translate = translate
module.exports.tts = tts
