import type {Metadata} from 'next';
import './globals.css';
import {SiteShell} from '@/components/site-shell';
import {ProgressProvider} from '@/lib/progress';
export const metadata:Metadata={title:'ReviewLab | CCAR-F Study Hub',description:'Practice and prepare for Claude Certified Architect – Foundations. Independent study materials.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ProgressProvider><SiteShell>{children}</SiteShell></ProgressProvider></body></html>}
