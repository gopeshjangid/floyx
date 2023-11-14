import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Floyx Login',
  description: 'Floyx Login',
};

export default function Page({ children }: { children: React.ReactNode }) {
  return children;
}