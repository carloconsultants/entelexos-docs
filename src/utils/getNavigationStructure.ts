import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

interface NavItem {
  text: string;
  href: string;
  sortOrder: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export async function getNavigationStructure(): Promise<NavSection[]> {
  const pagesDir = join(process.cwd(), 'src', 'pages');
  const sections: NavSection[] = [];

  // Read all directories in the pages folder
  const dirs = await readdir(pagesDir, { withFileTypes: true });
  
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const section: NavSection = {
        title: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
        items: []
      };

      // Read all files in the directory
      const files = await readdir(join(pagesDir, dir.name));
      
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          // Read the file content
          const filePath = join(pagesDir, dir.name, file);
          const fileContent = await readFile(filePath, 'utf-8');
          
          // Parse the frontmatter
          const { data } = matter(fileContent);
          
          // Get the title from frontmatter or fallback to filename
          const fileName = file.replace('.mdx', '');
          const text = data.title || fileName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          // Get sort order from frontmatter or use a large number as default
          const sortOrder = data.sortOrder ?? 999;

          section.items.push({
            text,
            href: `/${dir.name}/${fileName}`,
            sortOrder
          });
        }
      }

      // Sort items by sortOrder
      section.items.sort((a, b) => a.sortOrder - b.sortOrder);

      // Only add section if it has items
      if (section.items.length > 0) {
        sections.push(section);
      }
    }
  }

  return sections;
} 