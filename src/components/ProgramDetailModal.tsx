import { useEffect, useState } from 'react';
import { Check, Copy, Phone, X } from 'lucide-react';
import { MatchedProgram } from '../types/policy';

interface ProgramDetailModalProps {
  program: MatchedProgram | null;
  onClose: () => void;
}

export function ProgramDetailModal({ program, onClose }: ProgramDetailModalProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    setCopiedPhone(false);
  }, [program?.id]);

  useEffect(() => {
    if (!program) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [program, onClose]);

  if (!program) return null;

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(program.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-program-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E4E2DC]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57554E]">
              <span className="font-semibold text-[#1B5E4A]">{program.stageLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{program.benefitTypeLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{program.department}</span>
            </div>
            <h2
              id="modal-program-title"
              className="mt-2 font-serif-display text-xl sm:text-2xl font-bold text-[#1A1A18]"
            >
              {program.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="상세 창 닫기"
            className="rounded-lg border border-[#E4E2DC] p-2 text-[#57554E] hover:bg-[#F8F7F3] hover:text-[#1A1A18] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Benefit Banner */}
        <div className="mt-5 border-b border-[#E4E2DC] pb-5">
          <p className="text-xs font-medium text-[#57554E]">지원금액 및 혜택</p>
          <p className="mt-1 font-mono-num text-2xl font-bold text-[#1B5E4A] tabular-nums">
            {program.benefitDisplay}
          </p>
          <p className="mt-1 text-sm text-[#57554E]">{program.benefitSubtext}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#1A1A18]">
            {program.summary}
          </p>
        </div>

        {/* Structured Definition List */}
        <dl className="mt-5 divide-y divide-[#F1EFE9] text-sm">
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="font-semibold text-[#1A1A18]">적용된 주민 조건</dt>
            <dd className="sm:col-span-2 text-[#1B5E4A] font-medium">
              {program.matchReasons.join(' · ')}
            </dd>
          </div>
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="font-semibold text-[#1A1A18]">세부 지원대상 요건</dt>
            <dd className="sm:col-span-2">
              <ul className="space-y-1.5 text-[#57554E] list-disc pl-4">
                {program.eligibilityDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="font-semibold text-[#1A1A18]">신청 방법</dt>
            <dd className="sm:col-span-2 text-[#57554E]">{program.applicationMethod}</dd>
          </div>
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="font-semibold text-[#1A1A18]">신청 시기</dt>
            <dd className="sm:col-span-2 text-[#57554E]">{program.applicationPeriod}</dd>
          </div>
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="font-semibold text-[#1A1A18]">주요 구비서류</dt>
            <dd className="sm:col-span-2 text-[#57554E]">
              {program.requiredDocs.join(' · ')}
            </dd>
          </div>
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-center">
            <dt className="font-semibold text-[#1A1A18]">담당부서 및 연락처</dt>
            <dd className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-[#1A1A18]">{program.department}</span>
                <span className="mx-2 text-[#D6D3CB]">|</span>
                <span className="inline-flex items-center gap-1 font-mono-num font-semibold text-[#1B5E4A]">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {program.phone}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D6D3CB] bg-[#F8F7F3] px-3 py-1.5 text-xs font-medium text-[#1A1A18] hover:border-[#1B5E4A] transition-colors cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#1B5E4A]" aria-hidden="true" />
                    <span>번호 복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>번호 복사</span>
                  </>
                )}
              </button>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E4E2DC] pt-4">
          <p className="text-xs text-[#78756E]">
            세부 소득·거주기간 기준은 연도별 사업지침에 따라 변동될 수 있으므로 담당부서 확인을 권장합니다.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#1A1A18] px-4 py-2 text-xs font-semibold text-white hover:bg-[#33332F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
