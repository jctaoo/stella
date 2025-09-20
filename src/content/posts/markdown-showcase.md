---
title: Markdown & LaTeX Showcase
category: Demo
tags: [markdown, latex, astro]
abbr: A compact tour of Markdown features plus inline and block LaTeX.
---

Welcome! This page demonstrates common Markdown features used in this site, plus LaTeX math. Use it as a reference when writing new content.[^credits]

## Headings

### H3 Heading

#### H4 Heading

## Text styles

You can write regular paragraphs with inline styles like **bold**, *italic*, and `inline code`. Links also work: [Astro](https://astro.build).

> Blockquotes highlight important remarks or notes.


---

## Lists

- Unordered item one
- Unordered item two
  - Nested item

1. Ordered one
2. Ordered two

- [x] Task done
- [ ] Task pending

---

## Code blocks

```ts
// TypeScript example
type User = {
  id: string;
  name: string;
};

export function greet(user: User): string {
  return `Hello, ${user.name}!`;
}
```

```bash
# Shell example
pnpm install
pnpm run dev
```

---

## Table

| Feature  | Supported | Notes                  |
|----------|-----------|------------------------|
| Headings | Yes       | H2–H4 styled by Prose  |
| Lists    | Yes       | Ordered and unordered  |
| Code     | Yes       | Fenced with language   |
| Tables   | Yes       | Markdown tables        |

---

## Image

Local content assets can be referenced relative to this file:

![Sample image](./Hello%20World.jpg)

---

## LaTeX math

Inline math uses dollar signs, for example: $E = mc^2$, or conditional probability \(P(A\mid B) = \frac{P(A \cap B)}{P(B)}\).

Block math uses double dollar signs:

$$
\int_{0}^{\infty} e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

You can also align multiple equations:

$$
\begin{aligned}
\sum_{i=1}^{n} i &= \frac{n(n+1)}{2} \\
\int_{-\infty}^{\infty} e^{-x^2} \, dx &= \sqrt{\pi}
\end{aligned}
$$

Matrices are supported by many renderers:

$$
\mathbf{A} = \begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
$$

---

## Footnotes

Footnotes help with references and asides.[^aside]

[^aside]: This is an example footnote.
[^credits]: Content crafted for a quick feature tour.


