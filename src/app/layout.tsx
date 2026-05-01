import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "중소형 교회 홈페이지 플랫폼",
  description: "교회 홈페이지, 교인관리, 헌금관리, 마스터 운영 시스템 MVP"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
