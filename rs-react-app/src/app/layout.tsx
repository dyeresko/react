import type { FC, ReactNode } from "react";
import '@/index.css';


const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;