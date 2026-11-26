import { Printer } from 'lucide-react';

interface HeaderProps {
  onOpenPrintModal: () => void;
}

export function Header({ onOpenPrintModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E2DC] bg-[#F8F7F3]/95 backdrop-blur-sm no-print">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="font-serif-display text-lg font-bold tracking-tight text-[#1A1A18] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] rounded"
        >
          부여군 생애주기 지원안내
        </a>

        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57554E]"
        >
          <a
            href="#condition-section"
            className="whitespace-nowrap shrink-0 hover:text-[#1A1A18] hover:underline underline-offset-4 transition-colors"
          >
            맞춤 조건 선택
          </a>
          <a
            href="#results-section"
            className="whitespace-nowrap shrink-0 hover:text-[#1A1A18] hover:underline underline-offset-4 transition-colors"
          >
            생애주기별 사업
          </a>
          <a
            href="#results-section"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('results-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap shrink-0 hover:text-[#1A1A18] hover:underline underline-offset-4 transition-colors"
          >
            지원금액 한눈에
          </a>
          <a
            href="#departments-section"
            className="whitespace-nowrap shrink-0 hover:text-[#1A1A18] hover:underline underline-offset-4 transition-colors"
          >
            담당부서 문의처
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B5E4A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#144738] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] focus-visible:ring-offset-2 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>맞춤 요약 인쇄</span>
          </button>
        </div>
      </div>
    </header>
  );
}
