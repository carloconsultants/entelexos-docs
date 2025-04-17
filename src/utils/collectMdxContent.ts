import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Page {
  title: string;
  url: string;
  content: string;
}

function cleanMarkdown(content: string): string {
  // Remove frontmatter
  content = content.replace(/^---[\s\S]*?---/, '');
  
  // Remove markdown headers
  content = content.replace(/^#+\s.*$/gm, '');
  
  // Remove markdown links [text](url)
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove markdown images ![alt](url)
  content = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
  
  // Remove markdown code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]+`/g, '');
  
  // Remove markdown bold/italic
  content = content.replace(/(\*\*|__)(.*?)\1/g, '$2');
  content = content.replace(/(\*|_)(.*?)\1/g, '$2');
  
  // Remove markdown blockquotes
  content = content.replace(/^>\s.*$/gm, '');
  
  // Remove markdown lists
  content = content.replace(/^[\s-*]*\s/gm, '');
  
  // Remove extra whitespace
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
}

export async function collectMdxContent(): Promise<Page[]> {
  const pages: Page[] = [];
  const mdxFiles = await glob('src/pages/**/*.mdx');

  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: mdxContent } = matter(content);
    
    // Convert file path to URL
    const relativePath = path.relative('src/pages', file);
    const url = '/' + relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
    
    pages.push({
      title: data.title || path.basename(file, '.mdx'),
      url,
      content: cleanMarkdown(mdxContent)
    });
  }

  return pages;
} 