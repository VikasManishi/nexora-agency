---
name: Cyber Void HUD
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393e'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1e8'
  inverse-on-surface: '#303035'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#e5b5ff'
  on-secondary: '#4e0078'
  secondary-container: '#a100f0'
  on-secondary-container: '#f7e1ff'
  tertiary: '#faf3ff'
  on-tertiary: '#3c0090'
  tertiary-container: '#e1d2ff'
  on-tertiary-container: '#7213ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f4d9ff'
  secondary-fixed-dim: '#e5b5ff'
  on-secondary-fixed: '#30004b'
  on-secondary-fixed-variant: '#7000a8'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#131317'
  on-background: '#e4e1e8'
  surface-variant: '#353439'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-metric:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  label-tag:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

The design system projects high-order computational intelligence, executive-grade infrastructure, and visionary automation. Tailored for enterprise decision-makers, high-growth founders, and tech executives looking to automate end-to-end operations with AI, the aesthetic sits at the intersection of high-end dark cyberpunk and pristine enterprise utility. 

It synthesizes elements of:
- **Futuristic Glassmorphism:** Translucent crystalline surfaces layered over extreme dark depth, utilizing subtle refraction and backplane blurs to separate context tiers.
- **Cyberpunk Precision:** Luminous, energy-charged vectors against deep void backdrops, paired with technical monospace metadata detailing real-time metrics, telemetry, and autonomous logic.
- **Modern Minimalist Discipline:** Rigorous negative space, structural alignment, and disciplined restraint that prevent neon accents from devolving into decorative visual noise.

## Colors

The palette establishes an ultra-deep void baseline upon which high-frequency photon accents communicate priority, operational status, and focus.

- **Primary (`#00F0FF` - Electric Cyan):** The primary focal vector. Represents real-time machine execution, actionable interfaces, primary CTAs, and active network nodes.
- **Secondary (`#B026FF` - Neon Ultraviolet):** Synthetic intelligence layer. Reserved for high-value state changes, AI model orchestration indicators, and deep gradient glows.
- **Tertiary (`#7000FF` - Deep Cyber Violet):** Atmospheric energy. Used for background radial mesh gradients, secondary surface boundary luminescence, and hover bloom backdrops.
- **Neutral Void (`#07070B`):** The absolute grounding canvas. Prevents visual fatigue while yielding maximum perceived contrast for cyan and violet photon emitters.
- **Surface Foundations:**
  - Base Surface: `#07070B`
  - Glass Surface: `rgba(13, 14, 21, 0.70)` with `backdrop-filter: blur(16px)`
  - Elevated Popover Surface: `rgba(20, 22, 34, 0.85)` with `backdrop-filter: blur(24px)`
- **Border Gradients & Strokes:**
  - Idle Glass Border: `rgba(0, 240, 255, 0.12)` or linear gradient of `rgba(0, 240, 255, 0.25)` fading to `rgba(176, 38, 255, 0.05)`
  - Active Glow Border: `rgba(0, 240, 255, 0.60)` with soft outer bleed.
- **Text & Foreground:**
  - High Emphasis: `#F2F5F8` (Crisp Silver-White)
  - Medium Emphasis: `#8A93A6` (Atmospheric Muted Slate)
  - Low Emphasis / De-emphasized: `#4A5263` (Dark Sub-surface Grey)

## Typography

Typography establishes an intentional cadence between futuristic geometric headlines, readable humanistic body copy, and ultra-precise machine telemetry.

- **Display & Headlines (`Space Grotesk`):** Delivers geometric precision and cutting-edge forward momentum. Letter tracking remains slightly tightened on titles to project dense authority.
- **Narrative & Body (`Plus Jakarta Sans`):** Ensures friction-free scanning and sustained reading comfort in dark mode environments, preventing optical vibration against void backgrounds.
- **System Telemetry & Labels (`JetBrains Mono`):** Deployed for micro-copy, status markers, live data outputs, AI workflow tokens, and structural metadata. All tags and system indicators utilize uppercase styling with generous tracking (`0.08em`).

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid with maximum container bounds capped at 1280px for standard pages and 1440px for data-heavy dashboard interfaces.

- **Breakpoints:**
  - `mobile`: `< 768px` (4-column layout, 1.25rem canvas margin, 1rem column gutters)
  - `tablet`: `768px - 1024px` (8-column layout, 2rem canvas margin, 1.25rem column gutters)
  - `desktop`: `L
L‹XÛÛ[[ˆ^[Ý]Ü™[HØ[˜\ÈX\™Ú[‹K\™[HÛÛ[[ˆÝ]\œÊB‚‹H
Š•™\XØ[š]NŠŠˆÙXÝ[ÛœÈœ™X]HšXHÜXÙKLž[™ØØ[Y][\\ËˆYÚY[œÚ]HÛÛ\Û™[[\›˜[È[™›Ü˜ÙHÞ\Ý[X]XÈÜXÙK\ÛXÈÜXÙK[YØ\ÈÈ[][]HXÝXØ[Q[\™˜XÙ\ÈÚ]Ý]Û]\‹‚‚ˆÈÈ[]˜][Ûˆ	ˆ\‚•š\ÝX[Y\˜\˜ÚH\ÈXZ[Z[™Y›Ý›ÝYÚX]žH›ÜÚYÝÜË]›ÝYÚ][ÜÜ\šXÈ[Z[™\ØÙ[˜ÙK˜\šXX›H™Yœ˜XÝ]™H˜XÚÙ›ÜË[™ÝÛšXÈYÙH[[Z[˜][Û‹‚‚‹H
Š“]™[
›ÚYÜ›Ý[™
NŠŠˆ\™HÌÌÌ˜Ý\™˜XÙKˆX^HÛÛZ[ˆ›Û‹Z[\˜XÝ]™H[XšY[˜YX[Y\ÚÛÝÜÈ
˜YX[YÜ˜YY[
Ú\˜ÛH]Ù[\‹™Ø˜JLL‹MKŒLŠH	K˜[œÜ\™[Ì	JX
K‚‹H
Š“]™[H
Û\ÜÛ[ÜœXÈØ\™ÊNŠŠˆÝ\™˜XÙH™Ø˜JLËMŒKÌ
X˜XÚÙ›Ü›\ˆMœˆÝ][™YÚ]H\›Ü™\ˆÜ˜YY[˜[œÚ][Ûš[™Èœ›ÛH™Ø˜JMKŒŒ
X]Ü[YÈ™Ø˜JMÍ‹ÎMKŒJX]›ÝÛK\šYÚ‚‹H
Š“]™[ˆ
XÝ]™KÒÝ™\ˆÝ]\ÊNŠŠˆÝ\™˜XÙH™Ø˜JŒŒ‹ÍŽJXˆ›Ü™\ˆ˜[œÚ][ÛœÈÈ™Ø˜JMKL
XXØÛÛ\[šYYžHH][K]Y\ˆÝÛˆY™\Ú[ÛˆÚYÝÎˆ›Þ\ÚYÝÎˆŒ™Ø˜JMKŒMJK™Ø˜JMÍ‹ÎMKŒ
X‚‹H
Š“]™[È
Ý™\›^HÈ[Ù[ÈÛÛ[X[™˜\ŠNŠŠˆÝ\™˜XÙH™Ø˜JMKMË‹ŽMJX˜XÚÙ›Ü›\ˆÌœ\ÛÛY›Ü™\ˆÙˆ™Ø˜JMK
XÚ]HÜ›Ý[™[™ÈÜ™XYÚYÝÈÙˆ™Ø˜JŽJX‚‚ˆÈÈÚ\\Â‚•H[\™˜XÙH[Xœ˜XÙ\ÈHÝË\˜Y]\Ë\˜Ú]XÝ\˜[Ú[ÝY]H
›Ý[™Y™\ÜÎˆX
KˆÛÙÝ\™\È
˜\ÙK›ÜˆÛÛZ[™\œËLœ›Üˆ\›È[Ù[\ÊH™Y›XÝ™XÚ\Ú[Ûˆ[™Ú[™Y\š[™È˜]\ˆ[ˆ^Y[ÜˆÞK[ZÙHÛÛœÝ[Y\ˆY\Ý]XÜË‚‚‹H
Š’[\˜XÝ]™H[[Y[È
]ÛœË[œ]ÊNŠŠˆ
Œ\™[X
H›Ü™\ˆ˜Y]\Ë™\Ù\š[™È\™YÚ][YÙ\Ë‚‹H
ŠÛÛZ[™\œÈ	ˆÛ\ÜÈ[™[ÎŠŠˆ
\™[X
H›Ü™\ˆ˜Y]\È
›Ý[™Y[Ø
K[]™\š[™ÈÝXHÛÜ›™\ˆ\\š[™Ë‚‹H
Š’\›ÈÚ[™ÝÜÈ	ˆ›Ø][™È[Ù[ÎŠŠˆLœ
Í\™[X
H›Ü™\ˆ˜Y]\È
›Ý[™Y^
KÜ™X][™ÈYš[š]]™HÛÛZ[›Y[›Ý[™\šY\Ë‚‹H
Š”Ý]\È[È	ˆZXÜ›È[™XØ]ÜœÎŠŠˆ[[
NNN\
HÈš\ÝX[HÙ\\˜]HÜ\˜][Û˜[›YÜÈœ›ÛHÝXÝ\˜[™XÝ[™Ý[\ˆØ\™Ë‚‚ˆÈÈÛÛ\Û™[Â‚ˆÈÈÈ]ÛœÂ‹H
Š”š[X\žHÕNŠŠˆ˜XÚÙÜ›Ý[™ÙˆÛÛYÌŒ‘˜Ú]ÌÌÌ˜^[ˆ™]œ˜Z[œÈ[Û›Ø
Ù[ZKX›Û\\˜Ø\ÙJKˆ›ÞÚYÝÎˆMœ™Ø˜JMK
XˆÛˆÝ™\ŽˆØØ[HKŒ‹›ÞÚYÝÈ^[™ÈÈ™Ø˜JMKÊX‚‹H
Š”ÙXÛÛ™\žHÛ\ÜÈÕNŠŠˆ˜XÚÙÜ›Ý[™Ùˆ™Ø˜JLËMŒKÌ
X\›Ü™\ˆÙˆ™Ø˜JMKŒÊXˆ^[ˆÑŒ‘QŽˆÛˆÝ™\Žˆ›Ü™\ˆÚYÈÈÌŒ‘˜Ú]HÝXH[›™\ˆÛÝÈ[œÙ]Lœ™Ø˜JMKŒMJX‚‹H
Š‘ÚÜÝXÝ[ÛŽŠŠˆ˜[œÜ\™[˜XÚÙÜ›Ý[™X™[XÛÙX\ÙÜ˜\KXÛÛ‹\Ý\[Y[YˆÛÛÜŽˆÎNLÐM˜ˆÝ™\ŽˆÌŒ‘˜‚‚ˆÈÈÈ[œ]šY[È	ˆÛÛ›ÛÂ‹H
Š•^[œ]ÎŠŠˆZYÚ˜XÚÙÜ›Ý[™™Ø˜JLËMŒKL
X\›Ü™\ˆ™Ø˜JMKMKMKŒLŠX^ÑŒ‘QŽ›Û\È˜ZØ\HØ[œØ
M
Kˆ›ØÝ\ÈÝ]Hœš[™ÜÈH\ÌŒ‘˜›Ü™\ˆÚ]HL™Ø˜JMKŒÊXÛÝË‚‹H
ŠÚXÚØ›Þ\È	ˆ˜Y[ÜÎŠŠˆMœÜ]X\™KØÚ\˜ÛK\›Ü™\ˆ™Ø˜JMKŒÊX˜XÚÙÜ›Ý[™™Ø˜JËËLKŽJXˆÚ[ˆÙ[XÝY˜XÚÙÜ›Ý[™\›œÈÌŒ‘˜Ú]›XÚÈÚXÚÛX\šËÜ\‚‚ˆÈÈÈÚ\È	ˆ[[Y]žHYÜÂ‹H
Š”Þ\Ý[HYÜÎŠŠˆ˜XÚÙÜ›Ý[™™Ø˜JMKŒ
X\›Ü™\ˆ™Ø˜JMKŒJX^ÌŒ‘˜›ÛX™[]YØ
™]œ˜Z[œÈ[Û›Ø\\˜Ø\ÙJK‚‹H
Š”ÙXÛÛ™\žHRHYÜÎŠŠˆ˜XÚÙÜ›Ý[™™Ø˜JMÍ‹ÎMKŒ
X\›Ü™\ˆ™Ø˜JMÍ‹ÎMKŒJX^ÐŒ‘‘˜‚‹H
Š“Y]šXÈ˜YÙ\ÎŠŠˆ[Û›ÜÜXÙH[Y\šXØ[™XYÝ]Ú]H]™H[Ø][™ÈÜ™Y[‹ØÞX[ˆ™XXÛÛˆÝ
œÚ\˜Ý[\ˆ[ÙH[š[X][ÛŠK‚‚ˆÈÈÈØ\™È	ˆÝ\™˜XÙ\Â‹H
Š‘™X]\™H	ˆ[˜[]XÜÈØ\™ÎŠŠˆZ[Ú]Û\ÜÛ[ÜœXÈ˜XÚÚ[™È
™Ø˜JLËMŒKÌ
X
K\Ü˜YY[›Ü™\ˆ
ÌŒ‘˜ÈÐŒ‘‘˜]ÝÈ[JK[™[\›˜[Y[™ÈÙ]ÈÜXÙK[Øˆ[\›˜[]šY\œÈ\™HZ\›[™HÝ›ÚÙ\È
\ÛÛY™Ø˜JMKMKMKŒŠX
K‚‚ˆÈÈÈÜXÚX[^™YÞ\Ý[H[Ù[\Â‹H
Š•ÛÜšÙ›ÝÈ\[[™H›Ù\ÎŠŠˆš\ÝX[ÛÛ›™XÝ[Ûˆ]È][^š[™ÈÕ‘È]È[[Z[˜]YÚ][˜[ZXÈÞX[ˆ\ÚX\œ˜^H[ÙH[š[X][ÛœË‚‹H
Š•\›Z[˜[šY]ÜÜŠŠˆYXØ]YÛÛœÛÛH›ØÚÜÈ™X]\š[™ÈH\šÙ\ˆ˜XÚÙ›Ü
Ì˜
KÚ[][]YÚ[™ÝÈXY\ˆ˜\œÈÚ][Û›ÜÜXÙHÜ\˜][Û˜[Ý]\Ù\Ë[™]™H^XÝ][ÛˆÝ™X[\Ë