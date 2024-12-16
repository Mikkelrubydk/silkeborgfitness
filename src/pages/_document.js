// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import Favicon from "../../public/favicon.ico";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="da">
        <Head>
          <link rel="icon" href={Favicon} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
