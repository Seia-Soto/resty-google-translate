# resty-google-translate

Unofficial `google-translate-api` via web client.

- [Original forked repository](https://github.com/Seia-Soto/google-translate-query)

## Table of Contents

- [Installation](#Installation)
- [Documentation](#documentation)

----

## Installation

```sh
npm i resty-google-translate
```

- via `yarn-pkg`

```sh
yarn add resty-google-translate
```

## Documentation

### languages

The available language list.

[View on source](/languages.js)

### translate

Translate the text.

```js
translate({
  text: '안녕'
  source: 'auto',
  target: 'en'
})

{
  text: 'Hello',
  language: {
    expected: false,
    iso: 'en'
  },
  source: {
    autoCorrected: false,
    expected: false
  }
}
```

### tts

Get the URL of Google TTS audio.

```js
tts({
  text: '안녕하세요',
  target: 'ko',
  hint: 'en', // NOTE: Hint language
  ttsspeed: 1
})

'https://translate.google.com/translate_tts?ie=UTF-8&q=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94&tl=ko&total=1&idx=0&textlen=2&client=gtx&ttsspeed=1&hint=en'
```
