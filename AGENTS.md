<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep cake options, serving sizes and estimate calculations in the shared cafe data module so menu and order form cannot diverge.
- Never show form submission success until a real delivery service confirms receipt; preserve entered data if sending is unavailable.
- Keep form sending in the existing browser submit handlers using the user-selected external service, without introducing backend infrastructure.
- Cake links open the existing overlay instead of relocating the form; the order panel stays separate from the main-page callout.
- Initialize browser-only scroll reset in the existing router factory and root mount/pageshow effect, with router scroll restoration disabled; this stack has no main.tsx entry.
