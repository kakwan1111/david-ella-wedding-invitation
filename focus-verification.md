# Schedule Card Focus Verification

- Test method: Chromium headless, keyboard Tab navigation.
- Focused element: 11:30 AM Reception schedule card.
- `:focus-visible`: true.
- Computed outline: solid, 2px.
- Computed transform while focused: translateY(-6px) equivalent matrix.
- Desktop and mobile full-page screenshots were checked after the focusable-card update.
- Vitest, TypeScript check, and production build passed.
