import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "MindFlash Admin Panel",
  description: "MindFlash Admin Panel",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full bg-white`}>
      <body className="h-full">
        {props.children}
        {props.modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
