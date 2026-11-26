import { ArrowUpRight, Phone } from 'lucide-react';
import { MatchedProgram } from '../types/policy';

interface ProgramCardProps {
  program: MatchedProgram;
  onSelect: (program: MatchedProgram) => void;
}

export function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-white p-6 transition-colors hover:border-[#1B5E4A]/50">
      <div>
        {/* Quiet 1-line unboxed text kicker (zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-[#57554E]">
          <span className="font-medium text-[#1B5E4A]">{program.stageLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{program.benefitTypeLabel}</span>
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug text-[#1A1A18] group-hover:text-[#1B5E4A] transition-colors">
          {program.title}
        </h3>

        {/* Benefit Amount Highlight (hairline separated, no inner box card) */}
        <div className="mt-4 border-y border-[#F1EFE9] py-3">
          <p className="text-[11px] font-medium text-[#78756E]">지원금액 · 혜택 규모</p>
          <p className="mt-0.5 font-mono-num text-lg font-bold text-[#1B5E4A] tabular-nums">
            {program.benefitDisplay}
          </p>
          <p className="mt-0.5 text-xs text-[#57554E]">{program.benefitSubtext}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#57554E]">
          {program.summary}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E4E2DC]">
        <div className="text-xs text-[#57554E]">
          <span className="font-medium text-[#1A1A18]">충족 조건:</span>{' '}
          {program.matchReasons.join(' · ')}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#1A1A18]">
              {program.department}
            </p>
            <p className="mt-0.5 flex items-center gap-1 font-mono-num text-xs text-[#57554E]">
              <Phone className="h-3 w-3 shrink-0 text-[#1B5E4A]" aria-hidden="true" />
              <span>{program.phone}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(program)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D6D3CB] bg-[#F8F7F3] px-3.5 py-2 text-xs font-semibold text-[#1A1A18] hover:bg-[#1B5E4A] hover:text-white hover:border-[#1B5E4A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A]"
          >
            <span>상세 보기</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
