# 강남 달토 (runningrabbiths.com)

## Overview
강남 달토(달리는토끼, 런닝래빗) 가라오케 공식 웹사이트. 정적 랜딩 페이지로 SEO 최적화에 집중한 프로젝트.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Express (minimal, static serving)
- Fonts: Noto Sans KR, Black Han Sans (Google Fonts)
- No database required (static content)

## Project Structure
- `client/src/pages/Home.tsx` - 메인 페이지 (전체 콘텐츠)
- `client/public/img/` - 이미지 에셋 (a.jpg, b*.jpg, c*.jpg, m.png, t.png)
- `client/public/robots.txt` - 검색엔진 크롤링 규칙
- `client/public/sitemap.xml` - 사이트맵 (이미지 사이트맵 포함)
- `client/index.html` - SEO 메타태그, JSON-LD, OG/Twitter Card

## Page Sections (순서)
1. Hero (id="hero") - 메인 타이틀, CTA
2. 소개 (id="intro") - 업소 소개
3. 대표 인사말 (id="owner") - E-E-A-T Experience
4. 시스템 (id="system") - 운영 시스템 안내
5. 차별점 (id="difference") - E-E-A-T Authoritativeness (6개 카드)
6. 이용 가이드 (id="guide") - 6단계 이용 안내
7. 선택 가이드 (id="select-guide") - E-E-A-T Expertise (5개 기준)
8. 가격 (id="price") - 가격표
9. 특별 서비스 (id="service") - 4종 서비스
10. 안전·위생 (id="safety") - E-E-A-T Trustworthiness (4개 카드)
11. 후기 (id="reviews") - 8개 고객 후기
12. FAQ (id="faq") - 11개 질문
13. 위치 (id="location") - 교통 안내 + 약도
14. CTA - 최종 예약 유도

## SEO Implementation (2026-02-18)
### Structured Data (JSON-LD)
- LocalBusiness: 업소 기본정보, NAP, 영업시간, 좌표
- FAQPage: 11개 FAQ (UI와 완전 동기화)
- BreadcrumbList: 홈 경로
- WebPage: 페이지 메타정보, speakable, lastReviewed
- HowTo: 이용 가이드 6단계
- Service: 4종 서비스 카탈로그 (OfferCatalog)

### E-E-A-T 최적화
- Experience: 대표 인사말 (10년 현장 경험 기반 메시지)
- Expertise: 강남 가라오케 선택 가이드 (업계 전문 지식)
- Authoritativeness: 차별점 6가지 (데이터 기반 강점)
- Trustworthiness: 안전·위생 관리 + 투명 운영 3원칙 + 개인정보 보호

### On-page SEO
- Open Graph + Twitter Card 완전 구성
- canonical URL, geo meta tags
- Semantic HTML5 (article, section, nav, address, figure, blockquote)
- Image lazy loading, preload hints
- 키워드: 강남 달토, 강남 가라오케, 강남 하이퍼블릭, 달리는토끼, 런닝래빗
- 네이버/구글 사이트 인증 메타태그 포함
- Internal anchor navigation (sticky nav, 8 links)
- ARIA labels, skip navigation, role attributes

## Key URLs
- 도메인: https://runningrabbiths.com
- 전화: 010-2303-3778
- 텔레그램: @hscompanyshs
- 카카오톡: tlsgustlra
