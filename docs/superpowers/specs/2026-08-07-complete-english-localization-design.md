# Complete English Localization Design

## Goal

Ensure that selecting English renders all user-visible application text in English while retaining system-locale detection and the existing language choices.

## Architecture

The frontend continues to use Chinese source literals and the static i18n scanner. English remains a generated locale catalog rather than being hard-coded into Vue components. On first launch, the runtime continues to select a supported system locale and falls back to English only when none matches; a manually selected locale remains persisted.

## Scope

- Fill every empty English catalog value.
- Replace unintended Chinese values in the English catalog with accurate English translations.
- Audit frontend source and scanner behavior for user-visible Chinese text that is excluded from localization or otherwise bypasses the runtime catalog.
- Preserve interpolation placeholders exactly.
- Keep system locale detection, supported locales, and manual locale persistence unchanged.
- Do not modify unrelated pre-existing Yarn files in the working tree.

## Validation

- The English locale has exactly the generated catalog's keys.
- No English locale value is empty or contains unintended Chinese characters.
- Placeholder sets match the Chinese source locale.
- The static i18n scan is stable and the production frontend build succeeds.
- Frontend lint succeeds.

