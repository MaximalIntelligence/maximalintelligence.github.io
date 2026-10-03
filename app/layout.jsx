import "./style.css"

import { Logo, Header } from "../components/header";

export const metadata = {
    title: {
      default: "Maximal Intelligence",
      template: "%s · Maximal Intelligence",
    },
    description: "Build your data moat.",
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
            </div>
          </footer>
        </body>
      </html>
    );
  }