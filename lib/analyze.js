import { cwd } from 'node:process';
import { writeFileSync } from 'node:fs';
import { createPackageAnalyzer } from '@lit-labs/analyzer/package-analyzer.js';
import { generateManifest } from '@lit-labs/gen-manifest';
import { customElementsManifestToMarkdown } from '@blockquote/to-markdown';

export const analyzePackage = async () => {
  const currentDirectory = cwd();
  const readmeFile = './README.md';
  const analyzer = createPackageAnalyzer(currentDirectory, {
    exclude: ['*-*.*', '*.config.*', 'test/**/*.*'],
  });
  const pkg = analyzer.getPackage();

  const filetree = await generateManifest(pkg);
  const [[filename, fileTreeOrString]] = Object.entries(filetree);

  const manifest = JSON.parse(fileTreeOrString);
  const content = customElementsManifestToMarkdown(manifest, {});

  writeFileSync(readmeFile, content);
  writeFileSync(`new-${filename}`, fileTreeOrString);
};
