import { useState } from 'react';
import { Landmark } from 'lucide-react';
import { QuickPreset, ResidentProfile } from '../types/policy';

interface HeroBannerProps {
  presets: QuickPreset[];
  activePresetId: string | null;
  onSelectPreset: (preset: QuickPreset) => void;
  totalCatalogCount: number;
  currentProfile: ResidentProfile;
}

const BUSOSAN_IMAGE_PATH = '/src/assets/images/buyeo10/01_busosan_nakhwaam.jpg';

export function HeroBanner({
  presets,
  activePresetId,
  onSelectPreset,
  totalCatalogCount,
}: HeroBannerProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="border-b border-[#E4E2DC] bg-[#F8F7F3] no-print">
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#1B5E4A] mb-3">
                충청남도 부여군청 · 전략사업과 인구청년팀
              </p>
              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.24] tracking-tight text-[#1A1A18] text-balance">
                내 조건에 맞는 부여군 지원사업,
                <br className="hidden sm:inline" /> 한눈에 확인하세요
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#57554E]">
                나이, 성별, 결혼 여부, 자녀 현황, 취업 상태, 귀농·귀촌 여부를 선택하면
                부여군에서 받을 수 있는 생애주기별 지원사업과 지원금액, 담당부서 연락처를
                즉시 정리해 드립니다.
              </p>
            </div>

            {/* Quick Persona Selector */}
            <div className="mt-8 pt-6 border-t border-[#E4E2DC]">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold text-[#1A1A18]">
                  대표 상황 바로 적용하기
                </span>
                <span className="text-xs text-[#57554E]">
                  선택 시 아래 맞춤 조건이 자동으로 설정됩니다
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => {
                  const isActive = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => onSelectPreset(preset)}
                      title={preset.description}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E4A] ${
                        isActive
                          ? 'bg-[#1B5E4A] text-white border-[#1B5E4A]'
                          : 'bg-white text-[#1A1A18] border-[#D6D3CB] hover:border-[#1B5E4A] hover:text-[#1B5E4A]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Visual Column: Single Real Busosanseong Photo */}
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <div className="relative flex-1 min-h-[250px] lg:min-h-[300px] overflow-hidden rounded-xl border border-[#E4E2DC] bg-[#EBE8E0]">
              {!imgError ? (
                <img
                  src={BUSOSAN_IMAGE_PATH}
                  alt="부여 부소산성 낙화암과 백마강 전경"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EBE8E0] to-[#DCE3DD] p-6 text-center">
                  <Landmark className="h-10 w-10 text-[#1B5E4A] mb-3" aria-hidden="true" />
                  <p className="font-serif-display text-base font-semibold text-[#1A1A18]">
                    부여 부소산성 낙화암
                  </p>
                  <p className="mt-1 text-xs text-[#57554E]">
                    백마강과 함께 이어가는 부여군의 생애주기별 지원 안내
                  </p>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                <p className="text-xs font-semibold text-white">
                  부여 제1경 · 부소산 낙화암
                </p>
                <p className="mt-0.5 text-[11px] text-white/85">
                  백마강을 굽어보는 백제의 역사와 자연이 어우러진 부여 대표 명소
                </p>
              </div>
            </div>

            <p className="text-right text-[11px] text-[#78756E]">
              사진 출처: 부여군 부여문화관광 (공공누리)
            </p>
          </div>
        </div>

        {/* Operational Utility Ribbon */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[#E4E2DC] pt-5 text-xs">
          <div>
            <span className="text-[#57554E]">안내 대상</span>
            <p className="mt-0.5 font-semibold text-[#1A1A18]">부여군민 · 전입 및 귀농 예정자</p>
          </div>
          <div>
            <span className="text-[#57554E]">수록 정책 규모</span>
            <p className="mt-0.5 font-semibold text-[#1A1A18] tabular-nums">
              7개 생애주기 · 주요 {totalCatalogCount}종 사업
            </p>
          </div>
          <div>
            <span className="text-[#57554E]">주관 부서</span>
            <p className="mt-0.5 font-semibold text-[#1A1A18]">전략사업과 인구청년팀</p>
          </div>
          <div>
            <span className="text-[#57554E]">대표 문의처</span>
            <p className="mt-0.5 font-mono-num font-semibold text-[#1B5E4A]">
              041-830-2263
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
