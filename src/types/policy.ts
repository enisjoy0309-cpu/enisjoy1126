export type Gender = 'all' | 'male' | 'female';

export type MaritalStatus = 'single' | 'newlywed' | 'married' | 'single_parent';

export type ChildrenStatus = 'none' | 'pregnant' | 'infant' | 'school' | 'multichild';

export type EmploymentStatus =
  | 'jobseeker'
  | 'worker'
  | 'self_employed'
  | 'farmer'
  | 'student';

export type FarmingStatus = 'none' | 'planned' | 'settled';

export type LifecycleStage =
  | 'pregnancy'
  | 'infant_child'
  | 'youth'
  | 'newlywed_housing'
  | 'farming'
  | 'employment_business'
  | 'senior';

export type BenefitType = 'cash' | 'voucher' | 'loan' | 'service';

export interface ResidentProfile {
  age: number;
  gender: Gender;
  maritalStatus: MaritalStatus;
  children: ChildrenStatus[];
  employment: EmploymentStatus;
  farming: FarmingStatus;
}

export interface MatchRule {
  minAge?: number;
  maxAge?: number;
  genders?: Gender[];
  maritalStatuses?: MaritalStatus[];
  childrenAny?: ChildrenStatus[];
  employments?: EmploymentStatus[];
  farmingStatuses?: FarmingStatus[];
  /** Optional custom evaluator for complex rules (e.g. parent age + child condition) */
  customCheck?: (profile: ResidentProfile) => boolean;
}

export interface SupportProgram {
  id: string;
  title: string;
  stage: LifecycleStage;
  stageLabel: string;
  summary: string;
  benefitDisplay: string;
  benefitSubtext: string;
  benefitType: BenefitType;
  benefitTypeLabel: string;
  /** 직접 수령 가능한 현금·바우처·장려금·이자지원 최대 추정액 (단위: 원) */
  cashMaxWon: number;
  /** 저리 정책자금 융자 최대 한도 (단위: 원) */
  loanMaxWon: number;
  /** 합산 기준 설명 (예: 연 기준, 최대 3년 합산, 1회성 등) */
  amountBasis: string;
  department: string;
  phone: string;
  applicationMethod: string;
  applicationPeriod: string;
  eligibilityDetails: string[];
  requiredDocs: string[];
  matchRule: MatchRule;
  /** Priority order within stage */
  priority: number;
}

export interface MatchedProgram extends SupportProgram {
  matchReasons: string[];
}

export interface BenefitTotals {
  cashTotalWon: number;
  loanTotalWon: number;
  combinedTotalWon: number;
  programCount: number;
}

export interface QuickPreset {
  id: string;
  label: string;
  description: string;
  profile: ResidentProfile;
}

export interface DepartmentContact {
  id: string;
  division: string;
  team: string;
  phone: string;
  location: string;
  mainDuties: string;
}
