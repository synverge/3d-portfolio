import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

// Admin pages get their own layout — the root layout's header/footer is
// suppressed via the ConditionalShell wrapper added to the root layout.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
