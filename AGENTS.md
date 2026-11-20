# KalkulatorSeller - Agent AI Instructions

## Anti-slop requirements
- Read and follow the installed antislop core rules every session.
- Load `antislop-ui` for all interface and visual work.
- Load `antislop-human` for accessibility and interaction work.
- Load `antislop-layoutmobile` for responsive implementation.
- Load `antislop-code` for comment hygiene.
- Treat [UI_UX_Design_Spec_KalkulatorSeller_v1.0.md](file:///Users/dimasaditya/project/kalkulator-seller/UI_UX_Design_Spec_KalkulatorSeller_v1.0.md) and [DESIGN.md](file:///Users/dimasaditya/project/kalkulator-seller/DESIGN.md) as the product-specific visual direction.
- Do not invent visual patterns without a product reason.
- Run the antislop Delivery Gate before marking UI work complete.
- Report PASS/FAIL with concrete evidence. Do not claim PASS without inspecting the implemented page and testing it.

## Product & Engineering Guidelines
- **Product Name**: KalkulatorSeller
- **Tech Stack**: Astro SSG, Vanilla JavaScript ES Modules, Tailwind CSS v4
- **Hosting Target**: Cloudflare Pages
- **Interface Language**: Bahasa Indonesia
- **Platform MVP**: Shopee, TikTok Shop, Tokopedia

## Sources of Truth
1. [PRD_KalkulatorSeller_AgentAI_v1.0.md](file:///Users/dimasaditya/project/kalkulator-seller/PRD_KalkulatorSeller_AgentAI_v1.0.md): Rules of business, formulas, fee calculations, features, scope, and acceptance criteria.
2. [UI_UX_Design_Spec_KalkulatorSeller_v1.0.md](file:///Users/dimasaditya/project/kalkulator-seller/UI_UX_Design_Spec_KalkulatorSeller_v1.0.md) & [DESIGN.md](file:///Users/dimasaditya/project/kalkulator-seller/DESIGN.md): Visual presentation, page structure, interaction patterns, accessibility, and performance policies.

## Anti-slop Delivery Gate Checklist
Before marking any UI task complete, verify and report:
1. **Visual direction**: Matches `DESIGN.md` (no generic AI templates, gradients, or glassmorphism).
2. **UI quality**: Clear visual hierarchy, consistent component tokens.
3. **Accessibility**: Keyboard navigable, valid focus states, clear labels, WCAG contrast.
4. **Mobile**: No horizontal overflow at 320 CSS px, touch targets ≥ 44x44px.
5. **Performance**: No external fonts or third-party trackers, zero bloat.
6. **Product accuracy**: Formulas and fees strictly match the PRD.
