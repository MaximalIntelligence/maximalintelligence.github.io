import "./style.css"

import { Logo } from "../components/header";

export const metadata = {
    title: {
      default: "Maximal Intelligence",
      template: "%s · Maximal Intelligence",
    },
    description: "A description of my site.",
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