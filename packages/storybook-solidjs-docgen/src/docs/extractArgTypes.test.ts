import 'jest-specific-snapshot';
import path from 'path';
import fs from 'fs';
// @ts-expect-error (seems broken/missing)
import requireFromString from 'require-from-string';
import { transformFileSync, transformSync } from '@babel/core';

import { inferControls } from '@storybook/preview-api';
import type { Renderer } from '@storybook/types';
import { normalizeNewlines } from '@storybook/docs-tools';

import type { StoryContext } from '../types';
import { extractProps } from './extractProps';
import { extractArgTypes } from './extractArgTypes';

// File hierarchy:
// __testfixtures__ / some-test-case / input.*
const inputRegExp = /^input\..*$/;

const transformToModule = (inputCode: string) => {
  const options = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
  };
  const { code } = transformSync(inputCode, options) || {};
  return normalizeNewlines(code || '');
};

const annotateWithDocgen = (inputPath: string) => {
  const options = {
    presets: ['@babel/typescript', '@babel/react'],
    plugins: ['babel-plugin-react-docgen', '@babel/plugin-transform-class-properties'],
    babelrc: false,
  };
  const { code } = transformFileSync(inputPath, options) || {};
  return normalizeNewlines(code || '');
};

// We need to skip a set of test cases that use ESM code, as the `requireFromString`
// code below does not support it. These stories will be tested via Chromatic in the
// sandboxes. Hopefully we can figure out a better testing strategy in the future.
const skippedTests = [
  'js-class-component',
  'js-function-component',
  'js-function-component-inline-defaults',
  'js-function-component-inline-defaults-no-propTypes',
  'ts-function-component',
  'ts-function-component-inline-defaults',
  'js-proptypes',
];

describe('react component properties', () => {
  // Fixture files are in template/stories
  const fixturesDir = path.resolve(__dirname, '../../template/stories/docgen-components');
  fs.readdirSync(fixturesDir, { withFileTypes: true }).forEach((testEntry) => {
    if (testEntry.isDirectory()) {
      const testDir = path.join(fixturesDir, testEntry.name);
      const testFile = fs.readdirSync(testDir).find((fileName) => inputRegExp.test(fileName));
      if (testFile) {
        if (skippedTests.includes(testEntry.name)) {
          it.skip(`${testEntry.name}`, () => {});
        } else {
          it(`${testEntry.name}`, () => {
            const inputPath = path.join(testDir, testFile);

            // snapshot the output of babel-plugin-react-docgen
            const docgenPretty = annotateWithDocgen(inputPath);
            expect(docgenPretty).toMatchSpecificSnapshot(path.join(testDir, 'docgen.snapshot'));

            // transform into an uglier format that's works with require-from-string
            const docgenModule = transformToModule(docgenPretty);

            // snapshot the output of component-properties/react
            const { component } = requireFromString(docgenModule, inputPath);
            const properties = extractProps(component);
            expect(properties).toMatchSpecificSnapshot(path.join(testDir, 'properties.snapshot'));

            // snapshot the output of `extractArgTypes`
            const argTypes = extractArgTypes(component);
            const parameters = { __isArgsStory: true };
            const rows = inferControls({
              argTypes,
              parameters,
            } as unknown as StoryContext<Renderer>);
            expect(rows).toMatchSpecificSnapshot(path.join(testDir, 'argTypes.snapshot'));
          });
        }
      }
    }
  });
});
