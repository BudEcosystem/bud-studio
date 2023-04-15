import dynamic from 'next/dynamic';

// const Embed = dynamic(() => import('@editorjs/embed'), { ssr: false });
// const Table = dynamic(() => import('@editorjs/table'), { ssr: false });
// const List = dynamic(() => import('@editorjs/list'), { ssr: false });
// const Warning = dynamic(() => import('@editorjs/warning'), { ssr: false });
// const Code = dynamic(() => import('@editorjs/code'), { ssr: false });
// const LinkTool = dynamic(() => import('@editorjs/link'), { ssr: false });
// const Image = dynamic(() => import('@editorjs/image'), { ssr: false });
// const Raw = dynamic(() => import('@editorjs/raw'), { ssr: false });
// const Header = dynamic(() => import('@editorjs/header'), { ssr: false });
// const Quote = dynamic(() => import('@editorjs/quote'), { ssr: false });
// const Marker = dynamic(() => import('@editorjs/marker'), { ssr: false });
// const CheckList = dynamic(() => import('@editorjs/checklist'), { ssr: false });
// const Delimiter = dynamic(() => import('@editorjs/delimiter'), { ssr: false });
// const InlineCode = dynamic(() => import('@editorjs/inline-code'), { ssr: false });
// const SimpleImage = dynamic(() => import('@editorjs/simple-image'), { ssr: false });
// const CodeBox = dynamic(() => import('@bomdi/codebox'), { ssr: false });

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import CodeBox from '@bomdi/codebox'
import AnyButton from "editorjs-button"



export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  codeBox: CodeBox,
  anyButton: AnyButton,
}


// Image 
// https://medium.com/@sfazleyrabbi/next-js-editor-js-complete-setup-guide-7136c8bb694e