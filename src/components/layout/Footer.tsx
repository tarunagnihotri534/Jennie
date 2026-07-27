import Link from "next/link";
import { Anchor, Star, ShieldCheck } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="w-full bg-[#e8e1d5] dark:bg-[#141312] border-t border-[#dcd3c3] dark:border-[#2d2b27] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Logo & License */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#e8542c] text-white">
            <Anchor className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
              {PRODUCT_CONFIG.name}
            </span>
            <span className="text-xs font-mono text-[#6e6a64] dark:text-[#8e8980]">
              {PRODUCT_CONFIG.footer.copyright}
            </span>
          </div>
        </div>

        {/* Center: Star History Mention */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eae3d5] dark:bg-[#252320] text-xs font-mono text-[#5e5a54] dark:text-[#a39e93] border border-[#dcd3c3] dark:border-[#38342e]">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{PRODUCT_CONFIG.footer.starHistoryText}</span>
        </div>

        {/* Right: Quick Links & License Badge */}
        <div className="flex items-center gap-6 text-xs font-mono font-medium">
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <Link
            href="/docs"
            className="text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] transition-colors"
          >
            Documentation
          </Link>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            MIT LICENSE
          </span>
        </div>

      </div>
    </footer>
  );
}
