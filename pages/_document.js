import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <title>Plantmeter</title>
          <link href="https://fonts.googleapis.com/css2?family=Aleo&display=swap" rel="stylesheet" />
      </Head>      
      <body className="bg-[#e3e3e3] h-100%">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
