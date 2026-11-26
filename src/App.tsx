import { useMemo, useState } from 'react';
import { LayoutGrid, RotateCcw, Search, Table } from 'lucide-react';
import { ConditionSelector } from './components/ConditionSelector';
import { DepartmentDirectory } from './components/DepartmentDirectory';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MatchedBenefitSummaryPanel } from './components/MatchedBenefitSummaryPanel';
import { PrintSummaryModal } from './components/PrintSummaryModal';
import { ProgramCard } from './components/ProgramCard';
import { ProgramComparisonTable } from './components/ProgramComparisonTable';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import {
  BUYEO_PROGRAMS,
  calculateBenefitTotals,
  CHILDREN_LABELS,
  DEPARTMENT_DIRECTORY,
  EMPLOYMENT_LABELS,
  FARMING_LABELS,
  formatKoreanCurrency,
  GENDER_LABELS,
  MARITAL_LABELS,
  matchPrograms,
  QUICK_PRESETS,
  STAGE_LABELS,
  STAGE_ORDER,
} from './data/buyeoPrograms';
import {
  LifecycleStage,
  MatchedProgram,
  QuickPreset,
  ResidentProfile,
} from './types/policy';

const DEFAULT_PROFILE: ResidentProfile = {
  age: 30,
  gender: 'all',
  maritalStatus: 'single',
  children: ['none'],
  employment: 'worker',
  farming: 'none',
};

type ViewMode = 'lifecycle' | 'table';

export function App() {
  const [profile, setProfile] = useState<ResidentProfile>(DEFAULT_PROFILE);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<LifecycleStage | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('lifecycle');
  const [selectedProgram, setSelectedProgram] = useState<MatchedProgram | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const matchedPrograms = useMemo(() => matchPrograms(profile), [profile]);

  const stageCounts = useMemo(() => {
    const counts: Partial<Record<LifecycleStage, number>> = {};
    for (const p of matchedPrograms) {
      counts[p.stage] = (counts[p.stage] ?? 0) + 1;
    }
    return counts;
  }, [matchedPrograms]);

  const activeStages = useMemo(
    () => STAGE_ORDER.filter((stage) => (stageCounts[stage] ?? 0) > 0),
    [stageCounts]
  );

  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return matchedPrograms.filter((p) => {
      if (stageFilter !== 'all' && p.stage !== stageFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.benefitDisplay.toLowerCase().includes(q) ||
        p.stageLabel.toLowerCase().includes(q)
      );
    });
  }, [matchedPrograms, stageFilter, searchQuery]);

  const groupedByStage = useMemo(() => {
    const map = new Map<LifecycleStage, MatchedProgram[]>();
    for (const stage of STAGE_ORDER) {
      const items = filteredPrograms.filter((p) => p.stage === stage);
      if (items.length > 0) {
        map.set(stage, items);
      }
    }
    return map;
  }, [filteredPrograms]);

  const benefitBreakdown = useMemo(() => {
    const cashOrVoucher = matchedPrograms.filter(
      (p) => p.benefitType === 'cash' || p.benefitType === 'voucher'
    ).length;
    const loanOrService = matchedPrograms.filter(
      (p) => p.benefitType === 'loan' || p.benefitType === 'service'
    ).length;
    return { cashOrVoucher, loanOrService };
  }, [matchedPrograms]);

  const handleProfileChange = (next: ResidentProfile) => {
    setProfile(next);
    setActivePresetId(null);
    setStageFilter('all');
  };

  const handleSelectPreset = (preset: QuickPreset) => {
    setProfile(preset.profile);
    setActivePresetId(preset.id);
    setStageFilter('all');
    setSearchQuery('');
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    setActivePresetId(null);
    setStageFilter('all');
    setSearchQuery('');
  };

  const printProfileSummary = [
    `만 ${profile.age}세`,
    GENDER_LABELS[profile.gender],
    MARITAL_LABELS[profile.maritalStatus],
    profile.children.map((c) => CHILDREN_LABELS[c]).join(', '),
    EMPLOYMENT_LABELS[profile.employment],
    FARMING_LABELS[profile.farming],
  ].join(' · ');

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#1A1A18]">
      <Header onOpenPrintModal={() => setIsPrintModalOpen(true)} />

      <main>
        <HeroBanner
          presets={QUICK_PRESETS}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
          totalCatalogCount={BUYEO_PROGRAMS.length}
          currentProfile={profile}
        />

        <ConditionSelector
          profile={profile}
          onChange={handleProfileChange}
          onReset={handleReset}
          matchedCount={matchedPrograms.length}
        />

        {/* Results Section */}
        <section
          id="results-section"
          className="mx-auto max-w-[1200px] px-6 pb-16 no-print"
        >
          {/* Section Header + Quantitative Summary Strip */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#E4E2DC]">
            <div>
              <p className="text-xs font-medium text-[#1B5E4A] mb-1">
                02. 생애주기별 맞춤 결과
              </p>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1A18]">
                신청 가능한 부여군 지원사업 안내
              </h2>
            </div>

            {/* Clean Tabular KPI Strip (No Pills, No Nested Card Boxes) */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 text-left lg:text-right">
              <div>
                <span className="text-xs text-[#57554E]">맞춤 지원사업</span>
                <p className="mt-0.5 font-mono-num text-xl font-bold text-[#1B5E4A] tabular-nums">
                  {matchedPrograms.length}건
                </p>
              </div>
              <div>
                <span className="text-xs text-[#57554E]">해당 생애주기</span>
                <p className="mt-0.5 font-mono-num text-xl font-bold text-[#1A1A18] tabular-nums">
                  {activeStages.length}개 분야
                </p>
              </div>
              <div>
                <span className="text-xs text-[#57554E]">현금·바우처 / 융자·서비스</span>
                <p className="mt-0.5 font-mono-num text-xl font-bold text-[#1A1A18] tabular-nums">
                  {benefitBreakdown.cashOrVoucher} / {benefitBreakdown.loanOrService}
                </p>
              </div>
            </div>
          </div>

          {/* Filter Toolbar: Stage Tabs + Search + View Switch */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full md:max-w-xs">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78756E]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="사업명, 지원금, 부서명 검색"
                  aria-label="지원사업 검색"
                  className="w-full rounded-lg border border-[#D6D3CB] bg-white py-2 pl-9 pr-3 text-sm text-[#1A1A18] placeholder:text-[#78756E] focus:border-[#1B5E4A] focus:outline-none focus:ring-1 focus:ring-[#1B5E4A]"
                />
              </div>

              {/* View Switcher */}
              <div
                className="inline-flex items-center self-start rounded-lg border border-[#E4E2DC] bg-[#EBE8E0] p-1"
                role="group"
                aria-label="결과 보기 방식"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('lifecycle')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewMode === 'lifecycle'
                      ? 'bg-white text-[#1A1A18] shadow-xs'
                      : 'text-[#57554E] hover:text-[#1A1A18]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>생애주기별 보기</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-[#1A1A18] shadow-xs'
                      : 'text-[#57554E] hover:text-[#1A1A18]'
                  }`}
                >
                  <Table className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>한눈에 비교표</span>
                </button>
              </div>
            </div>

            {/* Interactive Lifecycle Stage Filter Tabs */}
            {activeStages.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setStageFilter('all')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    stageFilter === 'all'
                      ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
                      : 'bg-white text-[#57554E] border-[#E4E2DC] hover:text-[#1A1A18] hover:border-[#C5C1B8]'
                  }`}
                >
                  전체 ({matchedPrograms.length})
                </button>
                {activeStages.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setStageFilter(stage)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      stageFilter === stage
                        ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
                        : 'bg-white text-[#57554E] border-[#E4E2DC] hover:text-[#1A1A18] hover:border-[#C5C1B8]'
                    }`}
                  >
                    {STAGE_LABELS[stage]} ({stageCounts[stage] ?? 0})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Output */}
          <div className="mt-8">
            {filteredPrograms.length === 0 ? (
              <div className="rounded-xl border border-[#E4E2DC] bg-white px-6 py-14 text-center">
                <p className="font-serif-display text-lg font-bold text-[#1A1A18]">
                  조건에 일치하는 지원사업이 없습니다
                </p>
                <p className="mt-2 text-sm text-[#57554E]">
                  검색어를 지우거나 나이·자녀·귀농 여부 등 다른 조건을 선택해 확인해 보세요.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1B5E4A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#144738] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>조건 및 검색 초기화</span>
                </button>
              </div>
            ) : viewMode === 'table' ? (
              <ProgramComparisonTable
                programs={filteredPrograms}
                onSelect={setSelectedProgram}
              />
            ) : (
              <div className="space-y-12">
                {Array.from(groupedByStage.entries()).map(([stage, programs], idx) => (
                  <div key={stage}>
                    <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[#E4E2DC]">
                      <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1A1A18]">
                        <span className="font-mono-num text-sm font-semibold text-[#1B5E4A] mr-2">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        {STAGE_LABELS[stage]}
                      </h3>
                      <span className="font-mono-num text-xs font-semibold text-[#57554E] tabular-nums">
                        {programs.length}개 사업
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {programs.map((program) => (
                        <ProgramCard
                          key={program.id}
                          program={program}
                          onSelect={setSelectedProgram}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <MatchedBenefitSummaryPanel
              programs={filteredPrograms}
              onSelectProgram={setSelectedProgram}
            />
          </div>
        </section>

        <DepartmentDirectory departments={DEPARTMENT_DIRECTORY} />
      </main>

      {/* Print-Only Clean A4 Handout View */}
      <div className="hidden print-only p-8 text-black">
        <div className="border-b-2 border-black pb-4 mb-6">
          <p className="text-xs font-semibold">충청남도 부여군청 전략사업과 인구청년팀</p>
          <h1 className="text-2xl font-bold mt-1">부여군 생애주기별 맞춤 지원사업 안내표</h1>
          <p className="text-xs mt-2">선택 조건: {printProfileSummary}</p>
          <p className="text-xs mt-1 font-semibold">
            직접 지원금 최대 합계: {formatKoreanCurrency(calculateBenefitTotals(matchedPrograms).cashTotalWon)} · 정책 융자 한도 합계: {formatKoreanCurrency(calculateBenefitTotals(matchedPrograms).loanTotalWon)}
          </p>
        </div>

        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-black bg-gray-100">
              <th className="py-2 px-2 text-left">생애주기</th>
              <th className="py-2 px-2 text-left">지원사업명</th>
              <th className="py-2 px-2 text-left">지원금액·혜택</th>
              <th className="py-2 px-2 text-left">담당부서</th>
              <th className="py-2 px-2 text-left">문의전화</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {matchedPrograms.map((p) => (
              <tr key={p.id}>
                <td className="py-2 px-2 align-top">{p.stageLabel}</td>
                <td className="py-2 px-2 align-top font-semibold">{p.title}</td>
                <td className="py-2 px-2 align-top font-bold">{p.benefitDisplay}</td>
                <td className="py-2 px-2 align-top">{p.department}</td>
                <td className="py-2 px-2 align-top font-mono">{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      <PrintSummaryModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        profile={profile}
        programs={matchedPrograms}
      />
    </div>
  );
}

export default App;
