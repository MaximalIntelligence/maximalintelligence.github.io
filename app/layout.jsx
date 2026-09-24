import "./style.css"

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
        <body>{children}</body>
      </html>
    );
  }