//import { Inter } from 'next/font/google';  // Using Inter font instead of Geist
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        {children}
        </body>
        </html>
    );
}
