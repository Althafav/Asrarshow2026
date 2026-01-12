import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />

        {/* Proxima Nova (Adobe Fonts) */}
        <link rel="stylesheet" href="https://use.typekit.net/fdr3doo.css" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');
              snaptr('init', '9872f26c-77ca-4fbc-b996-f58ffbcb073f', {});
              snaptr('track', 'PAGE_VIEW');
            `,
          }}
        />

        <Script id="gtm-script" strategy="afterInteractive">
          {`
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K2TQSHX5');
          `}
        </Script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2TQSHX5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Script
          type="text/javascript"
          src={`/assets/js/main.js`}
          strategy="beforeInteractive"
        ></Script>

        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`/assets/js/pixel.js`}
        ></Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1252003300104440&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </Html>
  );
}
