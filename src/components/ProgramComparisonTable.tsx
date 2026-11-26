import { ArrowUpRight } from 'lucide-react';
import { MatchedProgram } from '../types/policy';

interface ProgramComparisonTableProps {
  programs: MatchedProgram[];
  onSelect: (program: MatchedProgram) => void;
}

export function ProgramComparisonTable({
  programs,
  onSelect,
}: ProgramComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E4E2DC] bg-white">
      <table className="w-full min-w-[780px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#E4E2DC] bg-[#F8F7F3] text-xs font-semibold text-[#57554E]">
            <th scope="col" className="py-3.5 pl-5 pr-3 whitespace-nowrap">
              생애주기
            </th>
            <th scope="col" className="py-3.5 px-3">
              지원사업명
            </th>
            <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
              지원금액 · 혜택
            </th>
            <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
              담당부서
            </th>
            <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
              문의전화
            </th>
            <th scope="col" className="py-3.5 pl-3 pr-5 text-right whitespace-nowrap">
              상세
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4E2DC]">
          {programs.map((program) => (
            <tr
              key={program.id}
              className="hover:bg-[#F8F7F3]/80 transition-colors"
            >
              <td className="py-3.5 pl-5 pr-3 align-top text-xs font-medium text-[#1B5E4A] whitespace-nowrap">
                {program.stageLabel}
              </td>
              <td className="py-3.5 px-3 align-top">
                <p className="font-semibold text-[#1A1A18]">{program.title}</p>
                <p className="mt-0.5 text-xs text-[#57554E]">
                  {program.matchReasons.join(' · ')}
                </p>
              </td>
              <td className="py-3.5 px-3 align-top">
                <p className="font-mono-num font-bold text-[#1B5E4A] tabular-nums whitespace-nowrap">
                  {program.benefitDisplay}
                </p>
                <p className="mt-0.5 text-xs text-[#57554E]">
                  {program.benefitSubtext}
                </p>
              </td>
              <td className="py-3.5 px-3 align-top text-xs font-medium text-[#1A1A18] whitespace-nowrap">
                {program.department}
              </td>
              <td className="py-3.5 px-3 align-top font-mono-num text-xs text-[#57554E] tabular-nums whitespace-nowrap">
                {program.phone}
              </td>
              <td className="py-3.5 pl-3 pr-5 align-top text-right whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onSelect(program)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#D6D3CB] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1A1A18] hover:border-[#1B5E4A] hover:text-[#1B5E4A] transition-colors cursor-pointer"
                >
                  <span>보기</span>
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
