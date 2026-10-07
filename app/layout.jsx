import "./style.css"

import { Logo, Header } from "../components/header";

export const metadata = {
    metadataBase: new URL("https://maximalintelligence.com"),
    title: {
      default: "Maximal Intelligence",
      template: "%s · Maximal Intelligence",
    },
    description: "Build your data moat.",
    openGraph: {
      type: "website",
      siteName: "Maximal Intelligence",
      title: "Maximal Intelligence",
      description: "Build your data moat.",
      url: "/",
      images: [{ url: "/og.png", width: 1774, height: 334, alt: "Maximal Intelligence: Natural, Artificial, Maximal" }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };


export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
          <footer>
            <div id="footer-content">
              <div id="footer-left">
                <Logo />
              </div>
              <div id="footer-right">
                <span><a href="/privacy">Privacy Policy</a></span>

                Copyright © 2026 all rights reserved. Maximal Intelligence Corporation.
              </div>
            </div>
          </footer>
        </body>
      </html>
    );
  }