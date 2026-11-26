import { RotateCcw } from 'lucide-react';
import {
  CHILDREN_LABELS,
  EMPLOYMENT_LABELS,
  FARMING_LABELS,
  GENDER_LABELS,
  MARITAL_LABELS,
} from '../data/buyeoPrograms';
import {
  ChildrenStatus,
  EmploymentStatus,
  FarmingStatus,
  Gender,
  MaritalStatus,
  ResidentProfile,
} from '../types/policy';

interface ConditionSelectorProps {
  profile: ResidentProfile;
  onChange: (next: ResidentProfile) => void;
  onReset: () => void;
  matchedCount: number;
}

const AGE_QUICK_BRACKETS = [
  { label: '영유아·아동 (5세)', age: 5 },
  { label: '청소년 (16세)', age: 16 },
  { label: '청년 (28세)', age: 28 },
  { label: '중장년 (48세)', age: 48 },
  { label: '어르신 (70세)', age: 70 },
];

const GENDERS: Gender[] = ['all', 'male', 'female'];
const MARITAL_STATUSES: MaritalStatus[] = ['single', 'newlywed', 'married', 'single_parent'];
const CHILDREN_OPTIONS: ChildrenStatus[] = ['none', 'pregnant', 'infant', 'school', 'multichild'];
const EMPLOYMENT_OPTIONS: EmploymentStatus[] = [
  'jobseeker',
  'worker',
  'self_employed',
  'farmer',
  'student',
];
const FARMING_OPTIONS: FarmingStatus[] = ['none', 'planned', 'settled'];

export function ConditionSelector({
  profile,
  onChange,
  onReset,
  matchedCount,
}: ConditionSelectorProps) {
  const handleAgeChange = (rawAge: number) => {
    const clamped = Math.max(0, Math.min(100, Number.isNaN(rawAge) ? 0 : rawAge));
    onChange({ ...profile, age: clamped });
  };

  const handleToggleChild = (item: ChildrenStatus) => {
    if (item === 'none') {
      onChange({ ...profile, children: ['none'] });
      return;
    }
    const withoutNone = profile.children.filter((c) => c !== 'none');
    const exists = withoutNone.includes(item);
    const updated = exists
      ? withoutNone.filter((c) => c !== item)
      : [...withoutNone, item];
    onChange({
      ...profile,
      children: updated.length === 0 ? ['none'] : updated,
    });
  };

  const selectedChildrenSummary = profile.children
    .map((c) => CHILDREN_LABELS[c])
    .join(', ');

  return (
    <section
      id="condition-section"
      className="mx-auto max-w-[1200px] px-6 py-8 no-print"
    >
      <div className="rounded-xl border border-[#E4E2DC] bg-white p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E4E2DC]">
          <div>
            <p className="text-xs font-medium text-[#1B5E4A] mb-1">
              01. 내 조건 선택하기
            </p>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1A18]">
              주민 맞춤 조건 설정
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#57554E]">
              현재 조건 해당 사업{' '}
              <strong className="font-mono-num text-base font-bold text-[#1B5E4A]">
                {matchedCount}건
              </strong>
            </span>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D6D3CB] bg-[#F8F7F3] px-3.5 py-2 text-xs font-medium text-[#1A1A18] hover:border-[#1A1A18] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>조건 초기화</span>
            </button>
          </div>
        </div>

        {/* 6-Axis Filter Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-7">
          {/* 1. 나이 */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label
                htmlFor="age-number-input"
                className="text-sm font-semibold text-[#1A1A18]"
              >
                1. 나이 (만 연령)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="age-number-input"
                  type="number"
                  min={0}
                  max={100}
                  value={profile.age}
                  onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))}
                  className="w-20 rounded-lg border border-[#D6D3CB] bg-[#F8F7F3] px-2.5 py-1.5 text-right font-mono-num text-sm font-semibold text-[#1A1A18] focus:border-[#1B5E4A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B5E4A]"
                />
                <span className="text-sm font-medium text-[#57554E]">세</span>
              </div>
            </div>

            <input
              type="range"
              aria-label="나이 선택 슬라이더"
              min={0}
              max={100}
              value={profile.age}
              onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))}
              className="w-full accent-[#1B5E4A] cursor-pointer h-2 bg-[#EBE8E0] rounded-lg"
            />
            <div className="mt-1 flex justify-between text-[11px] font-mono-num text-[#78756E]">
              <span>0세</span>
              <span>18세</span>
              <span>39세</span>
              <span>65세</span>
              <span>100세</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {AGE_QUICK_BRACKETS.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => handleAgeChange(b.age)}
                  className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    profile.age === b.age
                      ? 'bg-[#1B5E4A]/10 border-[#1B5E4A] text-[#1B5E4A] font-semibold'
                      : 'bg-[#F8F7F3] border-[#E4E2DC] text-[#57554E] hover:text-[#1A1A18] hover:border-[#C5C1B8]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. 성별 & 3. 결혼 여부 */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#1A1A18] mb-2.5">
                2. 성별
              </p>
              <div className="grid grid-cols-3 gap-2">
                {GENDERS.map((g) => {
                  const active = profile.gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onChange({ ...profile, gender: g })}
                      className={`min-h-[42px] px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                        active
                          ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                          : 'bg-[#F8F7F3] text-[#1A1A18] border-[#E4E2DC] hover:border-[#1B5E4A]/60'
                      }`}
                    >
                      {GENDER_LABELS[g]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1A1A18] mb-2.5">
                3. 결혼 여부
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MARITAL_STATUSES.map((m) => {
                  const active = profile.maritalStatus === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => onChange({ ...profile, maritalStatus: m })}
                      className={`min-h-[42px] px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                        active
                          ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                          : 'bg-[#F8F7F3] text-[#1A1A18] border-[#E4E2DC] hover:border-[#1B5E4A]/60'
                      }`}
                    >
                      {MARITAL_LABELS[m]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. 자녀 유무 및 양육 현황 */}
          <div>
            <div className="flex items-baseline justify-between mb-2.5">
              <p className="text-sm font-semibold text-[#1A1A18]">
                4. 자녀 및 임신·출산 여부
              </p>
              <span className="text-xs text-[#57554E]">복수 선택 가능</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CHILDREN_OPTIONS.map((c) => {
                const active = profile.children.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleToggleChild(c)}
                    className={`min-h-[42px] px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                      active
                        ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                        : 'bg-[#F8F7F3] text-[#1A1A18] border-[#E4E2DC] hover:border-[#1B5E4A]/60'
                    }`}
                  >
                    {CHILDREN_LABELS[c]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. 취업·활동 상태 */}
          <div>
            <p className="text-sm font-semibold text-[#1A1A18] mb-2.5">
              5. 취업·활동 상태
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EMPLOYMENT_OPTIONS.map((emp) => {
                const active = profile.employment === emp;
                return (
                  <button
                    key={emp}
                    type="button"
                    onClick={() => onChange({ ...profile, employment: emp })}
                    className={`min-h-[42px] px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                      active
                        ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                        : 'bg-[#F8F7F3] text-[#1A1A18] border-[#E4E2DC] hover:border-[#1B5E4A]/60'
                    }`}
                  >
                    {EMPLOYMENT_LABELS[emp]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. 귀농·귀촌 여부 */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-[#1A1A18] mb-2.5">
              6. 귀농·귀촌 여부
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {FARMING_OPTIONS.map((f) => {
                const active = profile.farming === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onChange({ ...profile, farming: f })}
                    className={`min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                      active
                        ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                        : 'bg-[#F8F7F3] text-[#1A1A18] border-[#E4E2DC] hover:border-[#1B5E4A]/60'
                    }`}
                  >
                    {FARMING_LABELS[f]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Profile Summary Line */}
        <div className="mt-7 pt-5 border-t border-[#E4E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[#57554E]">
            <span className="font-semibold text-[#1A1A18]">선택된 조건:</span>
            <span className="font-mono-num text-[#1A1A18]">만 {profile.age}세</span>
            <span aria-hidden="true">·</span>
            <span>{GENDER_LABELS[profile.gender]}</span>
            <span aria-hidden="true">·</span>
            <span>{MARITAL_LABELS[profile.maritalStatus]}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedChildrenSummary}</span>
            <span aria-hidden="true">·</span>
            <span>{EMPLOYMENT_LABELS[profile.employment]}</span>
            <span aria-hidden="true">·</span>
            <span>{FARMING_LABELS[profile.farming]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
