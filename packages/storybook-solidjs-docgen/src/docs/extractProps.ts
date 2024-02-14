import PropTypes from 'prop-types';
import { type PropDef, hasDocgen, extractComponentProps, TypeSystem } from '@storybook/docs-tools';
import { enhancePropTypesProps } from './propTypes/handleProp';
import { enhanceTypeScriptProps } from './typeScript/handleProp';
import { isMemo } from './lib';

// FIXME
type Component = any;

export interface PropDefMap {
  [p: string]: PropDef;
}

const propTypesMap = new Map();

Object.keys(PropTypes).forEach((typeName) => {
  // @ts-expect-error (Converted from ts-ignore)
  const type = PropTypes[typeName];

  propTypesMap.set(type, typeName);
  propTypesMap.set(type.isRequired, typeName);
});

function getPropDefs(component: Component, section: string): PropDef[] {
  let processedComponent = component;

  // eslint-disable-next-line react/forbid-foreign-prop-types
  if (!hasDocgen(component) && !component.propTypes && isMemo(component)) {
    processedComponent = component.type;
  }

  const extractedProps = extractComponentProps(processedComponent, section);
  if (extractedProps.length === 0) {
    return [];
  }

  switch (extractedProps[0].typeSystem) {
    case TypeSystem.JAVASCRIPT:
      return enhancePropTypesProps(extractedProps, component);
    case TypeSystem.TYPESCRIPT:
      return enhanceTypeScriptProps(extractedProps);
    default:
      return extractedProps.map((x) => x.propDef);
  }
}

export const extractProps = (component: Component) => ({
  rows: getPropDefs(component, 'props'),
});
