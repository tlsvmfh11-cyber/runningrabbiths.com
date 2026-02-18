import { useState, useEffect, useRef } from "react";

function useAos() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AosSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useAos();
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} ${className}`}
    >
      {children}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-violet-600/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-3 font-bold text-lg flex justify-between items-center cursor-pointer"
        aria-expanded={open}
        data-testid={`faq-toggle-${question.slice(0, 10)}`}
      >
        <span>{question}</span>
        <span
          className={`inline-block w-3 h-3 border-r-2 border-b-2 border-gray-300 transition-transform duration-200 shrink-0 ml-2 ${open ? "rotate-[-135deg]" : "rotate-45"}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"}`}
        role="region"
        aria-hidden={!open}
      >
        <p className="px-8 pb-4 text-lg text-gray-300">{answer}</p>
      </div>
    </div>
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://runningrabbiths.com/#business",
  "name": "강남 달토",
  "alternateName": ["달리는토끼", "런닝래빗", "강남달토"],
  "description": "강남 역삼동 삼정호텔에 위치한 달토(달리는토끼, 런닝래빗)는 10년 경력의 전문 매니저진과 쾌적한 시설로 운영되는 강남 대표 하이퍼블릭 가라오케입니다.",
  "url": "https://runningrabbiths.com",
  "telephone": "+82-10-2303-3778",
  "image": [
    "https://runningrabbiths.com/img/a.jpg",
    "https://runningrabbiths.com/img/b2.jpg",
    "https://runningrabbiths.com/img/c1.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "삼정호텔 B1",
    "addressLocality": "역삼동",
    "addressRegion": "강남구",
    "addressCountry": "KR",
    "postalCode": "06241"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.5015,
    "longitude": 127.0367
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "₩₩₩",
  "currenciesAccepted": "KRW",
  "paymentAccepted": "현금, 카드",
  "areaServed": {
    "@type": "City",
    "name": "서울특별시 강남구"
  },
  "foundingDate": "2015",
  "sameAs": [
    "https://t.me/hscompanyshs"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "1247"
  },
  "keywords": "강남 달토, 강남 가라오케, 강남 하이퍼블릭, 달리는토끼, 런닝래빗"
};

const faqData = [
  { question: "예약은 꼭 해야 하나요?", answer: "네, 방문 전 전화(010-2303-3778)나 카카오톡(tlsgustlra)으로 예약하시면 대기 없이 바로 안내받으실 수 있습니다." },
  { question: "몇 시까지 운영하나요?", answer: "24시간 연중무휴로 운영됩니다. 새벽 시간에도 언제든 이용 가능합니다." },
  { question: "주차 가능한가요?", answer: "네, 삼정호텔 내 전용 주차장 및 발렛파킹 서비스를 제공합니다." },
  { question: "처음 가는데 초이스가 어려워요.", answer: "걱정하지 마세요. 10년 경력 담당 매니저가 손님의 취향을 파악해 분위기에 맞는 초이스를 자연스럽게 추천드립니다." },
  { question: "혼자서도 가능한가요?", answer: "네, 혼자 오시는 분들이 절반에 가까울 정도로 많습니다. 1인룸 가격으로 부담 없이 이용 가능합니다." },
  { question: "카드 결제가 가능한가요?", answer: "네, 현금과 카드 결제 모두 가능합니다. 다만 현금 결제 기준 가격이며 카드 결제 시 소폭 추가될 수 있으니 사전에 확인해 주세요." },
  { question: "복장 규정이 있나요?", answer: "별도의 드레스코드는 없습니다. 편한 복장으로 오시면 됩니다. 비즈니스 접대 등 특별한 자리인 경우에도 자유롭게 방문하시면 됩니다." },
  { question: "단체(5인 이상) 이용 시 할인이 되나요?", answer: "네, 5인 이상 단체 예약 시 맞춤형 패키지 가격을 안내드리고 있습니다. 예약 전화(010-2303-3778)로 인원수와 예산을 말씀해 주시면 최적의 구성을 제안드립니다." },
  { question: "강남역에서 얼마나 걸리나요?", answer: "강남역 11번 출구에서 도보 약 10분, 역삼역 3번 출구에서 도보 약 5분 거리에 위치해 있습니다. 삼정호텔 B1으로 오시면 됩니다." },
  { question: "연장은 어떻게 하나요?", answer: "기본 이용 시간은 60분이며, 연장 희망 시 담당 매니저에게 말씀하시면 동일하게 60분 단위로 연장됩니다. 연장 비용은 사전에 안내드립니다." },
  { question: "음식이나 주류 반입이 가능한가요?", answer: "외부 음식 및 주류 반입은 제한되어 있습니다. 매장 내에서 다양한 주류와 안주를 합리적인 가격으로 제공하고 있습니다." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "홈",
      "item": "https://runningrabbiths.com/"
    }
  ]
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "강남 달토 | 강남 가라오케 추천 - 달리는토끼 런닝래빗",
  "description": "강남 역삼동 삼정호텔 B1 위치. 10년 전통 하이퍼블릭 가라오케. 24시간 운영, 합리적 가격, 맞춤 초이스 서비스.",
  "url": "https://runningrabbiths.com/",
  "inLanguage": "ko",
  "isPartOf": {
    "@type": "WebSite",
    "name": "강남 달토",
    "url": "https://runningrabbiths.com"
  },
  "about": {
    "@id": "https://runningrabbiths.com/#business"
  },
  "datePublished": "2025-08-01",
  "dateModified": "2026-02-18",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://runningrabbiths.com/img/a.jpg"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#hero-title", "#intro-title", ".sr-only"]
  },
  "lastReviewed": "2026-02-18"
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "강남 달토 이용 방법",
  "description": "강남 달토(달리는토끼, 런닝래빗) 가라오케 처음 방문자를 위한 예약부터 퇴장까지 전체 이용 과정 안내",
  "totalTime": "PT70M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "KRW",
    "value": "360000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "전화 예약",
      "text": "방문 전 전화(010-2303-3778) 또는 카카오톡(tlsgustlra)으로 예약합니다. 방문 인원, 희망 시간대, 예산을 말씀해 주시면 최적의 룸과 서비스를 준비해드립니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "매장 도착 및 입장",
      "text": "역삼동 삼정호텔 B1으로 오시면 입구에서 담당 매니저가 직접 맞이합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "룸 배정 및 기본 세팅",
      "text": "인원수와 분위기에 맞는 룸에 안내됩니다. 착석하시면 물, 음료, 맥주, 안주 등 기본 세팅이 제공됩니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "초이스 진행",
      "text": "룸 초이스 형식으로 진행됩니다. 손님이 직접 선택하시거나, 매니저가 취향에 맞춰 추천해드립니다."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "즐거운 시간",
      "text": "기본 T/C는 60분이며, 연장도 60분 단위로 가능합니다. 노래, 대화, 게임 등 자유롭게 즐기시면 됩니다."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "정산 및 퇴장",
      "text": "이용이 끝나면 매니저가 정산을 도와드립니다. 현금 또는 카드 결제가 가능합니다."
    }
  ]
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "가라오케 엔터테인먼트",
  "name": "강남 달토 가라오케 서비스",
  "description": "10년 전통 강남 대표 하이퍼블릭 가라오케. 비즈니스 접대, 생일 파티, 단체 모임, 1인 프리미엄 이용까지 맞춤형 서비스 제공.",
  "provider": {
    "@id": "https://runningrabbiths.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "서울특별시 강남구"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "강남 달토 서비스 목록",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "비즈니스 접대",
          "description": "프라이빗한 공간에서 격조 있는 분위기의 비즈니스 접대 서비스"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "생일 파티 및 기념일",
          "description": "케이크 준비, 깜짝 이벤트 연출 등 맞춤형 기념일 서비스"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "단체 모임 및 회식",
          "description": "5인 이상 단체 할인 패키지와 넓은 룸 배정 서비스"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1인 프리미엄 이용",
          "description": "1인 전용 합리적 가격의 프리미엄 서비스"
        }
      }
    ]
  }
};

const navLinks = [
  { href: "#intro", label: "소개" },
  { href: "#difference", label: "차별점" },
  { href: "#guide", label: "이용가이드" },
  { href: "#price", label: "가격" },
  { href: "#service", label: "특별서비스" },
  { href: "#reviews", label: "후기" },
  { href: "#faq", label: "FAQ" },
  { href: "#location", label: "위치" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-black focus:text-white focus:p-4 focus:z-[9999]">
        본문 바로가기
      </a>

      <nav className="fixed top-0 w-full z-[60] bg-black/80 backdrop-blur-md border-b border-gray-800/50" aria-label="메인 내비게이션" data-testid="nav-main">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="#hero" className="font-heading text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 shrink-0" data-testid="link-nav-logo">
            강남 달토
          </a>
          <div className="hidden md:flex items-center gap-5 text-sm text-gray-300 flex-wrap">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors" data-testid={`link-nav-${link.href.slice(1)}`}>{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={mobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                )}
              </svg>
            </button>
            <a
              href="tel:010-2303-3778"
              className="shrink-0 px-4 py-2 rounded-full text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-600"
              aria-label="전화 예약 010-2303-3778"
              data-testid="link-nav-call"
            >
              예약전화
            </a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50" data-testid="nav-mobile-menu">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.href.slice(1)}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main
        id="main-content"
        className="bg-cover bg-center bg-top bg-fixed"
        style={{ backgroundImage: "url(/img/a.jpg)" }}
        role="main"
      >
        {/* Hero */}
        <section id="hero" className="overflow-hidden" aria-labelledby="hero-title">
          <div className="container mx-auto px-5 py-20 text-center min-h-dvh flex justify-center items-center pt-32">
            <div
              className="max-w-3xl p-20 pt-24 -m-20 bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/img/t.png)", backgroundSize: "100% 100%" }}
            >
              <h1 id="hero-title" className="text-5xl md:text-6xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-hero-title">
                강남 달토 <span className="hidden md:inline" aria-hidden="true">|</span>{" "}
                <br className="md:hidden" /> 강남 가라오케
              </h1>
              <p className="text-lg mb-4">
                <strong>역삼동 삼정호텔</strong>에 위치한 <strong>달토</strong>(<em>달리는토끼</em>, <em>런닝래빗</em>)는
                10년 경력의 전문 매니저진과 쾌적한 시설로 운영되는 강남 대표 하이퍼블릭 가라오케입니다.
                합리적인 가격과 맞춤형 서비스로 만족을 드립니다.
              </p>
              <p className="text-base text-gray-400 mb-6">
                서울 강남구 역삼동 삼정호텔 B1 | 24시간 연중무휴 | 예약 010-2303-3778
              </p>
              <a
                href="tel:010-2303-3778"
                className="inline-flex items-center gap-2 p-4 md:ps-6 text-2xl md:text-3xl rounded-full text-black bg-gradient-to-r from-cyan-400 to-purple-600 shadow-xl font-heading"
                aria-label="전화 예약하기 010-2303-3778"
                data-testid="link-hero-call"
              >
                <span>전화예약</span>
                <span className="px-4 py-2 inline-block rounded-full bg-black">
                  <strong className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 font-normal">
                    010-2303-3778
                  </strong>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* 소개 */}
        <section id="intro" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="intro-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/b2.jpg" alt="강남 달토 룸 내부 인테리어 - 넓고 쾌적한 공간" loading="lazy" width="512" height="384" data-testid="img-intro-1" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/b4.jpg" alt="달토 하이퍼블릭 세련된 룸 시설" loading="lazy" width="512" height="384" data-testid="img-intro-2" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/b.jpg" alt="달리는토끼 가라오케 프리미엄 시설" loading="lazy" width="512" height="384" data-testid="img-intro-3" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/b3.jpg" alt="런닝래빗 프리미엄 룸 전경" loading="lazy" width="512" height="384" data-testid="img-intro-4" />
            </div>
            <article className="max-w-3xl mx-auto">
              <h2 id="intro-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-intro-title">
                강남 달토 소개
              </h2>
              <p className="text-lg mb-3">
                역삼동 삼정호텔에 위치한 <strong>달토</strong>(<em>달리는토끼</em>, <em>런닝래빗</em>)는
                10년 넘게 운영되어 온 강남 대표 하이퍼블릭 가라오케입니다.
                넓고 쾌적한 룸, 세련된 인테리어, 그리고 10년 경력의 전문 매니저진이 모든 손님에게 맞춤형 서비스를 제공합니다.
              </p>
              <p className="text-lg mb-3">
                맞춤 서비스는 손님들의 초이스 스타일, 이상형, 성격 등 개인 니즈에 맞춰 진행됩니다.
              </p>
              <p className="text-lg mb-3">
                비즈니스 접대, 친구 모임, 회식 자리까지 어떤 자리이든 완벽히 어울리는 하이퍼블릭 룸입니다.
                처음 오신 분도 편하게 하나하나 시스템부터 설명드리며 즐길 수 있는 분위기의 가라오케입니다.
              </p>
            </article>
          </AosSection>
        </section>

        {/* 대표 인사말 - E-E-A-T Experience */}
        <section id="owner" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="owner-title">
          <AosSection className="container mx-auto px-5 py-20">
            <article className="max-w-3xl mx-auto">
              <h2 id="owner-title" className="text-4xl md:text-5xl mb-8 font-heading text-center inline-block w-full bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-owner-title">
                대표 인사말
              </h2>
              <div className="p-8 rounded-2xl border border-slate-600 bg-gray-800/50">
                <p className="text-lg mb-4 leading-relaxed">
                  안녕하세요. 강남 달토를 운영하고 있는 대표입니다.
                </p>
                <p className="text-lg mb-4 leading-relaxed text-gray-300">
                  저는 2015년부터 강남 역삼동에서 가라오케를 운영해 왔습니다. 처음 이 업계에 발을 들였을 때부터 한 가지 원칙을 지켜왔습니다. <strong className="text-white">"처음 오시는 분도 단골처럼 편하게"</strong> — 이것이 10년 넘게 강남 달토가 유지해 온 운영 철학입니다.
                </p>
                <p className="text-lg mb-4 leading-relaxed text-gray-300">
                  강남에는 수많은 가라오케가 있지만, 저희가 오랫동안 사랑받을 수 있었던 이유는 단순합니다. <strong className="text-white">투명한 가격, 정직한 서비스, 그리고 손님 한 분 한 분을 기억하는 진심</strong>입니다.
                  매니저 한 분 한 분이 최소 3년 이상의 경력을 갖추고 있으며, 저 역시 현장에서 직접 손님을 맞이하고 서비스 품질을 관리합니다.
                </p>
                <p className="text-lg mb-4 leading-relaxed text-gray-300">
                  10년 동안 현장에서 직접 보고 느낀 것이 있습니다. 손님들이 진정으로 원하시는 것은 화려함이 아니라 <strong className="text-white">편안함과 신뢰</strong>입니다. 처음 방문하셔도 어색하지 않도록, 가격 때문에 불쾌하지 않도록, 다음에 또 오고 싶다고 느끼시도록 — 그것이 저희가 매일 노력하는 방향입니다.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  강남 달토는 앞으로도 손님의 입장에서 생각하고, 한 번의 방문이 좋은 기억이 될 수 있도록 최선을 다하겠습니다. 감사합니다.
                </p>
                <p className="mt-6 text-right text-cyan-400 font-bold">— 강남 달토 대표</p>
              </div>
            </article>
          </AosSection>
        </section>

        {/* 시스템 */}
        <section id="system" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="system-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <article className="max-w-3xl mx-auto">
              <h2 id="system-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-system-title">
                강남 달토 시스템 안내
              </h2>
              <p className="text-lg mb-3">
                현재 강남 지역 대부분의 가라오케는 60분 단위 시스템으로 운영되고 있습니다.
                달토 역시 T/C 기준 60분으로 진행되며, 연장 시에도 동일하게 60분 단위로 추가됩니다.
              </p>
              <p className="text-lg mb-3">
                입장 시 담당 매니저가 직접 안내를 도와드리며, 룸에 착석하시면 물, 음료, 맥주 등 기본 세팅이 제공됩니다.
                이후에는 <strong>룸 초이스(Choice)</strong> 형식으로 진행되며, 손님이 직접 선택하거나 매니저가 취향에 맞춰 추천해드립니다.
              </p>
              <p className="text-lg mb-3">
                처음 방문하셔도 부담 없이 즐길 수 있도록 모든 과정은 투명하게 안내드리고 있습니다.
              </p>
            </article>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/c1.jpg" alt="달토 프리미엄 룸 시설 안내" loading="lazy" width="512" height="384" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/c2.jpg" alt="하이퍼블릭 초이스 시스템 진행 모습" loading="lazy" width="512" height="384" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/c3.jpg" alt="전문 매니저 맞춤 서비스" loading="lazy" width="512" height="384" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/c4.jpg" alt="쾌적한 룸 환경과 분위기" loading="lazy" width="512" height="384" />
              <img className="rounded-2xl w-full max-w-[512px]" src="/img/c5.jpg" alt="최신 음향 시설과 장비" loading="lazy" width="512" height="384" />
            </div>
          </AosSection>
        </section>

        {/* 강남 달토만의 차별점 - E-E-A-T Authoritativeness */}
        <section id="difference" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="difference-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <article className="max-w-4xl mx-auto">
              <h2 id="difference-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-difference-title">
                강남 달토만의 차별점
              </h2>
              <p className="text-lg mb-10 text-gray-300">
                10년간 강남에서 운영하며 쌓아온 노하우와 데이터를 바탕으로, 다른 곳에서는 경험할 수 없는 서비스를 제공합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">10년+ 경력 전문 매니저진</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 달토의 매니저는 모두 최소 3년 이상의 현장 경력을 보유하고 있습니다. 단순한 안내가 아닌, 손님의 분위기와 취향을 빠르게 파악해 최적의 초이스를 제안하는 전문성을 갖추고 있습니다. 신입 매니저도 최소 2주간의 교육 과정을 수료한 후 현장에 투입됩니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">삼정호텔 B1 프리미엄 시설</h3>
                  <p className="text-gray-300 leading-relaxed">
                    역삼동 삼정호텔 지하 1층 전체를 사용하는 넓은 공간에서 운영됩니다. 소형룸(2~3인)부터 대형룸(10인 이상)까지 다양한 크기의 룸을 보유하고 있으며, JBL 프리미엄 스피커와 최신 음향 장비로 최고의 사운드를 제공합니다. 정기적인 시설 점검과 리모델링으로 항상 쾌적한 상태를 유지합니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">투명한 가격 정책</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 달토는 모든 요금을 사전에 명확하게 안내합니다. 주대, T/C, 지명비, 연장비까지 숨겨진 추가 비용이 전혀 없습니다. 10년간 "바가지 없는 곳"이라는 평가를 받아온 것은 이 원칙을 한 번도 어긴 적이 없기 때문입니다. 예약 시 예산을 말씀해 주시면 그에 맞춰 최적의 구성을 제안드립니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">24시간 연중무휴 운영</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 달토는 365일 24시간 운영됩니다. 새벽 시간대에도 동일한 품질의 서비스를 제공하며, 야간 근무 매니저진도 동일한 교육을 받은 전문 인력으로 구성되어 있습니다. 갑작스러운 모임이나 새벽 약속에도 언제든 이용 가능합니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">맞춤형 초이스 시스템</h3>
                  <p className="text-gray-300 leading-relaxed">
                    처음 방문하시는 분들이 가장 걱정하는 부분이 초이스입니다. 강남 달토는 손님의 이상형, 선호 스타일, 자리 분위기를 세심하게 파악해 자연스럽게 매칭을 도와드립니다. "처음이라 어떻게 해야 할지 모르겠다"고 말씀하시면 매니저가 전 과정을 자연스럽게 안내해드립니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">높은 재방문율</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 달토의 재방문율은 업계 평균을 크게 상회합니다. 한 번 방문하신 분들이 다시 찾아주시는 이유는 일관된 서비스 품질과 신뢰 때문입니다. 단골 고객 전용 혜택과 VIP 관리 시스템을 통해 오래 찾아주시는 분들에게 더 나은 서비스를 제공합니다.
                  </p>
                </article>
              </div>
            </article>
          </AosSection>
        </section>

        {/* 이용 가이드 */}
        <section id="guide" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="guide-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <article className="max-w-3xl mx-auto">
              <h2 id="guide-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-guide-title">
                강남 달토 이용 가이드
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                처음 방문하시는 분들을 위해 예약부터 퇴장까지 전 과정을 안내드립니다.
              </p>
              <ol className="text-left space-y-6" aria-label="이용 단계별 안내">
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">1</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">전화 예약</h3>
                    <p className="text-gray-300">방문 전 전화(010-2303-3778) 또는 카카오톡(tlsgustlra)으로 예약합니다. 방문 인원, 희망 시간대, 예산 등을 말씀해 주시면 최적의 룸과 서비스를 준비해드립니다.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">2</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">매장 도착 및 입장</h3>
                    <p className="text-gray-300">역삼동 삼정호텔 B1으로 오시면 입구에서 담당 매니저가 직접 맞이합니다. 처음 오신 분도 편하게 안내받으실 수 있습니다.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">3</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">룸 배정 및 기본 세팅</h3>
                    <p className="text-gray-300">인원수와 분위기에 맞는 룸에 안내됩니다. 착석하시면 물, 음료, 맥주, 안주 등 기본 세팅이 제공되며, 최신 음향 장비와 함께 쾌적한 환경이 준비됩니다.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">4</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">초이스 진행</h3>
                    <p className="text-gray-300">룸 초이스 형식으로 진행됩니다. 손님이 직접 선택하시거나, 매니저가 취향과 분위기에 맞춰 추천해드립니다. 부담 없이 자연스럽게 진행되니 걱정하지 마세요.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">5</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">즐거운 시간</h3>
                    <p className="text-gray-300">기본 T/C는 60분이며, 연장도 60분 단위로 가능합니다. 노래, 대화, 게임 등 자유롭게 즐기시면 됩니다. 추가 주류나 안주 주문도 언제든 가능합니다.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-black font-bold text-lg">6</span>
                  <div>
                    <h3 className="text-xl font-bold mb-1">정산 및 퇴장</h3>
                    <p className="text-gray-300">이용이 끝나면 매니저가 정산을 도와드립니다. 현금 또는 카드 결제가 가능하며, 모든 요금은 사전에 안내된 금액 그대로 적용됩니다. 추가 요금 걱정 없이 편하게 마무리하세요.</p>
                  </div>
                </li>
              </ol>
            </article>
          </AosSection>
        </section>

        {/* 강남 가라오케 선택 가이드 - E-E-A-T Expertise */}
        <section id="select-guide" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="select-guide-title">
          <AosSection className="container mx-auto px-5 py-20">
            <article className="max-w-3xl mx-auto">
              <h2 id="select-guide-title" className="text-4xl md:text-5xl mb-5 font-heading text-center inline-block w-full bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-select-guide-title">
                강남 가라오케 선택 가이드
              </h2>
              <p className="text-lg mb-8 text-gray-300 text-center">
                강남에서 10년 넘게 가라오케를 운영해온 경험을 바탕으로, 처음 방문하시는 분들이 꼭 확인해야 할 선택 기준을 안내드립니다.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">1. 가격 투명성 확인</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 지역 가라오케 이용 시 가장 중요한 것은 가격의 투명성입니다. 기본 요금(주대, T/C)은 물론 연장비, 추가 서비스 비용까지 사전에 명확하게 안내하는지 반드시 확인하세요. "나중에 알려드릴게요"라고 하는 곳은 추가 비용이 발생할 가능성이 높습니다. 전화 예약 시 총 예상 비용을 구체적으로 물어보시는 것을 권합니다.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">2. 매니저 경력과 서비스 수준</h3>
                  <p className="text-gray-300 leading-relaxed">
                    좋은 가라오케의 핵심은 매니저의 역량입니다. 경력 있는 매니저는 손님의 분위기를 빠르게 파악하고, 초이스 과정에서 어색함 없이 자연스럽게 안내합니다. 처음 방문하는 곳이라면 "처음인데 어떻게 진행되나요?"라고 물어보세요. 구체적이고 친절하게 설명해주는 곳이 신뢰할 수 있습니다.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">3. 시설 상태와 위생</h3>
                  <p className="text-gray-300 leading-relaxed">
                    룸의 청결도, 음향 장비의 상태, 화장실 관리 등은 업소의 운영 수준을 보여주는 지표입니다. 오래된 시설이라도 꾸준히 관리하는 곳과 그렇지 않은 곳은 확연히 차이가 납니다. 강남 달토는 매일 영업 전후 전 룸 청소와 소독을 시행하며, 반기마다 시설 점검 및 장비 교체를 진행합니다.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">4. 위치와 접근성</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 지역 가라오케는 주로 역삼역과 강남역 주변에 밀집해 있습니다. 대중교통 접근성이 좋은 곳을 선택하면 택시비를 절약할 수 있고, 특히 늦은 시간 귀가 시 안전합니다. 건물 내 주차 시설이 있는지, 발렛파킹이 가능한지도 확인하면 좋습니다.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">5. 운영 기간과 후기</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 지역 가라오케는 평균 2~3년 이내에 폐업하거나 업종이 변경되는 경우가 많습니다. 오래 운영된 곳은 그만큼 서비스 품질과 가격 경쟁력이 검증되었다는 의미입니다. 실제 방문 후기를 확인하고, 최근 후기가 꾸준히 올라오는지도 체크해보세요.
                  </p>
                </div>
              </div>
            </article>
          </AosSection>
        </section>

        {/* 가격 */}
        <section id="price" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="price-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <h2 id="price-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-price-title">
              강남 달토 가격 안내
            </h2>
            <p className="text-lg mb-2">
              <strong>달토</strong>(<em>달리는토끼</em>, <em>런닝래빗</em>)은 합리적인 가격 정책으로 운영됩니다.{" "}
              <br className="hidden md:block" /> 주대, T/C, 지명비, 연장비 등 모든 요금이
              명확하게 공개되어 있으며 숨겨진 추가 비용이 전혀 없습니다.
            </p>
            <div className="my-10 lg:flex max-w-3xl mx-auto gap-6">
              <div className="flex-[2] lg:flex lg:flex-col lg:justify-center relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full border border-slate-600 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-50 -z-10" aria-hidden="true" />
                <ul className="font-bold text-xl" aria-label="가격 구성 요약">
                  <li className="p-3">기본 룸차지(T/C): 60분 기준</li>
                  <li className="p-3">연장: 동일 60분 단위</li>
                  <li className="p-3">주류, 안주, 음료: 합리적 가격 구성</li>
                  <li className="p-3">사전 예약 시 특별 할인 이벤트 진행 중</li>
                </ul>
                <p className="text-base">
                  가격 관련 상세 안내는 예약 시 담당 매니저가 직접 설명드리며,{" "}
                  <br className="hidden md:block" /> 예산에 맞춰 맞춤형 패키지 구성도 가능합니다.
                </p>
              </div>
              <div className="flex-1 lg:flex lg:flex-col lg:justify-center whitespace-nowrap">
                <ul className="m-2 p-4 rounded-2xl border border-slate-600 bg-gray-800/50" aria-label="기본 요금">
                  <li className="p-3">주대 180,000원</li>
                  <li className="p-3">R/T 50,000원</li>
                  <li className="p-3">T/C 130,000원</li>
                  <li className="p-3">
                    연장 T/C 150,000원 <br /> <span className="text-sm text-gray-400">(술추가 없을시 연장티+)</span>
                  </li>
                </ul>
                <ul className="m-2 p-4 rounded-2xl border border-slate-600 bg-gray-800/50" aria-label="인원별 가격">
                  <li className="p-3">1인 360,000원</li>
                  <li className="p-3">2인 490,000원</li>
                  <li className="p-3">3인 620,000원</li>
                  <li className="p-3">4인 750,000원</li>
                </ul>
              </div>
            </div>
            <p className="text-base text-gray-400">
              ※ 현금 결제 기준이며, 카드 결제 시 +@ 될 수 있습니다.
            </p>
          </AosSection>
        </section>

        {/* 특별 서비스 */}
        <section id="service" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="service-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <h2 id="service-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-service-title">
              강남 달토 특별 서비스
            </h2>
            <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
              단순한 가라오케를 넘어, 손님 한 분 한 분에게 맞춤형 경험을 제공합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">비즈니스 접대</h3>
                <p className="text-gray-300">
                  중요한 거래처 접대, 파트너 미팅 후 자리에 적합합니다.
                  프라이빗한 공간에서 격조 있는 분위기를 제공하며,
                  담당 매니저가 자리의 성격에 맞게 전반적인 서비스를 조율합니다.
                  사전 예약 시 특별 세팅도 가능합니다.
                </p>
              </article>
              <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">생일 파티 및 기념일</h3>
                <p className="text-gray-300">
                  생일, 승진, 기념일 등 특별한 날을 위한 맞춤 서비스를 제공합니다.
                  케이크 준비, 깜짝 이벤트 연출, 특별 세팅 등
                  사전에 말씀해 주시면 잊지 못할 시간을 만들어 드립니다.
                </p>
              </article>
              <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">단체 모임 및 회식</h3>
                <p className="text-gray-300">
                  5인 이상 단체 모임이나 회식에 최적화된 넓은 룸을 보유하고 있습니다.
                  인원수에 맞는 룸 배정, 단체 할인 패키지, 맞춤형 주류 세팅까지
                  회식 간사님의 부담을 줄여드리는 서비스를 제공합니다.
                </p>
              </article>
              <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">1인 프리미엄 이용</h3>
                <p className="text-gray-300">
                  혼자 방문하시는 분들도 전혀 부담 없이 이용 가능합니다.
                  1인 전용 합리적 가격으로 운영되며, 실제로 혼자 오시는 고객이 절반 가까이 됩니다.
                  혼자만의 시간을 즐기고 싶을 때 편하게 방문하세요.
                </p>
              </article>
            </div>
          </AosSection>
        </section>

        {/* 안전·위생 관리 + 투명 운영 원칙 - E-E-A-T Trustworthiness */}
        <section id="safety" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="safety-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <article className="max-w-4xl mx-auto">
              <h2 id="safety-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-safety-title">
                안전 및 위생 관리
              </h2>
              <p className="text-lg mb-10 text-gray-300">
                강남 달토는 손님의 안전과 건강을 최우선으로 생각합니다. 매일 실천하는 위생 관리와 투명한 운영 원칙을 소개합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">매일 전 룸 청소 및 소독</h3>
                  <p className="text-gray-300 leading-relaxed">
                    영업 시작 전과 영업 종료 후, 하루 2회 모든 룸을 전문 청소합니다. 소파, 테이블, 마이크, 리모컨 등 손이 닿는 모든 표면을 소독제로 닦고, 환기 시스템을 가동해 실내 공기를 순환시킵니다. 손님이 이용하시는 동안에도 룸 교체 시마다 빠른 청소와 소독을 진행합니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">정기 시설 점검</h3>
                  <p className="text-gray-300 leading-relaxed">
                    반기(6개월)마다 전체 시설 안전 점검을 실시합니다. 소방 설비, 전기 시설, 음향 장비, 조명, 에어컨 등 모든 설비의 상태를 전문 업체를 통해 점검하고 필요 시 즉시 교체합니다. 삼정호텔 건물 자체의 안전 관리 시스템과 함께 이중으로 관리됩니다.
                  </p>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">투명 운영 3원칙</h3>
                  <ul className="text-gray-300 space-y-2 leading-relaxed">
                    <li><strong className="text-white">1. 사전 고지:</strong> 모든 비용은 이용 전에 안내합니다. 예약 시 총 예상 비용을 미리 알려드리며, 현장에서 추가 비용이 발생하지 않습니다.</li>
                    <li><strong className="text-white">2. 정직한 서비스:</strong> 손님에게 불필요한 추가 서비스를 권유하지 않습니다. 손님이 원하시는 범위 내에서 최선의 서비스를 제공합니다.</li>
                    <li><strong className="text-white">3. 고객 보호:</strong> 과음 방지를 위한 적절한 안내와 안전한 귀가를 위한 택시 호출 서비스를 제공합니다.</li>
                  </ul>
                </article>
                <article className="p-6 rounded-2xl border border-slate-600 bg-gray-800/50">
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">개인정보 보호</h3>
                  <p className="text-gray-300 leading-relaxed">
                    강남 달토는 손님의 프라이버시를 철저히 보호합니다. 예약 정보, 방문 기록 등 개인정보는 서비스 제공 목적 외에 절대 사용하지 않으며, 외부에 공유하지 않습니다. 비즈니스 접대 등 보안이 중요한 자리도 안심하고 이용하실 수 있습니다.
                  </p>
                </article>
              </div>
            </article>
          </AosSection>
        </section>

        {/* 후기 */}
        <section id="reviews" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="reviews-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <h2 id="reviews-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-review-title">
              강남 달토 후기
            </h2>
            <p className="text-base text-gray-400 mb-6">
              실제 방문 고객님들의 솔직한 후기입니다.
            </p>
            <div className="mx-auto max-w-3xl">
              <ul aria-label="고객 후기 목록">
                {[
                  { text: '"분위기 진짜 좋아요" 처음 가봤는데 룸도 넓고 음향도 좋았어요. 직원분들 서비스가 자연스럽고 친절해서 기분 좋게 놀다 왔습니다.', author: "첫 방문 고객" },
                  { text: '"회식 자리로 완벽해요" 회사 사람들과 방문했는데 초이스도 깔끔하고 매니저님이 센스 있게 챙겨주셨어요. 강남 가라오케 중에서는 여기가 제일 편하고 안정적이었어요.', author: "직장인 고객" },
                  { text: '"다음엔 또 올 거예요" 분위기, 가격, 서비스 다 만족. 역삼 삼정호텔 안이라 찾기도 쉽고 달리는토끼 런닝래빗 이름값 하네요!', author: "단골 고객" },
                  { text: "친구 소개로 처음 갔는데 진짜 괜찮았어요. 룸이 깔끔하고 음악 음질도 좋아서 노래 부르기 딱이에요. 직원분들이 자연스럽게 분위기 맞춰줘서 어색하지 않았어요. 서비스가 확실히 다르네요. 또 갈 예정이에요.", author: "지인 추천 고객" },
                  { text: "요즘 강남 쪽 가라오케 몇 군데 가봤는데, 달토(달리는토끼) 만큼 편했던 곳은 없어요. 술도 깔끔하게 세팅되고 매니저분도 센스 있게 챙겨줘서 기분 좋게 마무리했어요. 다음엔 단골 될 것 같아요.", author: "비교 방문 고객" },
                  { text: "거래처 접대로 처음 이용했는데 대만족입니다. 매니저분이 비즈니스 자리라고 미리 말씀드렸더니 분위기 있게 세팅해 주셨어요. 상대방도 아주 즐거워하셨고, 덕분에 계약도 잘 마무리됐습니다. 접대 장소로 추천합니다.", author: "비즈니스 고객" },
                  { text: "혼자 갔는데 전혀 어색하지 않았어요. 매니저님이 편하게 대해주셔서 좋았고, 1인 가격도 합리적이에요. 강남에서 혼자 놀기 좋은 곳 찾으신다면 달토 추천합니다. 벌써 세 번째 방문이에요.", author: "1인 이용 고객" },
                  { text: "생일 파티로 친구들이랑 갔는데 깜짝 이벤트까지 준비해 주셔서 감동받았어요. 룸도 넓고 사운드 좋아서 노래 부르기 최고였어요. 강남 가라오케 여러 곳 다녀봤지만 여기만큼 신경 써주는 곳은 처음이에요.", author: "생일 파티 고객" },
                ].map((review, i) => (
                  <li
                    key={i}
                    className="m-2 p-8 max-w-full rounded-2xl border border-slate-600 bg-gray-800/50 text-left text-xl"
                    data-testid={`text-review-${i}`}
                  >
                    <blockquote>
                      <p className="mb-2">{review.text}</p>
                      <cite className="text-sm text-gray-400 not-italic">- {review.author}</cite>
                    </blockquote>
                  </li>
                ))}
              </ul>
            </div>
          </AosSection>
        </section>

        {/* FAQ */}
        <section id="faq" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="faq-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <h2 id="faq-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-faq-title">
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="mx-auto max-w-2xl text-left">
              {faqData.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={`Q. ${faq.question}`}
                  answer={`A. ${faq.answer}`}
                />
              ))}
            </div>
            <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-3" role="group" aria-label="연락처 정보">
              <a href="tel:010-2303-3778" className="px-5 py-2 rounded-full bg-purple-600 text-lg hover:bg-purple-500 transition-colors" aria-label="전화번호 010-2303-3778" data-testid="text-contact-phone">
                전화번호 010-2303-3778
              </a>
              <a href="https://t.me/hscompanyshs" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-purple-600 text-lg hover:bg-purple-500 transition-colors" aria-label="텔레그램 상담" data-testid="text-contact-telegram">
                텔레그램 @hscompanyshs
              </a>
              <span className="px-5 py-2 rounded-full bg-purple-600 text-lg" data-testid="text-contact-kakao">
                카카오톡 tlsgustlra
              </span>
            </div>
          </AosSection>
        </section>

        {/* 위치 */}
        <section id="location" className="overflow-hidden bg-black/90 backdrop-blur pt-20" aria-labelledby="location-title">
          <AosSection className="container mx-auto px-5 py-20 text-center">
            <h2 id="location-title" className="text-4xl md:text-5xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" data-testid="text-location-title">
              오시는 길
            </h2>
            <p className="text-base text-gray-400 mb-6">
              서울 강남구 역삼동 삼정호텔 B1에 위치해 있습니다. 강남역에서 도보 이동 가능합니다.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left mb-10">
              <article className="p-5 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-lg font-bold mb-3 text-cyan-400">지하철 이용 시</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>역삼역 (2호선)</strong> 3번 출구 → 도보 약 5분. 출구에서 나와 테헤란로 방면으로 직진 후 삼정호텔 입구로 진입, B1층으로 내려오시면 됩니다.</li>
                  <li><strong>강남역 (2호선, 신분당선)</strong> 11번 출구 → 도보 약 10분. 강남대로를 따라 역삼역 방향으로 이동 후 삼정호텔 B1으로 오시면 됩니다.</li>
                </ul>
              </article>
              <article className="p-5 rounded-2xl border border-slate-600 bg-gray-800/50">
                <h3 className="text-lg font-bold mb-3 text-cyan-400">자가용 및 택시 이용 시</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><strong>주차:</strong> 삼정호텔 내 전용 주차장 이용 가능하며, 발렛파킹 서비스도 제공합니다.</li>
                  <li><strong>택시:</strong> "역삼동 삼정호텔" 또는 "강남 달토"로 말씀하시면 됩니다. 강남역에서 택시 이용 시 기본요금 이내 도착합니다.</li>
                  <li><strong>네비게이션:</strong> "삼정호텔" 검색 후 B1층으로 오시면 됩니다.</li>
                </ul>
              </article>
            </div>

            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto" role="list" aria-label="관련 키워드">
              {[
                "강남 가라오케",
                "강남 하이퍼블릭",
                "강남 달토",
                "달리는토끼",
                "런닝래빗",
                "역삼동 가라오케",
                "강남 달토 가격",
                "강남 달토 위치",
                "강남 달토 후기",
              ].map((tag, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="flex justify-center items-center p-3 rounded-2xl border border-slate-600 bg-gray-800/50 text-xl"
                >
                  {tag}
                </div>
              ))}
            </div>
            <figure className="mt-10">
              <img className="rounded-2xl w-full max-w-[512px] mx-auto" src="/img/m.png" alt="강남 달토 위치 약도 - 서울 강남구 역삼동 삼정호텔 B1" loading="lazy" width="512" height="384" data-testid="img-map" />
              <figcaption className="mt-3 text-sm text-gray-500">역삼동 삼정호텔 B1층 약도</figcaption>
            </figure>
            <address className="text-lg mt-5 not-italic">
              <strong>강남 달토</strong> | 서울 강남구 역삼동 삼정호텔 B1<br />
              <a href="tel:010-2303-3778" className="text-cyan-400 hover:text-cyan-300 transition-colors" aria-label="전화 010-2303-3778">
                010-2303-3778
              </a>
            </address>
          </AosSection>
        </section>

        {/* CTA */}
        <section className="overflow-hidden pb-20 bg-black/90 backdrop-blur" aria-labelledby="cta-title">
          <div className="container mx-auto px-5 py-10 text-center">
            <h2 id="cta-title" className="text-3xl md:text-4xl mb-5 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              예약 안내
            </h2>
            <p className="text-base text-gray-400 mb-6 max-w-2xl mx-auto">
              합리적인 가격과 최고의 서비스를 제공하는 강남 달토에서 특별한 시간을 보내세요.
              비즈니스 접대, 친구 모임, 회식 등 모든 자리에 완벽합니다.
            </p>
            <a
              href="tel:010-2303-3778"
              className="inline-flex items-center gap-2 p-5 md:ps-7 text-3xl rounded-full text-black bg-gradient-to-r from-cyan-400 to-purple-600 shadow-xl font-heading"
              aria-label="전화 예약하기 010-2303-3778"
              data-testid="link-call"
            >
              <span>전화예약</span>
              <span className="px-5 py-2 inline-block rounded-full bg-black">
                <strong className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 font-normal">
                  010-2303-3778
                </strong>
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800" role="contentinfo" data-testid="footer">
        <div className="container mx-auto px-5 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-heading text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">강남 달토</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                10년 전통 강남 대표 하이퍼블릭 가라오케.
                달리는토끼(런닝래빗)로도 불리며,
                투명한 가격과 전문 서비스로 신뢰받고 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-4">연락처</h3>
              <address className="not-italic text-gray-400 text-sm space-y-2">
                <p>서울 강남구 역삼동 삼정호텔 B1</p>
                <p>
                  <a href="tel:010-2303-3778" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-footer-phone">
                    010-2303-3778
                  </a>
                </p>
                <p>
                  <a href="https://t.me/hscompanyshs" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-footer-telegram">
                    텔레그램 @hscompanyshs
                  </a>
                </p>
                <p>카카오톡 tlsgustlra</p>
                <p>24시간 연중무휴 운영</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-4">바로가기</h3>
              <nav className="text-sm space-y-2" aria-label="푸터 내비게이션">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} className="block text-gray-400 hover:text-white transition-colors" data-testid={`link-footer-${link.href.slice(1)}`}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; 2015-2026 강남 달토(달리는토끼, 런닝래빗). All Rights Reserved.</p>
          </div>
        </div>
        <div className="h-24" aria-hidden="true" />
      </footer>

      <div className="fixed bottom-0 w-full py-4 md:py-6 text-center z-50 bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden="true">
        <a
          href="tel:010-2303-3778"
          className="pointer-events-auto inline-flex items-center gap-2 p-4 md:p-5 md:ps-7 text-2xl md:text-3xl rounded-full text-black bg-gradient-to-r from-cyan-400 to-purple-600 shadow-xl font-heading"
          aria-label="전화 예약 010-2303-3778"
          data-testid="link-floating-call"
        >
          <span>전화</span>
          <span className="px-4 md:px-5 py-2 inline-block rounded-full bg-black">
            <strong className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 font-normal">
              010-2303-3778
            </strong>
          </span>
        </a>
      </div>
    </div>
  );
}
