import fs from 'fs';
import path from 'path';

const componentsDir = path.resolve('./src/uikit');
const storiesDir = path.resolve('./src/stories');

// Ensure stories directory exists
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// Get all component names
const components = fs.readdirSync(componentsDir).filter((name) => {
  const componentPath = path.join(componentsDir, name);
  return fs.statSync(componentPath).isDirectory(); // Only include directories
});

components.forEach((component) => {
  const storyPath = path.join(storiesDir, `${component}.stories.tsx`);
  const componentFilePath = path.join(
    componentsDir,
    component,
    `${component}.tsx`,
  );

  if (!fs.existsSync(componentFilePath)) {
    console.warn(`⚠️ Skipped ${component} (no .tsx file found)`);
    return;
  }

  const defaultProps = extractDefaultProps(componentFilePath);

  if (!fs.existsSync(storyPath)) {
    fs.writeFileSync(storyPath, storyTemplate(component, defaultProps));
    console.log(`✅ Created: ${storyPath}`);
  } else {
    console.log(`⚠️ Skipped (already exists): ${storyPath}`);
  }
});

function storyTemplate(componentName, defaultProps) {
  const formattedArgs = formatProps(defaultProps);

  return `import type { Meta, StoryObj } from '@storybook/react';
import { lightTheme } from '../theme/useGiaThemes';
import { ${componentName} } from "../uikit/${componentName}/${componentName}";

const theme = light
const meta: Meta<typeof ${componentName}> = {
  title: "UI Kit/${componentName}",  
  component: ${componentName},
  args: {
    ${formattedArgs}
  },
};

export default meta;

export const Default: StoryObj<typeof ${componentName}> = {};
`;
}

// convert props to make eg. undefined instead of "undefined"
function formatProps(args) {
  const formatted = Object.entries(args)
    .map(([key, value], index) => {
      const tabs = index === 0 ? '' : '    ';
      switch (typeof value) {
        case 'undefined':
          return `${tabs}${key}: undefined`.replace(/"/g, '');
        case 'boolean':
        case 'number':
          return `${tabs}${key}: ${value}`;
        case 'string': {
          let text = JSON.stringify(value).replace(/"/g, '');
          if (text.includes('()')) text = text + '=> null';
          return `${tabs}${key}: ${text}`;
        }
        default:
          return `${tabs}${key}: ${JSON.stringify(value)}`.replace(/"/g, '');
      }
    })
    .join(',\n');
  console.log(formatted);
  return formatted;
}

function extractDefaultProps(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf-8');

  // Regex to match `const { prop1 = value, prop2 = value } = props;`
  const propsRegex = /const\s+\{([^}]+)\}\s*=\s*props;/s;
  const match = propsRegex.exec(content);

  if (!match) return {}; // No default props found

  const propsString = match[1]; // Extracted "prop1 = value, prop2 = value"
  const props = {};

  // Parse prop assignments
  propsString.split(',').forEach((prop) => {
    let [key, value] = prop.split('=').map((s) => s.trim());

    if (key) {
      if (value === undefined) {
        props[key] = undefined; // Set undefined as a keyword
      } else {
        try {
          props[key] = JSON.parse(value); // Parse JSON values (numbers, booleans, null)
        } catch {
          props[key] = value; // Keep as a string if not parseable
        }
      }
    }
  });

  return props;
}

console.log('📖 Storybook stories generation complete!');
