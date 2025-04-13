import { Footer } from "./_components/Footer";
import { WhitelistGeneratorHeader } from "./_components/WhitelistGeneratorHeader";
import WhitelistGenerator from "../components/WhitelistGenerator";

export default function Home() {
  return (
    <main className="min-h-screen py-32 space-y-2">
      <WhitelistGeneratorHeader />
      <WhitelistGenerator />
      <Footer />
    </main>
  );
}
