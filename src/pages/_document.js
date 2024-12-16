import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="da">
        <Head>
          {/* Link til faviconet */}
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <body></body>
      </Html>
    );
  }
}

export default MyDocument;
