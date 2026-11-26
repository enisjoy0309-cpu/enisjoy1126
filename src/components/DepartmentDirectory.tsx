import { MapPin, Phone } from 'lucide-react';
import { DepartmentContact } from '../types/policy';

interface DepartmentDirectoryProps {
  departments: DepartmentContact[];
}

export function DepartmentDirectory({ departments }: DepartmentDirectoryProps) {
  return (
    <section
      id="departments-section"
      className="border-t border-[#E4E2DC] bg-white no-print"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E4E2DC]">
          <div>
            <p className="text-xs font-medium text-[#1B5E4A] mb-1">
              03. 부여군청 부서별 안내
            </p>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1A18]">
              담당부서 및 상담 문의처
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#57554E]">
            주소지 읍·면 행정복지센터 또는 아래 군청 담당부서에서 방문·전화 상담이 가능합니다.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="flex flex-col justify-between rounded-xl border border-[#E4E2DC] bg-[#F8F7F3]/60 p-5"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-[#1A1A18]">
                    {dept.division}{' '}
                    <span className="font-semibold text-[#1B5E4A]">{dept.team}</span>
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#57554E]">
                  {dept.mainDuties}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E4E2DC] flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1 text-[#57554E]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#78756E]" aria-hidden="true" />
                  <span>{dept.location}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-mono-num font-semibold text-[#1A1A18] tabular-nums shrink-0">
                  <Phone className="h-3.5 w-3.5 text-[#1B5E4A]" aria-hidden="true" />
                  {dept.phone}
                </span>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-10 pt-6 border-t border-[#E4E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78756E]">
          <p>
            충청남도 부여군 부여읍 사비로 33 · 부여군청 전략사업과 인구청년팀 (대표전화 041-830-2263)
          </p>
          <p>
            본 안내는 주민 편의를 위한 통합 조회 서비스이며, 최종 지원 여부는 부서별 사업지침을 따릅니다.
          </p>
        </footer>
      </div>
    </section>
  );
}
