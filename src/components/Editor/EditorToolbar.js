
import React from 'react'
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
const BaseBlock = Quill.import('blots/block/embed')

// Register inline styling
const DirectionAttribute = Quill.import('attributors/attribute/direction')
Quill.register(DirectionAttribute, true)

const AlignClass = Quill.import('attributors/class/align')
Quill.register(AlignClass, true)

const BackgroundClass = Quill.import('attributors/class/background')
Quill.register(BackgroundClass, true)

const ColorClass = Quill.import('attributors/class/color')
Quill.register(ColorClass, true)

const DirectionClass = Quill.import('attributors/class/direction')
Quill.register(DirectionClass, true)

const FontClass = Quill.import('attributors/class/font')
Quill.register(FontClass, true)

const SizeClass = Quill.import('attributors/class/size')
Quill.register(SizeClass, true)

const AlignStyle = Quill.import('attributors/style/align')
Quill.register(AlignStyle, true)

const BackgroundStyle = Quill.import('attributors/style/background')
Quill.register(BackgroundStyle, true)

const ColorStyle = Quill.import('attributors/style/color')
Quill.register(ColorStyle, true)

const DirectionStyle = Quill.import('attributors/style/direction')
Quill.register(DirectionStyle, true)

const FontStyle = Quill.import('attributors/style/font')
Quill.register(FontStyle, true)

const SizeStyle = Quill.import('attributors/style/size')
Quill.register(SizeStyle, true)

const CodeBlock = Quill.import('formats/code-block')
class InlineStyleCodeBlock extends CodeBlock {
  static create (value) {
    const node = super.create()
    node.setAttribute('style', 'background-color: #23241f; color: #f8f8f2;' +
      ' margin: 0px; padding: 0px;' +
      ' border-radius: 3px; overflow: visible; white-space: pre-wrap;' +
      ' counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7;')
    return node
  }
}
InlineStyleCodeBlock.blotName = 'code-block'
InlineStyleCodeBlock.tagName = 'pre'
Quill.register(InlineStyleCodeBlock, true)

const Blockquote = Quill.import('formats/blockquote')
class InlineStyleBlockquote extends Blockquote {
  static create (value) {
    const node = super.create()
    node.setAttribute('style', 'background: #f9f9f9; border-left: 5px solid #1a1a1a;' +
      'margin: 1.5em 10px; padding: 0.5em 10px;')
    return node
  }
}
InlineStyleBlockquote.blotName = 'blockquote'
InlineStyleBlockquote.tagName = 'blockquote'
Quill.register(InlineStyleBlockquote, true)

class TwitterBlot extends BaseBlock {
  static create (data) {
    const node = super.create(data)
    function buildInnerHtml (data) {
      window.twitter = function () {
        const loadScript = function (url) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = url
            script.onload = function () {
              resolve(true)
            }
            script.onerror = function () {
              reject(new Error('Unable to load script'))
            }
            document.head.appendChild(script)
          })
        }
        if (!window.twttr) {
          loadScript('//platform.twitter.com/widgets.js').then(() => {
            setTimeout(() => {
              window.twttr.widgets.load()
            }, 100)
          })
        } else {
          setTimeout(() => {
            window.twttr.widgets.load()
          }, 100)
        }
      }
      return `
        <div contenteditable="false" style="display: flex; margin: auto; width: 90%;">
          <blockquote class="twitter-tweet"><a tabindex="-1" href="${data.url}"></a>Twitter</blockquote>
          <img src="*" onError="event.stopPropagation(); event.preventDefault(); window.twitter();" style="display: none;"/>
        </div>
      `
    }

    const innerHTML = buildInnerHtml(data)
    node.innerHTML = innerHTML
    node.setAttribute('contenteditable', false)
    node.setAttribute('data-url', data.url)
    return node
  }

  static value (domNode) {
    const { url } = domNode.dataset
    return { url }
  }

  index () {
    return 1
  }
}

TwitterBlot.blotName = 'twitter'
TwitterBlot.className = 'ql-twitter'
TwitterBlot.tagName = 'div'

Quill.register({
  'formats/twitter': TwitterBlot
})

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
}

// Formats objects for setting up the Quill editor
export const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'header',
  'align',
  'link',
  'code-block',
  'twitter',
  'video',
  'list',
  'blockquote',
  'image'
]

// 'blockquote',
// 'list',
// 'bullet',
// 'image',
//   'video',

const EditorToolbar = () => (
  <div id='toolbar'>
    <span className='ql-formats'>
      <button className='ql-header' value='1' />
      <button className='ql-header' value='2' />
      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-code-block' />
      <button className='ql-blockquote' />
    </span>
    <span className='ql-formats'>
      <button className='ql-list' value='ordered' />
      <button className='ql-list' value='bullet' />
      <select className='ql-align' />
    </span>
    <span className='ql-formats'>
      <button className='ql-link' />
      <button className='ql-image' />
      <button className='ql-video' />
    </span>
  </div>
)

export default EditorToolbar
