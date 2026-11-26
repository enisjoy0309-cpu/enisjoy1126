import { useEffect, useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import {
  calculateBenefitTotals,
  CHILDREN_LABELS,
  EMPLOYMENT_LABELS,
  FARMING_LABELS,
  formatKoreanCurrency,
  GENDER_LABELS,
  MARITAL_LABELS,
} from '../data/buyeoPrograms';
import { MatchedProgram, ResidentProfile } from '../types/policy';

interface PrintSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ResidentProfile;
  programs: MatchedProgram[];
}

export function PrintSummaryModal({
  isOpen,
  onClose,
  profile,
  programs,
}: PrintSummaryModalProps) {
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totals = calculateBenefitTotals(programs);
  const profileLine = [
    `만 ${profile.age}세`,
    GENDER_LABELS[profile.gender],
    MARITAL_LABELS[profile.maritalStatus],
    profile.children.map((c) => CHILDREN_LABELS[c]).join(', '),
    EMPLOYMENT_LABELS[profile.employment],
    FARMING_LABELS[profile.farming],
  ].join(' · ');

  const handleCopySummary = async () => {
    const lines = [
      '[부여군 생애주기별 맞춤 지원안내 요약]',
      `선택 조건: ${profileLine}`,
      `해당 사업: 총 ${programs.length}건`,
      `직접 지원금 최대 합계: ${formatKoreanCurrency(totals.cashTotalWon)} / 정책 융자 한도 합계: ${formatKoreanCurrency(totals.loanTotalWon)}`,
      '',
      ...programs.map(
        (p, idx) =>
          `${idx + 1}. [${p.stageLabel}] ${p.title}\n   - 지원금액: ${p.benefitDisplay}\n   - 담당부서: ${p.department} (${p.phone})`
      ),
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-[#E4E2DC] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E4E2DC] p-6">
          <div>
            <p className="text-xs font-medium text-[#1B5E4A]">
              부여군청 전략사업과 인구청년팀
            </p>
            <h2
              id="print-modal-title"
              className="mt-1 font-serif-display text-xl font-bold text-[#1A1A18]"
            >
              내 맞춤 지원사업 요약표
            </h2>
            <p className="mt-1 text-xs text-[#57554E]">{profileLine}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="요약 창 닫기"
            className="rounded-lg border border-[#E4E2DC] p-2 text-[#57554E] hover:bg-[#F8F7F3] hover:text-[#1A1A18] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {programs.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#57554E]">
              현재 조건에 해당하는 지원사업이 없습니다. 조건을 조정해 주세요.
            </p>
          ) : (
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E4E2DC] bg-[#F8F7F3] text-xs font-semibold text-[#57554E]">
                  <th className="py-2.5 px-3 whitespace-nowrap">분야</th>
                  <th className="py-2.5 px-3">사업명</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">지원금액·혜택</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">담당부서 · 연락처</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E2DC]">
                {programs.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-3 align-top font-medium text-[#1B5E4A] whitespace-nowrap">
                      {p.stageLabel}
                    </td>
                    <td className="py-3 px-3 align-top font-semibold text-[#1A1A18]">
                      {p.title}
                    </td>
                    <td className="py-3 px-3 align-top font-mono-num font-bold text-[#1B5E4A] tabular-nums">
                      {p.benefitDisplay}
                    </td>
                    <td className="py-3 px-3 align-top text-xs text-[#57554E]">
                      <div className="font-medium text-[#1A1A18]">{p.department}</div>
                      <div className="font-mono-num mt-0.5">{p.phone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E2DC] bg-[#F8F7F3] px-6 py-4 rounded-b-xl">
          <div className="text-xs text-[#57554E] tabular-nums">
            총 <strong className="font-mono-num text-[#1A1A18]">{programs.length}건</strong>
            <span className="mx-2 text-[#D6D3CB]">·</span>
            직접 지원금 최대{' '}
            <strong className="font-mono-num text-[#1B5E4A]">
              {formatKoreanCurrency(totals.cashTotalWon)}
            </strong>
            {totals.loanTotalWon > 0 && (
              <>
                <span className="mx-2 text-[#D6D3CB]">·</span>
                융자 한도{' '}
                <strong className="font-mono-num text-[#1A1A18]">
                  {formatKoreanCurrency(totals.loanTotalWon)}
                </strong>
              </>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D6D3CB] bg-white px-3.5 py-2 text-xs font-semibold text-[#1A1A18] hover:border-[#1B5E4A] transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#1B5E4A]" aria-hidden="true" />
                  <span>목록 복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>텍스트 복사</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B5E4A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#144738] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>인쇄 / PDF 저장</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
