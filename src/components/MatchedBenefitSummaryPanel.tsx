import { ArrowUpRight, Phone } from 'lucide-react';
import {
  calculateBenefitTotals,
  formatKoreanCurrency,
} from '../data/buyeoPrograms';
import { MatchedProgram } from '../types/policy';

interface MatchedBenefitSummaryPanelProps {
  programs: MatchedProgram[];
  onSelectProgram: (program: MatchedProgram) => void;
}

export function MatchedBenefitSummaryPanel({
  programs,
  onSelectProgram,
}: MatchedBenefitSummaryPanelProps) {
  if (programs.length === 0) return null;

  const totals = calculateBenefitTotals(programs);

  return (
    <section
      aria-labelledby="matched-total-summary-heading"
      className="mt-12 rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E4E2DC]">
        <div>
          <p className="text-xs font-medium text-[#1B5E4A] mb-1">
            맞춤 혜택 총괄 요약
          </p>
          <h3
            id="matched-total-summary-heading"
            className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1A18]"
          >
            총 지원 가능한 금액 합계 및 담당부서 연락처
          </h3>
        </div>
        <p className="text-xs text-[#57554E] max-w-md">
          각 사업별 최대 지원 기준을 단순 합산한 참고 수치이며, 소득·자산 기준 및 중복지원 제한 여부는 담당부서에서 최종 확인합니다.
        </p>
      </div>

      {/* Total Support Amount Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E4E2DC] border-b border-[#E4E2DC] py-6">
        <div className="pb-4 md:pb-0 md:pr-6">
          <p className="text-xs font-medium text-[#57554E]">
            직접 지원금 합계 (현금·바우처·장려금)
          </p>
          <p className="mt-1.5 font-mono-num text-2xl sm:text-3xl font-bold text-[#1B5E4A] tabular-nums">
            {formatKoreanCurrency(totals.cashTotalWon)}
          </p>
          <p className="mt-1 text-xs text-[#78756E] tabular-nums">
            {totals.cashTotalWon.toLocaleString('ko-KR')}원 (매칭 {totals.programCount}건 기준)
          </p>
        </div>

        <div className="py-4 md:py-0 md:px-6">
          <p className="text-xs font-medium text-[#57554E]">
            저리 정책자금 융자 한도 합계
          </p>
          <p className="mt-1.5 font-mono-num text-2xl sm:text-3xl font-bold text-[#1A1A18] tabular-nums">
            {formatKoreanCurrency(totals.loanTotalWon)}
          </p>
          <p className="mt-1 text-xs text-[#78756E] tabular-nums">
            {totals.loanTotalWon > 0
              ? `${totals.loanTotalWon.toLocaleString('ko-KR')}원 (연 1.5~2.0% 저리 융자)`
              : '해당 조건 내 융자 사업 없음'}
          </p>
        </div>

        <div className="pt-4 md:pt-0 md:pl-6">
          <p className="text-xs font-medium text-[#57554E]">
            직접 지원 + 정책 융자 총 합산 규모
          </p>
          <p className="mt-1.5 font-mono-num text-2xl sm:text-3xl font-bold text-[#8C5A2B] tabular-nums">
            {formatKoreanCurrency(totals.combinedTotalWon)}
          </p>
          <p className="mt-1 text-xs text-[#78756E] tabular-nums">
            {totals.combinedTotalWon.toLocaleString('ko-KR')}원
          </p>
        </div>
      </div>

      {/* Matched Department Contacts Table */}
      <div className="mt-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h4 className="text-sm font-semibold text-[#1A1A18]">
            매칭된 사업별 지원금액 및 담당부서 연락처 ({programs.length}건)
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E4E2DC] text-xs font-semibold text-[#57554E]">
                <th scope="col" className="py-2.5 pr-3">
                  지원사업명
                </th>
                <th scope="col" className="py-2.5 px-3 whitespace-nowrap">
                  최대 지원금액(산정 기준)
                </th>
                <th scope="col" className="py-2.5 px-3 whitespace-nowrap">
                  담당부서
                </th>
                <th scope="col" className="py-2.5 px-3 whitespace-nowrap">
                  문의전화
                </th>
                <th scope="col" className="py-2.5 pl-3 text-right whitespace-nowrap">
                  상세
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFE9]">
              {programs.map((program) => {
                const numericWon = program.cashMaxWon + program.loanMaxWon;
                return (
                  <tr
                    key={program.id}
                    className="hover:bg-[#F8F7F3]/70 transition-colors"
                  >
                    <td className="py-3 pr-3">
                      <span className="text-xs text-[#1B5E4A] font-medium">
                        {program.stageLabel}
                      </span>
                      <p className="font-semibold text-[#1A1A18]">{program.title}</p>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <p className="font-mono-num font-bold text-[#1B5E4A] tabular-nums">
                        {formatKoreanCurrency(numericWon)}
                      </p>
                      <p className="text-xs text-[#78756E]">{program.amountBasis}</p>
                    </td>
                    <td className="py-3 px-3 text-xs font-medium text-[#1A1A18] whitespace-nowrap">
                      {program.department}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <a
                        href={`tel:${program.phone}`}
                        className="inline-flex items-center gap-1 font-mono-num text-xs font-semibold text-[#1A1A18] hover:text-[#1B5E4A] tabular-nums"
                      >
                        <Phone className="h-3 w-3 text-[#1B5E4A]" aria-hidden="true" />
                        <span>{program.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 pl-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectProgram(program)}
                        className="inline-flex items-center gap-1 rounded-md border border-[#D6D3CB] bg-[#F8F7F3] px-2.5 py-1 text-xs font-medium text-[#1A1A18] hover:border-[#1B5E4A] hover:text-[#1B5E4A] transition-colors cursor-pointer"
                      >
                        <span>요건</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
