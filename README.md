# Stella

Welcome to Stella, a modern blog project built with Astro. This README provides a guide to help you get started quickly.

## 🚀 Get Started

To get started with this project, you can either create a new repository from this template or clone it directly.

-   **Use this template**: Click the `Use this template` button on the GitHub page to create a new repository with the same structure and files.
-   **Clone the repository**: If you prefer to work with a local copy, you can clone the repository to your machine.

After setting up the repository, follow these steps to run the project locally. This project uses `pnpm` as the package manager.

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Start the development server**:
    ```bash
    pnpm dev
    ```

3.  **Open in browser**:
    Once the server is running, you can view the site at `http://localhost:4321`.

## ✍️ Add Content

This project uses [Astro's Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage and validate your content. All content is stored in the `src/content/` directory.

### Posts

-   **Location**: Add new blog posts to `src/content/posts/`.
-   **Format**: Use Markdown (`.md`) or MDX (`.mdx`).
-   **Frontmatter**:
    ```yaml
    ---
    title: "My New Blog Post" # Required
    category: "Technology"
    tags: ["astro", "example", "blog"]
    topImage: "/images/post-banner.jpg"
    topImageAlt: "A descriptive alt text for the image"
    ---

    Your content starts here...
    ```

### Snippets

-   **Location**: Add short code snippets or notes to `src/content/snippets/`.
-   **Format**: Also uses Markdown or MDX.
-   **Frontmatter**:
    ```yaml
    ---
    title: "My Awesome Snippet" # Required
    description: "A short description of what this snippet does."
    tags: ["javascript", "react"]
    ---

    // Your code snippet here
    ```

## 📄 Custom Pages

You can easily add new static pages (like an "About" or "Contact" page).

-   **Location**: Create a new file in the `src/pages/` directory. The filename will become the page's URL. For example, `src/pages/about.mdx` will be available at `/about`.
-   **Format**: You can use `.astro`, `.md`, or `.mdx` files.
-   **Example**: To create an "About" page, you can create a `src/pages/about.mdx` file with the following content:
    ```mdx
    ---
    layout: "@/layouts/pages.astro" # Use a pre-defined layout
    title: "About Me"
    ---

    This is my about page. Here I can write about myself.
    ```

## ⚙️ Configuration

All global site configurations are centralized in a single file for easy management.

-   **Location**: `src/siteConfig.ts`
-   **What to change**: You can modify the site's name, banner text, and other site-wide settings in this file. The configuration is type-safe to prevent errors.

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**.

1.  **Push to GitHub**: Make sure your project is on a GitHub repository.
2.  **Import Project on Vercel**: Log in to your Vercel account and import the GitHub repository.
3.  **Deploy**: Vercel will automatically detect that this is an Astro project and configure the build settings. No extra configuration is needed. Your site will be deployed.

## 🤖 About RuleSync

This project uses [RuleSync](https://github.com/dyoshikawa/rulesync) to keep development conventions and guidelines synchronized for both human developers and AI coding assistants. This ensures consistency and adherence to best practices throughout the project's lifecycle.

The rules are defined in the `.rulesync/` directory and can be customized to fit the project's needs.

---

本项目前身为一个 Gatsby 博客，现已迁移至 Astro。你可以在 [这里](https://github.com/jctaoo-archive/stella) 查看原始项目。
