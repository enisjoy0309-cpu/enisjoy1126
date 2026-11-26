import {
  BenefitTotals,
  DepartmentContact,
  LifecycleStage,
  MatchedProgram,
  QuickPreset,
  ResidentProfile,
  SupportProgram,
} from '../types/policy';

export const STAGE_ORDER: LifecycleStage[] = [
  'pregnancy',
  'infant_child',
  'youth',
  'newlywed_housing',
  'farming',
  'employment_business',
  'senior',
];

export const STAGE_LABELS: Record<LifecycleStage, string> = {
  pregnancy: '임신·출산',
  infant_child: '영유아·아동·교육',
  youth: '청년 정착·자산',
  newlywed_housing: '신혼·가족·주거',
  farming: '귀농·귀촌·농업',
  employment_business: '일자리·소상공인',
  senior: '노년·어르신 복지',
};

export const GENDER_LABELS: Record<ResidentProfile['gender'], string> = {
  all: '전체(선택 안 함)',
  male: '남성',
  female: '여성',
};

export const MARITAL_LABELS: Record<ResidentProfile['maritalStatus'], string> = {
  single: '미혼',
  newlywed: '예비·신혼부부',
  married: '기혼',
  single_parent: '한부모·기타',
};

export const CHILDREN_LABELS: Record<ResidentProfile['children'][number], string> = {
  none: '자녀 없음',
  pregnant: '임신 중',
  infant: '영유아 (0~6세)',
  school: '초·중·고 자녀',
  multichild: '다자녀 (2인 이상)',
};

export const EMPLOYMENT_LABELS: Record<ResidentProfile['employment'], string> = {
  jobseeker: '구직자·미취업',
  worker: '직장인·근로자',
  self_employed: '자영업·소상공인',
  farmer: '농업인',
  student: '대학생·취준생',
};

export const FARMING_LABELS: Record<ResidentProfile['farming'], string> = {
  none: '해당 없음 (기존 군민)',
  planned: '귀농·귀촌 예정',
  settled: '귀농·귀촌인 (전입 5년 이내)',
};

export const QUICK_PRESETS: QuickPreset[] = [
  {
    id: 'youth-farmer',
    label: '28세 청년 귀농 예정자',
    description: '청년 정착 + 귀농 창업 및 주택 지원 동시 확인',
    profile: {
      age: 28,
      gender: 'male',
      maritalStatus: 'single',
      children: ['none'],
      employment: 'farmer',
      farming: 'planned',
    },
  },
  {
    id: 'newlywed-pregnant',
    label: '33세 신혼부부 · 임신 중',
    description: '결혼장려금 · 주거이자 · 출산·산후조리 통합 안내',
    profile: {
      age: 33,
      gender: 'female',
      maritalStatus: 'newlywed',
      children: ['pregnant'],
      employment: 'worker',
      farming: 'none',
    },
  },
  {
    id: 'youth-jobseeker',
    label: '24세 구직·취준 청년',
    description: '월세 지원 · 자격증 응시료 · 자산형성 사업 안내',
    profile: {
      age: 24,
      gender: 'female',
      maritalStatus: 'single',
      children: ['none'],
      employment: 'jobseeker',
      farming: 'none',
    },
  },
  {
    id: 'multichild-business',
    label: '42세 두 자녀 자영업 부모',
    description: '다자녀 양육·교육비 · 소상공인 이차보전 특례 안내',
    profile: {
      age: 42,
      gender: 'male',
      maritalStatus: 'married',
      children: ['school', 'multichild'],
      employment: 'self_employed',
      farming: 'none',
    },
  },
  {
    id: 'senior-female-farmer',
    label: '68세 여성 농업인 어르신',
    description: '농어민수당 · 여성농업인 바우처 · 어르신 교통·일자리',
    profile: {
      age: 68,
      gender: 'female',
      maritalStatus: 'married',
      children: ['none'],
      employment: 'farmer',
      farming: 'settled',
    },
  },
];

export const BUYEO_PROGRAMS: SupportProgram[] = [
  // 1. 임신·출산
  {
    id: 'birth-grant',
    title: '부여군 출산장려금 및 첫만남이용권',
    stage: 'pregnancy',
    stageLabel: '임신·출산',
    summary:
      '출산 가정의 초기 양육 부담을 덜어드리기 위해 첫만남이용권과 부여군 자체 출산장려금을 다자녀 누진 지급합니다.',
    benefitDisplay: '200만 원 ~ 최대 1,000만 원',
    benefitSubtext: '첫만남 200~300만 원 + 군 장려금 분할지급',
    benefitType: 'cash',
    benefitTypeLabel: '현금·바우처',
    cashMaxWon: 10_000_000,
    loanMaxWon: 0,
    amountBasis: '최대(다자녀 출산 기준)',
    department: '가족행복과 출산보육팀',
    phone: '041-830-2472',
    applicationMethod: '출생신고 시 읍·면 행정복지센터 통합 신청 또는 정부24',
    applicationPeriod: '출생일로부터 1년 이내 (연중 상시)',
    eligibilityDetails: [
      '출생아 부 또는 모가 출생일 기준 부여군에 주민등록을 두고 거주하는 가정',
      '첫째·둘째·셋째 이상 출생 순위에 따라 군 자체 장려금 차등 지원',
      '첫만남이용권(국민행복카드 포인트)과 중복 수령 가능',
    ],
    requiredDocs: ['출생신고서', '통장 사본', '신분증 (행복출산 원스톱 신청서)'],
    matchRule: {
      minAge: 18,
      maxAge: 50,
      childrenAny: ['pregnant', 'infant'],
    },
    priority: 1,
  },
  {
    id: 'postpartum-care',
    title: '부여군 산후조리비 및 산모·신생아 건강관리 지원',
    stage: 'pregnancy',
    stageLabel: '임신·출산',
    summary:
      '산후조리원 이용 또는 산모·신생아 건강관리사 파견 본인부담금을 지원하여 산모의 빠른 회복을 돕습니다.',
    benefitDisplay: '최대 150만 원',
    benefitSubtext: '산후조리비 + 건강관리 서비스 바우처',
    benefitType: 'voucher',
    benefitTypeLabel: '바우처·현금',
    cashMaxWon: 1_500_000,
    loanMaxWon: 0,
    amountBasis: '출산 1회당 최대',
    department: '보건소 모자보건팀',
    phone: '041-830-8653',
    applicationMethod: '부여군 보건소 모자보건실 방문 또는 복지로 온라인 신청',
    applicationPeriod: '출산 예정일 40일 전 ~ 출산 후 30일 이내',
    eligibilityDetails: [
      '부여군에 주민등록을 둔 임산부 및 출산 가정',
      '기준중위소득 기준에 따라 정부지원금 외 군비 추가 지원',
      '산후조리비 지원금은 굿뜨래페이 또는 계좌 지급',
    ],
    requiredDocs: ['출생증명서 또는 임신확인서', '주민등록등본', '영수증(산후조리비 청구 시)'],
    matchRule: {
      minAge: 18,
      maxAge: 50,
      childrenAny: ['pregnant', 'infant'],
    },
    priority: 2,
  },
  {
    id: 'pregnant-eco-food',
    title: '임산부 친환경농산물 꾸러미 및 엽산·철분제 지원',
    stage: 'pregnancy',
    stageLabel: '임신·출산',
    summary:
      '임산부에게 연 48만 원 상당의 친환경 농산물 꾸러미를 배송하고 보건소에서 엽산·철분제를 무료 지급합니다.',
    benefitDisplay: '연 48만 원 상당',
    benefitSubtext: '친환경농산물(자부담 20% 포함) + 영양제 무료',
    benefitType: 'voucher',
    benefitTypeLabel: '현물·바우처',
    cashMaxWon: 480_000,
    loanMaxWon: 0,
    amountBasis: '연간 지원 기준',
    department: '농업정책과 농촌유통팀 · 보건소',
    phone: '041-830-2623',
    applicationMethod: '임산부 친환경농산물 통합쇼핑몰 또는 읍·면 행정복지센터',
    applicationPeriod: '연중 상시 (선착순 예산 소진 시까지)',
    eligibilityDetails: [
      '신청일 현재 부여군에 주소를 둔 임산부 또는 출산 후 1년 이내 산모',
      '보건소 임산부 등록 시 엽산제·철분제 및 기형아 검사 쿠폰 추가 제공',
    ],
    requiredDocs: ['임신확인서 또는 산모수첩', '주민등록등본'],
    matchRule: {
      genders: ['female', 'all'],
      childrenAny: ['pregnant'],
    },
    priority: 3,
  },

  // 2. 영유아·아동·교육
  {
    id: 'parental-allowance',
    title: '부모급여 및 아동수당 지원',
    stage: 'infant_child',
    stageLabel: '영유아·아동·교육',
    summary:
      '0~1세 영아 가정에는 부모급여를, 만 8세 미만 아동에게는 아동수당을 매월 현금으로 지급합니다.',
    benefitDisplay: '월 50만 ~ 100만 원 + 월 10만 원',
    benefitSubtext: '0세 월 100만 원 / 1세 월 50만 원 + 아동수당 10만 원',
    benefitType: 'cash',
    benefitTypeLabel: '월 현금지급',
    cashMaxWon: 13_200_000,
    loanMaxWon: 0,
    amountBasis: '0세 12개월 기준(월 110만)',
    department: '가족행복과 출산보육팀',
    phone: '041-830-2474',
    applicationMethod: '읍·면 행정복지센터 방문 또는 복지로·정부24 신청',
    applicationPeriod: '출생 후 60일 이내 신청 시 출생월 소급 지급',
    eligibilityDetails: [
      '만 0~1세 영유아 양육 가정 부모급여 지원 (어린이집 이용 시 보육료 차액 지급)',
      '만 8세 미만(0~95개월) 모든 아동 대상 아동수당 월 10만 원 지급',
    ],
    requiredDocs: ['사회보장급여 신청서', '통장 사본', '신분증'],
    matchRule: {
      childrenAny: ['infant', 'pregnant'],
    },
    priority: 1,
  },
  {
    id: 'multichild-support',
    title: '부여군 다자녀 가정 양육·생활지원',
    stage: 'infant_child',
    stageLabel: '영유아·아동·교육',
    summary:
      '두 자녀 이상을 양육하는 부여군 다자녀 가정에 양육지원금과 상하수도 요금 감면 등 생활 혜택을 제공합니다.',
    benefitDisplay: '연 120만 원 + 공공요금 감면',
    benefitSubtext: '다자녀 가정 생활안정 및 보육 부담 경감',
    benefitType: 'cash',
    benefitTypeLabel: '현금·감면',
    cashMaxWon: 1_200_000,
    loanMaxWon: 0,
    amountBasis: '연간 양육지원금 기준',
    department: '가족행복과 아동드림팀',
    phone: '041-830-2483',
    applicationMethod: '주소지 읍·면 행정복지센터 방문 신청',
    applicationPeriod: '연중 상시',
    eligibilityDetails: [
      '부여군에 주민등록을 둔 2자녀 이상 양육 가정 (최연소 자녀 기준 요건 충족 시)',
      '충남 다자녀 행복키움카드 및 공공시설 입장료·상수도 요금 감면 연계',
    ],
    requiredDocs: ['주민등록등본', '가족관계증명서', '다자녀 우대카드 신청서'],
    matchRule: {
      childrenAny: ['multichild'],
    },
    priority: 2,
  },
  {
    id: 'school-prep-grant',
    title: '초·중·고 입학준비금 및 교육경비(교복·체험비) 지원',
    stage: 'infant_child',
    stageLabel: '영유아·아동·교육',
    summary:
      '부여군 관내 초·중·고교 신입생 및 재학생에게 교복 구입비, 입학준비금, 현장체험학습비를 지원합니다.',
    benefitDisplay: '1인당 20만 ~ 30만 원',
    benefitSubtext: '교복 무상지원 + 입학준비금(굿뜨래페이 등)',
    benefitType: 'voucher',
    benefitTypeLabel: '교육지원',
    cashMaxWon: 300_000,
    loanMaxWon: 0,
    amountBasis: '1인당 연 최대',
    department: '교육체육과 평생교육팀',
    phone: '041-830-2562',
    applicationMethod: '재학 학교 일괄 신청 또는 부여군 교육포털 안내',
    applicationPeriod: '매년 3월 ~ 5월 집중 신청 (전입 시 수시)',
    eligibilityDetails: [
      '부여군에 주민등록을 두고 관내 초·중·고등학교에 입학·재학 중인 학생',
      '중·고교 신입생 교복(동·하복) 구입비 및 수학여행·체험학습비 지원',
    ],
    requiredDocs: ['학교 안내 신청서', '주민등록등본(필요 시)'],
    matchRule: {
      customCheck: (p) =>
        p.children.includes('school') || (p.age >= 7 && p.age <= 18),
    },
    priority: 3,
  },
  {
    id: 'single-parent-child-care',
    title: '부여군 한부모가족 아동양육비 및 생활안정 지원',
    stage: 'infant_child',
    stageLabel: '영유아·아동·교육',
    summary:
      '한부모 및 조손가족의 만 18세 미만(취학 시 22세 미만) 자녀 양육비와 추가 아동양육비를 매월 지원합니다.',
    benefitDisplay: '자녀 1인당 월 21만 ~ 35만 원',
    benefitSubtext: '소득기준 충족 시 학용품비·난방비 추가',
    benefitType: 'cash',
    benefitTypeLabel: '월 현금지급',
    cashMaxWon: 4_200_000,
    loanMaxWon: 0,
    amountBasis: '연 최대(월 35만 원 기준)',
    department: '가족행복과 여성가족팀',
    phone: '041-830-2478',
    applicationMethod: '읍·면 행정복지센터 방문 또는 복지로 온라인 신청',
    applicationPeriod: '연중 상시',
    eligibilityDetails: [
      '기준중위소득 63% 이하 한부모·조손가족 (청소년한부모는 기준중위소득 65% 이하)',
      '만 18세 미만 자녀 양육 시 기본 양육비 + 초·중·고 학용품비 연 9만 3천 원 지원',
    ],
    requiredDocs: ['사회보장급여 신청서', '임대차계약서', '소득·재산 신고서류'],
    matchRule: {
      maritalStatuses: ['single_parent'],
      customCheck: (p) =>
        p.maritalStatus === 'single_parent' && !p.children.includes('none'),
    },
    priority: 4,
  },
  {
    id: 'goodtrae-scholarship',
    title: '부여군 굿뜨래장학회 대학생·다자녀 장학금',
    stage: 'infant_child',
    stageLabel: '영유아·아동·교육',
    summary:
      '부여군 지역 인재 육성을 위해 대학생 본인 또는 다자녀 가정의 대학생 자녀에게 장학금을 수여합니다.',
    benefitDisplay: '1인당 최대 200만 원',
    benefitSubtext: '성적우수·복지·다자녀·예체능 분야별 선발',
    benefitType: 'cash',
    benefitTypeLabel: '장학금',
    cashMaxWon: 2_000_000,
    loanMaxWon: 0,
    amountBasis: '1인당 최대 장학금',
    department: '교육체육과 · (재)부여군굿뜨래장학회',
    phone: '041-830-2564',
    applicationMethod: '부여군청 교육체육과 방문 또는 등기우편 접수',
    applicationPeriod: '상·하반기 공고 기간 (보통 3~4월, 9~10월)',
    eligibilityDetails: [
      '공고일 기준 본인 또는 부모가 부여군에 1년 이상 계속 주민등록을 둔 대학생·고교생',
      '다자녀 가정, 저소득 복지, 성적우수 등 부문별 중복 수혜 기준 확인 필요',
    ],
    requiredDocs: ['장학생 지원서', '재학증명서 및 성적증명서', '주민등록초본'],
    matchRule: {
      customCheck: (p) =>
        p.employment === 'student' ||
        (p.age >= 18 && p.age <= 26) ||
        p.children.includes('multichild'),
    },
    priority: 5,
  },

  // 3. 청년 정착·자산
  {
    id: 'youth-rent-support',
    title: '부여군 청년 주거임차료(월세) 지원사업',
    stage: 'youth',
    stageLabel: '청년 정착·자산',
    summary:
      '경제적 어려움을 겪는 부여군 거주 무주택 청년에게 실제 납부하는 월세의 일부를 최대 12개월간 지원합니다.',
    benefitDisplay: '월 최대 20만 원 (연 240만 원)',
    benefitSubtext: '최대 12개월 생애 1회(또는 연장) 지원',
    benefitType: 'cash',
    benefitTypeLabel: '현금지급',
    cashMaxWon: 2_400_000,
    loanMaxWon: 0,
    amountBasis: '연 최대(월 20만 원×12개월)',
    department: '전략사업과 인구청년팀',
    phone: '041-830-2263',
    applicationMethod: '복지로 온라인 신청 또는 부여군청 전략사업과·읍면 방문',
    applicationPeriod: '상·하반기 모집 공고 확인 (연중 수시 확인 가능)',
    eligibilityDetails: [
      '만 18세 ~ 39세(정부 한시사업 19~34세 포함) 부여군 거주 무주택 청년',
      '부모와 별도 거주하며 임차보증금 5천만 원 이하, 월세 70만 원 이하 주택 거주자',
      '청년가구 소득·재산 기준 충족 시 우선 선정',
    ],
    requiredDocs: ['임대차계약서 사본', '최근 3개월 월세 이체내역', '가족관계증명서', '소득증빙서류'],
    matchRule: {
      minAge: 18,
      maxAge: 39,
    },
    priority: 1,
  },
  {
    id: 'youth-settlement-grant',
    title: '부여군 전입 청년·주민 정착지원금 (굿뜨래페이)',
    stage: 'youth',
    stageLabel: '청년 정착·자산',
    summary:
      '타 시·군·구에서 부여군으로 전입해 실제 거주하는 청년 및 전입 세대에게 부여 지역화폐 굿뜨래페이를 지급합니다.',
    benefitDisplay: '1인당 30만 ~ 100만 원',
    benefitSubtext: '전입 6개월·1년 경과 시 굿뜨래페이 분할 지급',
    benefitType: 'voucher',
    benefitTypeLabel: '지역화폐',
    cashMaxWon: 1_000_000,
    loanMaxWon: 0,
    amountBasis: '전입 정착 최대 기준',
    department: '전략사업과 인구청년팀',
    phone: '041-830-2263',
    applicationMethod: '전입신고 시 읍·면 행정복지센터 신청서 작성',
    applicationPeriod: '전입신고일 기준 6개월 경과 후 1년 이내',
    eligibilityDetails: [
      '전입일 이전 타 시군구에서 1년 이상 거주 후 부여군으로 전입한 만 18~45세 청년 등',
      '부여군 지역화폐(굿뜨래페이) 앱 가입 및 카드 등록 필수',
    ],
    requiredDocs: ['전입지원금 신청서', '주민등록초본(주소이력 포함)', '신분증'],
    matchRule: {
      minAge: 18,
      maxAge: 45,
    },
    priority: 2,
  },
  {
    id: 'youth-asset-building',
    title: '청년 내일저축계좌 · 충남형 두배로 자산형성 지원',
    stage: 'youth',
    stageLabel: '청년 정착·자산',
    summary:
      '일하는 부여군 청년이 매월 일정 금액을 저축하면 정부·지자체가 매칭 적립하여 목돈 마련을 지원합니다.',
    benefitDisplay: '월 10만 ~ 30만 원 매칭 적립',
    benefitSubtext: '3년 만기 시 최대 1,440만 원 + 이자 수령',
    benefitType: 'cash',
    benefitTypeLabel: '매칭적립',
    cashMaxWon: 10_800_000,
    loanMaxWon: 0,
    amountBasis: '3년 만기 정부·군 매칭 최대',
    department: '전략사업과 인구청년팀 · 사회복지과',
    phone: '041-830-2264',
    applicationMethod: '복지로 온라인 신청 및 주소지 읍·면 행정복지센터',
    applicationPeriod: '매년 5월 ~ 6월 정기 모집',
    eligibilityDetails: [
      '만 19세 ~ 39세 근로·사업소득이 있는 부여군 거주 청년',
      '가구 소득 기준(기준중위소득 100% 이하 등)에 따라 매칭액 월 10만~30만 원 차등',
    ],
    requiredDocs: ['재직증명서 또는 사업자등록증', '소득금액증명원', '저축동의서'],
    matchRule: {
      minAge: 19,
      maxAge: 39,
      employments: ['worker', 'self_employed', 'farmer'],
    },
    priority: 3,
  },
  {
    id: 'youth-exam-suit',
    title: '부여군 청년 자격증 응시료 및 면접정장 무료 대여',
    stage: 'youth',
    stageLabel: '청년 정착·자산',
    summary:
      '취업을 준비하는 부여군 청년에게 어학·국가기술자격증 시험 응시료를 실비 지원하고 면접용 정장을 무료 대여합니다.',
    benefitDisplay: '연 최대 30만 원 + 정장 무료대여',
    benefitSubtext: '1인 연 3회 응시료 실비 + 정장 3박 4일 대여',
    benefitType: 'voucher',
    benefitTypeLabel: '실비·서비스',
    cashMaxWon: 300_000,
    loanMaxWon: 0,
    amountBasis: '연 최대 응시료 실비',
    department: '전략사업과 인구청년팀',
    phone: '041-830-2265',
    applicationMethod: '부여군 청년센터(청년창업지원센터) 또는 이메일·방문 접수',
    applicationPeriod: '연중 상시 (예산 소진 시까지)',
    eligibilityDetails: [
      '신청일 기준 부여군에 주민등록을 둔 만 18세 ~ 39세 미취업·구직 청년 및 취준생',
      '토익, 한국사, 컴퓨터활용능력, 국가기술자격 등 응시료 영수증·응시확인서 제출',
    ],
    requiredDocs: ['응시료 결제 영수증', '시험 응시확인서', '주민등록초본', '통장 사본'],
    matchRule: {
      minAge: 18,
      maxAge: 39,
      employments: ['jobseeker', 'student'],
    },
    priority: 4,
  },

  // 4. 신혼·가족·주거
  {
    id: 'youth-marriage-grant',
    title: '부여군 청년 결혼장려금 지원사업',
    stage: 'newlywed_housing',
    stageLabel: '신혼·가족·주거',
    summary:
      '부여군에서 새로운 가정을 꾸리는 청년 신혼부부의 초기 정착을 축하하며 결혼장려금을 지원합니다.',
    benefitDisplay: '1쌍 최대 200만 원',
    benefitSubtext: '혼인신고 후 거주 유지 시 분할 또는 일시 지급',
    benefitType: 'cash',
    benefitTypeLabel: '현금지급',
    cashMaxWon: 2_000_000,
    loanMaxWon: 0,
    amountBasis: '신혼부부 1쌍 최대',
    department: '전략사업과 인구청년팀',
    phone: '041-830-2263',
    applicationMethod: '주소지 읍·면 행정복지센터 또는 부여군청 전략사업과 방문',
    applicationPeriod: '혼인신고일로부터 1년 이내 신청',
    eligibilityDetails: [
      '부부 모두 만 19세 ~ 39세(또는 45세 이하)이며, 혼인신고일 기준 부부 중 1인 이상 부여군 거주',
      '신청일 현재 부부 모두 부여군에 주민등록을 두고 실제 거주하는 초혼 부부',
    ],
    requiredDocs: ['결혼장려금 신청서', '혼인관계증명서(상세)', '주민등록초본', '통장 사본'],
    matchRule: {
      minAge: 19,
      maxAge: 45,
      maritalStatuses: ['newlywed'],
    },
    priority: 1,
  },
  {
    id: 'newlywed-housing-interest',
    title: '신혼부부 및 무주택 청년 전세·구입자금 대출이자 지원',
    stage: 'newlywed_housing',
    stageLabel: '신혼·가족·주거',
    summary:
      '금융권 주택 전세·매입자금 대출을 이용 중인 부여군 신혼부부와 무주택 청년에 연 최대 200만 원의 대출이자를 지원합니다.',
    benefitDisplay: '연 최대 200만 원',
    benefitSubtext: '대출잔액의 1.5%~2.0% 이내 (자녀 가산)',
    benefitType: 'cash',
    benefitTypeLabel: '이자지원',
    cashMaxWon: 2_000_000,
    loanMaxWon: 0,
    amountBasis: '연 최대 이자지원',
    department: '전략사업과 인구청년팀 · 도시건축과',
    phone: '041-830-2266',
    applicationMethod: '부여군청 전략사업과 또는 읍·면 행정복지센터 방문 신청',
    applicationPeriod: '매년 상·하반기 공고 기간',
    eligibilityDetails: [
      '혼인신고일 7년 이내 신혼부부 또는 만 19~39세 무주택 청년 세대주',
      '부여군 소재 전용면적 85㎡ 이하 주택 임차 또는 매입 자금 대출 실행자',
      '다자녀 가구 및 충남형 두자녀 특례 시 지원 한도 가산',
    ],
    requiredDocs: ['금융거래확인서(이자납입내역)', '등기사항전부증명서 또는 임대차계약서', '혼인관계증명서'],
    matchRule: {
      minAge: 19,
      maxAge: 49,
      customCheck: (p) =>
        p.maritalStatus === 'newlywed' || (p.age >= 19 && p.age <= 39),
    },
    priority: 2,
  },
  {
    id: 'rural-housing-improvement',
    title: '농촌 빈집 정비 및 농촌주택 개량·수선 지원',
    stage: 'newlywed_housing',
    stageLabel: '신혼·가족·주거',
    summary:
      '부여군 농촌지역 노후·불량 주택 개량 및 신축 시 저금리 융자 지원과 빈집 리모델링 보조금을 제공합니다.',
    benefitDisplay: '신축 최대 2.5억 · 증축/수선 1.5억 융자',
    benefitSubtext: '고정 연 2.0% 저리 융자 (취득세 최대 280만 원 감면)',
    benefitType: 'loan',
    benefitTypeLabel: '저리융자·세감면',
    cashMaxWon: 2_800_000,
    loanMaxWon: 250_000_000,
    amountBasis: '신축 융자 2.5억 + 취득세 감면',
    department: '도시건축과 주택팀',
    phone: '041-830-2382',
    applicationMethod: '건축 예정지 읍·면 행정복지센터 산업팀 방문 접수',
    applicationPeriod: '매년 1월 ~ 2월 정기 모집 (잔여물량 수시)',
    eligibilityDetails: [
      '부여군 농촌지역 거주 무주택자, 노후주택 개량 희망자, 귀농·귀촌 예정자',
      '연면적 150㎡ 이하 단독주택 신축·개축·재축·대수선 대상',
    ],
    requiredDocs: ['농촌주택개량사업 신청서', '토지등기부등본', '신분증'],
    matchRule: {
      minAge: 20,
      customCheck: (p) =>
        p.farming !== 'none' || p.maritalStatus === 'married' || p.maritalStatus === 'newlywed',
    },
    priority: 3,
  },

  // 5. 귀농·귀촌·농업
  {
    id: 'return-farm-startup-loan',
    title: '귀농 농업창업 및 주택구입 지원사업',
    stage: 'farming',
    stageLabel: '귀농·귀촌·농업',
    summary:
      '귀농인이 부여군에 안정적으로 정착할 수 있도록 농지 구입·시설 설치(창업) 및 농가주택 구입·신축 자금을 장기 저리로 융자 지원합니다.',
    benefitDisplay: '창업 최대 3억 원 · 주택 최대 7,500만 원',
    benefitSubtext: '연 1.5% 고정금리 (5년 거치 10년 원금균등상환)',
    benefitType: 'loan',
    benefitTypeLabel: '저리융자',
    cashMaxWon: 0,
    loanMaxWon: 375_000_000,
    amountBasis: '창업 3억 + 주택 7,500만 융자',
    department: '농업정책과 귀농귀촌팀',
    phone: '041-830-2614',
    applicationMethod: '부여군 농업정책과 귀농귀촌팀 방문 접수 (사전 교육 이수 필수)',
    applicationPeriod: '상반기(1~2월), 하반기(6~7월) 정기 접수',
    eligibilityDetails: [
      '도시지역에서 1년 이상 거주하다 부여군 농촌지역으로 전입한 지 5년 이내인 만 65세 이하 귀농인 또는 예정자',
      '귀농·영농 교육 8시간(또는 100시간 기준) 이상 이수 실적 필요',
    ],
    requiredDocs: ['귀농 농업창업 및 주택구입 지원사업 신청서', '사업계획서', '교육이수실적증명서', '주민등록초본'],
    matchRule: {
      maxAge: 65,
      farmingStatuses: ['planned', 'settled'],
    },
    priority: 1,
  },
  {
    id: 'young-farmer-grant',
    title: '청년 후계농업경영인 영농정착지원금',
    stage: 'farming',
    stageLabel: '귀농·귀촌·농업',
    summary:
      '영농 초기 소득이 불안정한 청년 농업인과 청년 귀농인에게 최장 3년간 매월 영농정착지원금을 지급합니다.',
    benefitDisplay: '월 최대 110만 원 (최장 3년, 최대 3,960만 원)',
    benefitSubtext: '1년차 110만 / 2년차 100만 / 3년차 90만 원',
    benefitType: 'cash',
    benefitTypeLabel: '월 현금바우처',
    cashMaxWon: 39_600_000,
    loanMaxWon: 0,
    amountBasis: '최장 3년(36개월) 누적 최대',
    department: '농업기술센터 인력육성팀 · 농업정책과',
    phone: '041-830-2732',
    applicationMethod: '농림사업정보시스템(Agrix) 온라인 신청 및 면접 심사',
    applicationPeriod: '매년 12월 ~ 1월 선발 공고',
    eligibilityDetails: [
      '만 18세 이상 ~ 만 40세 미만 독립경영 3년 이하(예정자 포함) 청년 농업인',
      '부여군에 실제 거주하며 영농에 종사하는 자 (농업경영체 등록)',
    ],
    requiredDocs: ['영농계획서', '농업경영체 등록확인서', '주민등록등본', '가족관계증명서'],
    matchRule: {
      minAge: 18,
      maxAge: 39,
      customCheck: (p) =>
        p.employment === 'farmer' || p.farming === 'planned' || p.farming === 'settled',
    },
    priority: 2,
  },
  {
    id: 'return-farm-house-repair',
    title: '귀농·귀촌인 농가주택 수리비 및 이사비용 지원',
    stage: 'farming',
    stageLabel: '귀농·귀촌·농업',
    summary:
      '부여군으로 전입한 귀농·귀촌인의 초기 주거 정착을 위해 노후 농가주택 수리비와 이사 실비를 보조합니다.',
    benefitDisplay: '수리비 최대 500만 원 · 이사비 최대 100만 원',
    benefitSubtext: '예산 범위 내 실비 정산 보조 지원',
    benefitType: 'cash',
    benefitTypeLabel: '정착보조금',
    cashMaxWon: 6_000_000,
    loanMaxWon: 0,
    amountBasis: '수리비 500만 + 이사비 100만 최대',
    department: '농업정책과 귀농귀촌팀',
    phone: '041-830-2614',
    applicationMethod: '전입지 읍·면 행정복지센터 또는 농업정책과 방문 신청',
    applicationPeriod: '매년 2월 ~ 3월 사업 공고 및 수시 접수',
    eligibilityDetails: [
      '타 시군 도시지역에서 1년 이상 거주 후 부여군으로 전입한 지 5년 이내인 귀농·귀촌인',
      '수리비 지원 시 부여군 내 본인 또는 배우자 명의(또는 장기임차) 주택 거주',
    ],
    requiredDocs: ['보조금 신청서', '주민등록초본', '견적서 및 전후 사진', '이사비 영수증'],
    matchRule: {
      farmingStatuses: ['planned', 'settled'],
    },
    priority: 3,
  },
  {
    id: 'farmer-allowance',
    title: '충남형 농어민수당 지원사업',
    stage: 'farming',
    stageLabel: '귀농·귀촌·농업',
    summary:
      '농업·농촌의 공익적 가치를 지키는 부여군 거주 농업인에게 매년 부여군 지역화폐(굿뜨래페이)로 수당을 지급합니다.',
    benefitDisplay: '연 80만 원 (1인 농가) / 1인당 45만 원(2인 이상)',
    benefitSubtext: '굿뜨래페이 카드 충전 지급',
    benefitType: 'voucher',
    benefitTypeLabel: '지역화폐',
    cashMaxWon: 800_000,
    loanMaxWon: 0,
    amountBasis: '연간 지급 기준(1인 농가)',
    department: '농업정책과 농정기획팀',
    phone: '041-830-2612',
    applicationMethod: '주민등록지 읍·면 행정복지센터 방문 신청',
    applicationPeriod: '매년 2월 ~ 4월 집중 신청 기간',
    eligibilityDetails: [
      '신청 연도 직전 연도 1월 1일부터 계속 충남도 내 주소 및 농업경영체 등록 유지자',
      '농업 외 종합소득 3,700만 원 미만인 실제 영농 종사 농업인',
    ],
    requiredDocs: ['농어민수당 신청서', '농업경영체 등록확인서', '신분증'],
    matchRule: {
      minAge: 19,
      customCheck: (p) => p.employment === 'farmer' || p.farming === 'settled',
    },
    priority: 4,
  },
  {
    id: 'female-farmer-voucher',
    title: '여성농업인 행복바우처 지원사업',
    stage: 'farming',
    stageLabel: '귀농·귀촌·농업',
    summary:
      '영농과 가사를 병행하는 부여군 여성농업인의 건강관리와 문화·여가 활동을 위해 연간 20만 원 상당의 바우처를 지원합니다.',
    benefitDisplay: '연 20만 원 (자부담 없음)',
    benefitSubtext: '문화·스포츠·미용·안경 등 전 업종 사용 가능',
    benefitType: 'voucher',
    benefitTypeLabel: '복지바우처',
    cashMaxWon: 200_000,
    loanMaxWon: 0,
    amountBasis: '연간 지원 기준',
    department: '농업정책과 농정기획팀',
    phone: '041-830-2613',
    applicationMethod: '주소지 읍·면 행정복지센터 방문 또는 모바일 앱 신청',
    applicationPeriod: '매년 1월 ~ 2월 정기 신청',
    eligibilityDetails: [
      '부여군에 거주하며 실제 영농에 종사하는 만 20세 ~ 75세 여성농업인',
      '농업경영체 등록(경영주·공동경영주·경영주 외 농업인) 필수',
    ],
    requiredDocs: ['행복바우처 신청서', '농업경영체 등록확인서', '신분증'],
    matchRule: {
      minAge: 20,
      maxAge: 75,
      genders: ['female', 'all'],
      customCheck: (p) =>
        (p.gender === 'female' || p.gender === 'all') &&
        (p.employment === 'farmer' || p.farming === 'settled'),
    },
    priority: 5,
  },

  // 6. 일자리·소상공인
  {
    id: 'youth-startup-grant',
    title: '부여군 청년 창업 · 소상공인 초기정착 지원',
    stage: 'employment_business',
    stageLabel: '일자리·소상공인',
    summary:
      '부여군 내에서 창업을 준비하거나 창업 초기 단계에 있는 청년 사업가에게 시설비, 임차료, 마케팅 등 사업화 자금을 지원합니다.',
    benefitDisplay: '최대 1,500만 원',
    benefitSubtext: '사업화 자금 및 1:1 창업 컨설팅 연계',
    benefitType: 'cash',
    benefitTypeLabel: '사업화자금',
    cashMaxWon: 15_000_000,
    loanMaxWon: 0,
    amountBasis: '사업화 최대 지원금',
    department: '전략사업과 인구청년팀 · 경제교통과',
    phone: '041-830-2265',
    applicationMethod: '부여군 홈페이지 공고 확인 후 사업계획서 방문·이메일 접수',
    applicationPeriod: '매년 상반기 모집 공고 (보통 3~4월)',
    eligibilityDetails: [
      '부여군에 거주(또는 사업기간 내 전입)하는 만 18세 ~ 39세 예비창업자 및 3년 이내 초기 창업자',
      '지역자원 활용, 로컬푸드, 백제문화·관광 콘텐츠, 생활서비스 업종 우대',
    ],
    requiredDocs: ['창업지원 사업계획서', '사업자등록증(기창업자)', '주민등록초본'],
    matchRule: {
      minAge: 18,
      maxAge: 39,
      employments: ['self_employed', 'jobseeker'],
    },
    priority: 1,
  },
  {
    id: 'small-business-loan',
    title: '부여군 소상공인 특례보증 및 이차보전 지원',
    stage: 'employment_business',
    stageLabel: '일자리·소상공인',
    summary:
      '담보력이 부족한 부여군 소상공인이 저금리로 경영자금을 대출받을 수 있도록 충남신용보증재단 보증 및 대출이자를 지원합니다.',
    benefitDisplay: '최대 5,000만 원 융자 · 연 2.0% 이자지원',
    benefitSubtext: '2년간 이차보전 및 보증료 일부 감면',
    benefitType: 'loan',
    benefitTypeLabel: '특례보증·이자지원',
    cashMaxWon: 2_000_000,
    loanMaxWon: 50_000_000,
    amountBasis: '융자 5,000만 + 2년 이자지원',
    department: '경제교통과 지역경제팀',
    phone: '041-830-2282',
    applicationMethod: '충남신용보증재단(부여출장소) 또는 협약 금융기관 방문',
    applicationPeriod: '매년 2월 ~ 자금 소진 시까지',
    eligibilityDetails: [
      '부여군에 사업장을 두고 영업 중인 소상공인 (사업자등록 3개월 이상 경과 등)',
      '유흥·사치·사행성 업종 제외, 굿뜨래페이 가맹점 우대',
    ],
    requiredDocs: ['사업자등록증명원', '부가가치세 과세표준증명', '임대차계약서', '신분증'],
    matchRule: {
      minAge: 19,
      employments: ['self_employed'],
    },
    priority: 2,
  },
  {
    id: 'middle-age-reemployment',
    title: '신중년(40~64세) 경력형 일자리 및 직업훈련 지원',
    stage: 'employment_business',
    stageLabel: '일자리·소상공인',
    summary:
      '퇴직·구직 중인 중장년층이 축적된 경력을 바탕으로 지역사회 서비스 및 지역기업에 재취업할 수 있도록 일자리와 훈련을 연계합니다.',
    benefitDisplay: '월 180만 ~ 210만 원 (참여수당) + 훈련비',
    benefitSubtext: '부여군 일자리지원센터 1:1 취업 알선 포함',
    benefitType: 'service',
    benefitTypeLabel: '일자리·훈련',
    cashMaxWon: 2_100_000,
    loanMaxWon: 0,
    amountBasis: '월 참여수당 최대 기준',
    department: '경제교통과 일자리지원팀',
    phone: '041-830-2285',
    applicationMethod: '부여군 일자리지원센터 또는 경제교통과 방문 접수',
    applicationPeriod: '연중 수시 채용 및 상·하반기 사업 공고',
    eligibilityDetails: [
      '부여군에 주민등록을 둔 만 40세 ~ 64세 미취업 신중년 구직자',
      '국민내일배움카드 직업훈련 및 관내 기업 인턴십 연계 지원',
    ],
    requiredDocs: ['구직신청서', '경력증명서(해당 시)', '자격증 사본', '신분증'],
    matchRule: {
      minAge: 40,
      maxAge: 64,
      employments: ['jobseeker', 'worker'],
    },
    priority: 3,
  },

  // 7. 노년·어르신 복지
  {
    id: 'senior-free-bus-and-job',
    title: '부여군 어르신 시내버스 무료이용 및 노인일자리 지원',
    stage: 'senior',
    stageLabel: '노년·어르신 복지',
    summary:
      '만 75세(및 65세 이상 확대 대상) 어르신에게 충남형 교통카드 무료 이용 혜택을 제공하고, 활기찬 노후를 위한 맞춤형 노인일자리를 지원합니다.',
    benefitDisplay: '교통비 전액 무료 · 일자리 월 29만 ~ 76만 원',
    benefitSubtext: '공익형 월 29만 원 / 사회서비스형 월 63~76만 원',
    benefitType: 'service',
    benefitTypeLabel: '교통무료·일자리',
    cashMaxWon: 9_120_000,
    loanMaxWon: 0,
    amountBasis: '사회서비스형 연 최대(월 76만)',
    department: '사회복지과 노인복지팀 · 경제교통과',
    phone: '041-830-2413',
    applicationMethod: '주소지 읍·면 행정복지센터 또는 부여시니어클럽 방문 신청',
    applicationPeriod: '교통카드 연중 상시 / 노인일자리 매년 12월 정기 모집',
    eligibilityDetails: [
      '충남형 알뜰교통카드: 부여군 거주 만 75세 이상 어르신 시내버스 무료 (읍면 신청 즉시 발급)',
      '노인일자리 및 사회활동 지원사업: 만 65세 이상(일부 사업 만 60세 이상) 기초연금 수급자 등',
    ],
    requiredDocs: ['신분증', '증명사진 1매(교통카드 발급 시)', '일자리 참여신청서'],
    matchRule: {
      minAge: 65,
    },
    priority: 1,
  },
  {
    id: 'senior-care-allowance',
    title: '부여군 기초연금 및 어르신 효도·장수수당 지원',
    stage: 'senior',
    stageLabel: '노년·어르신 복지',
    summary:
      '만 65세 이상 어르신의 안정적인 노후 생활을 위한 기초연금과 함께 부여군 고령 어르신 대상 장수·목욕·이미용 바우처를 지원합니다.',
    benefitDisplay: '기초연금 월 최대 33만 4천 원 + 군 복지바우처',
    benefitSubtext: '만 65세 이상 소득인정액 기준 + 효도·이미용 지원',
    benefitType: 'cash',
    benefitTypeLabel: '연금·바우처',
    cashMaxWon: 4_008_000,
    loanMaxWon: 0,
    amountBasis: '기초연금 연 최대(월 33.4만)',
    department: '사회복지과 노인복지팀',
    phone: '041-830-2415',
    applicationMethod: '주소지 읍·면 행정복지센터 또는 국민연금공단·복지로',
    applicationPeriod: '만 65세 생일이 속하는 달의 1개월 전부터 연중 상시',
    eligibilityDetails: [
      '기초연금: 만 65세 이상 부여군민 중 소득인정액 선정기준액 이하 가구',
      '부여군 어르신 목욕 및 이미용권(기초생활수급자 등 취약계층 어르신 우선 지급)',
    ],
    requiredDocs: ['신분증', '통장 사본', '소득·재산 신고서'],
    matchRule: {
      minAge: 65,
    },
    priority: 2,
  },
];

export const DEPARTMENT_DIRECTORY: DepartmentContact[] = [
  {
    id: 'dept-population',
    division: '전략사업과',
    team: '인구청년팀',
    phone: '041-830-2263',
    location: '부여군청 본관 2층',
    mainDuties: '청년 월세·전세이자, 청년 결혼장려금, 전입 정착지원금, 청년창업 총괄',
  },
  {
    id: 'dept-family',
    division: '가족행복과',
    team: '출산보육팀 · 아동드림팀',
    phone: '041-830-2472',
    location: '부여군청 본관 1층',
    mainDuties: '출산장려금, 첫만남이용권, 부모급여·아동수당, 다자녀·한부모가족 지원',
  },
  {
    id: 'dept-farming',
    division: '농업정책과',
    team: '귀농귀촌팀 · 농정기획팀',
    phone: '041-830-2614',
    location: '부여군청 별관 농업정책과',
    mainDuties: '귀농 창업·주택융자, 농가수리비·이사비, 농어민수당, 여성농업인 바우처',
  },
  {
    id: 'dept-economy',
    division: '경제교통과',
    team: '일자리지원팀 · 지역경제팀',
    phone: '041-830-2282',
    location: '부여군청 별관 2층',
    mainDuties: '소상공인 특례보증·이차보전, 신중년 경력형 일자리, 취업 연계',
  },
  {
    id: 'dept-health',
    division: '부여군 보건소',
    team: '모자보건팀',
    phone: '041-830-8653',
    location: '부여읍 사비로 52 보건소',
    mainDuties: '산후조리비, 산모·신생아 건강관리, 임산부 영양제·건강검진 지원',
  },
  {
    id: 'dept-senior',
    division: '사회복지과',
    team: '노인복지팀',
    phone: '041-830-2413',
    location: '부여군청 본관 1층',
    mainDuties: '기초연금, 노인일자리, 어르신 무료교통카드, 효도·장수 복지 지원',
  },
];

export function matchPrograms(profile: ResidentProfile): MatchedProgram[] {
  const results: MatchedProgram[] = [];

  for (const program of BUYEO_PROGRAMS) {
    const rule = program.matchRule;
    const reasons: string[] = [];

    if (rule.minAge !== undefined && profile.age < rule.minAge) continue;
    if (rule.maxAge !== undefined && profile.age > rule.maxAge) continue;

    if (rule.genders && !rule.genders.includes(profile.gender)) {
      continue;
    }

    if (rule.maritalStatuses && !rule.maritalStatuses.includes(profile.maritalStatus)) {
      continue;
    }

    if (rule.childrenAny) {
      const hasAnyChildMatch = rule.childrenAny.some((c) => profile.children.includes(c));
      if (!hasAnyChildMatch) continue;
    }

    if (rule.employments && !rule.employments.includes(profile.employment)) {
      continue;
    }

    if (rule.farmingStatuses && !rule.farmingStatuses.includes(profile.farming)) {
      continue;
    }

    if (rule.customCheck && !rule.customCheck(profile)) {
      continue;
    }

    // Build clear human-readable match reasons
    if (rule.minAge !== undefined || rule.maxAge !== undefined) {
      if (rule.minAge !== undefined && rule.maxAge !== undefined) {
        reasons.push(`만 ${profile.age}세 (${rule.minAge}~${rule.maxAge}세 대상)`);
      } else if (rule.minAge !== undefined) {
        reasons.push(`만 ${profile.age}세 (${rule.minAge}세 이상)`);
      } else if (rule.maxAge !== undefined) {
        reasons.push(`만 ${profile.age}세 (${rule.maxAge}세 이하)`);
      }
    }

    if (rule.genders && profile.gender !== 'all') {
      reasons.push(GENDER_LABELS[profile.gender]);
    }

    if (rule.maritalStatuses) {
      reasons.push(MARITAL_LABELS[profile.maritalStatus]);
    }

    if (rule.childrenAny) {
      const matchedChildLabels = rule.childrenAny
        .filter((c) => profile.children.includes(c))
        .map((c) => CHILDREN_LABELS[c]);
      if (matchedChildLabels.length > 0) {
        reasons.push(matchedChildLabels.join(' · '));
      }
    }

    if (rule.employments) {
      reasons.push(EMPLOYMENT_LABELS[profile.employment]);
    }

    if (rule.farmingStatuses) {
      reasons.push(FARMING_LABELS[profile.farming]);
    }

    if (reasons.length === 0) {
      reasons.push('부여군 거주 요건 충족');
    }

    results.push({
      ...program,
      matchReasons: reasons,
    });
  }

  return results.sort((a, b) => {
    const stageDiff = STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage);
    if (stageDiff !== 0) return stageDiff;
    return a.priority - b.priority;
  });
}

export function calculateBenefitTotals(programs: MatchedProgram[]): BenefitTotals {
  let cashTotalWon = 0;
  let loanTotalWon = 0;

  for (const p of programs) {
    cashTotalWon += p.cashMaxWon;
    loanTotalWon += p.loanMaxWon;
  }

  return {
    cashTotalWon,
    loanTotalWon,
    combinedTotalWon: cashTotalWon + loanTotalWon,
    programCount: programs.length,
  };
}

export function formatKoreanCurrency(won: number): string {
  if (won <= 0) return '0원';
  const eok = Math.floor(won / 100_000_000);
  const man = Math.floor((won % 100_000_000) / 10_000);
  const rest = won % 10_000;

  const parts: string[] = [];
  if (eok > 0) parts.push(`${eok.toLocaleString('ko-KR')}억`);
  if (man > 0) parts.push(`${man.toLocaleString('ko-KR')}만`);
  if (rest > 0) parts.push(rest.toLocaleString('ko-KR'));

  return `${parts.join(' ')}원`;
}

