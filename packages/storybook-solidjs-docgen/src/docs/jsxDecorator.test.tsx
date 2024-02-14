/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import type { FC, PropsWithChildren } from 'react';
import React, { createElement, Profiler } from 'react';
import PropTypes from 'prop-types';
import { addons, useEffect } from '@storybook/preview-api';
import { SNIPPET_RENDERED } from '@storybook/docs-tools';
import { renderJsx, jsxDecorator } from './jsxDecorator';

jest.mock('@storybook/preview-api');
const mockedAddons = addons as jest.Mocked<typeof addons>;
const mockedUseEffect = useEffect as jest.Mocked<typeof useEffect>;

expect.addSnapshotSerializer({
  print: (val: any) => val,
  test: (val) => typeof val === 'string',
});

describe('renderJsx', () => {
  it('basic', () => {
    expect(renderJsx(<div>hello</div>, {})).toMatchInlineSnapshot(`
      <div>
        hello
      </div>
    `);
  });
  it('functions', () => {
    // eslint-disable-next-line no-console
    const onClick = () => console.log('onClick');
    expect(renderJsx(<div onClick={onClick}>hello</div>, {})).toMatchInlineSnapshot(`
      <div onClick={() => {}}>
        hello
      </div>
    `);
  });
  it('undefined values', () => {
    expect(renderJsx(<div className={undefined}>hello</div>, {})).toMatchInlineSnapshot(`
      <div>
        hello
      </div>
    `);
  });
  it('null values', () => {
    expect(renderJsx(<div>hello</div>, {})).toMatchInlineSnapshot(`
      <div>
        hello
      </div>
    `);
  });
  it('large objects', () => {
    const obj = Array.from({ length: 20 }).reduce((acc, _, i) => {
      // @ts-expect-error (Converted from ts-ignore)
      acc[`key_${i}`] = `val_${i}`;
      return acc;
    }, {});
    expect(renderJsx(<div data-val={obj} />, {})).toMatchInlineSnapshot(`
      <div
        data-val={{
          key_0: 'val_0',
          key_1: 'val_1',
          key_10: 'val_10',
          key_11: 'val_11',
          key_12: 'val_12',
          key_13: 'val_13',
          key_14: 'val_14',
          key_15: 'val_15',
          key_16: 'val_16',
          key_17: 'val_17',
          key_18: 'val_18',
          key_19: 'val_19',
          key_2: 'val_2',
          key_3: 'val_3',
          key_4: 'val_4',
          key_5: 'val_5',
          key_6: 'val_6',
          key_7: 'val_7',
          key_8: 'val_8',
          key_9: 'val_9'
        }}
       />
    `);
  });

  it('long arrays', () => {
    const arr = Array.from({ length: 20 }, (_, i) => `item ${i}`);
    expect(renderJsx(<div data-val={arr} />, {})).toMatchInlineSnapshot(`
      <div
        data-val={[
          'item 0',
          'item 1',
          'item 2',
          'item 3',
          'item 4',
          'item 5',
          'item 6',
          'item 7',
          'item 8',
          'item 9',
          'item 10',
          'item 11',
          'item 12',
          'item 13',
          'item 14',
          'item 15',
          'item 16',
          'item 17',
          'item 18',
          'item 19'
        ]}
       />
    `);
  });

  it('forwardRef component', () => {
    const MyExoticComponent = React.forwardRef<PropsWithChildren<{}>>(function MyExoticComponent(
      props,
      _ref
    ) {
      return <div>{props.children}</div>;
    });

    expect(renderJsx(createElement(MyExoticComponent, {}, 'I am forwardRef!'), {}))
      .toMatchInlineSnapshot(`
      <MyExoticComponent>
        I am forwardRef!
      </MyExoticComponent>
    `);
  });

  it('memo component', () => {
    const MyMemoComponent: FC = React.memo(function MyMemoComponent(props) {
      return <div>{props.children}</div>;
    });

    expect(renderJsx(createElement(MyMemoComponent, {}, 'I am memo!'), {})).toMatchInlineSnapshot(`
      <MyMemoComponent>
        I am memo!
      </MyMemoComponent>
    `);
  });

  it('Profiler', () => {
    function ProfilerComponent(props: any) {
      return (
        <Profiler id="profiler-test" onRender={() => {}}>
          <div>{props.children}</div>
        </Profiler>
      );
    }

    expect(renderJsx(createElement(ProfilerComponent, {}, 'I am Profiler'), {}))
      .toMatchInlineSnapshot(`
        <ProfilerComponent>
          I am Profiler
        </ProfilerComponent>
    `);
  });

  it('should not add default props to string if the prop value has not changed', () => {
    const Container = ({ className, children }: { className: string; children: string }) => {
      return <div className={className}>{children}</div>;
    };

    Container.propTypes = {
      children: PropTypes.string.isRequired,
      className: PropTypes.string,
    };

    Container.defaultProps = {
      className: 'super-container',
    };

    expect(renderJsx(<Container>yo dude</Container>, {})).toMatchInlineSnapshot(`
      <Container className="super-container">
        yo dude
      </Container>
    `);
  });
});

// @ts-expect-error (Converted from ts-ignore)
const makeContext = (name: string, parameters: any, args: any, extra?: object): StoryContext => ({
  id: `jsx-test--${name}`,
  kind: 'js-text',
  name,
  parameters,
  unmappedArgs: args,
  args,
  ...extra,
});

describe('jsxDecorator', () => {
  let mockChannel: { on: jest.Mock; emit?: jest.Mock };
  beforeEach(() => {
    mockedAddons.getChannel.mockReset();
    // @ts-expect-error (Converted from ts-ignore)
    mockedUseEffect.mockImplementation((cb) => setTimeout(() => cb(), 0));

    mockChannel = { on: jest.fn(), emit: jest.fn() };
    mockedAddons.getChannel.mockReturnValue(mockChannel as any);
  });

  it('should render dynamically for args stories', async () => {
    const storyFn = (args: any) => <div>args story</div>;
    const context = makeContext('args', { __isArgsStory: true }, {});
    jsxDecorator(storyFn, context);
    await new Promise((r) => setTimeout(r, 0));
    expect(mockChannel.emit).toHaveBeenCalledWith(SNIPPET_RENDERED, {
      id: 'jsx-test--args',
      args: {},
      source: '<div>\n  args story\n</div>',
    });
  });

  it('should not render decorators when provided excludeDecorators parameter', async () => {
    const storyFn = (args: any) => <div>args story</div>;
    const decoratedStoryFn = (args: any) => (
      <div style={{ padding: 25, border: '3px solid red' }}>{storyFn(args)}</div>
    );
    const context = makeContext(
      'args',
      {
        __isArgsStory: true,
        docs: {
          source: {
            excludeDecorators: true,
          },
        },
      },
      {},
      { originalStoryFn: storyFn }
    );
    jsxDecorator(decoratedStoryFn, context);
    await new Promise((r) => setTimeout(r, 0));

    expect(mockChannel.emit).toHaveBeenCalledWith(SNIPPET_RENDERED, {
      id: 'jsx-test--args',
      args: {},
      source: '<div>\n  args story\n</div>',
    });
  });

  it('should skip dynamic rendering for no-args stories', async () => {
    const storyFn = () => <div>classic story</div>;
    const context = makeContext('classic', {}, {});
    jsxDecorator(storyFn, context);
    await new Promise((r) => setTimeout(r, 0));

    expect(mockChannel.emit).not.toHaveBeenCalled();
  });

  it('renders MDX properly', async () => {
    // FIXME: generate this from actual MDX
    const mdxElement: ReturnType<typeof createElement> = {
      // @ts-expect-error (Converted from ts-ignore)
      type: { displayName: 'MDXCreateElement' },
      props: {
        mdxType: 'div',
        originalType: 'div',
        className: 'foo',
      },
    };

    jsxDecorator(() => mdxElement, makeContext('mdx-args', { __isArgsStory: true }, {}));
    await new Promise((r) => setTimeout(r, 0));

    expect(mockChannel.emit).toHaveBeenCalledWith(SNIPPET_RENDERED, {
      id: 'jsx-test--mdx-args',
      args: {},
      source: '<div className="foo" />',
    });
  });

  it('handles stories that trigger Suspense', async () => {
    // if a story function uses a hook or other library that triggers suspense, it will throw a Promise until it is resolved
    // and then it will return the story content after the promise is resolved
    const storyFn = jest.fn();
    storyFn
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw Promise.resolve();
      })
      .mockImplementation(() => {
        return <div>resolved args story</div>;
      });
    const jsx = '';
    const context = makeContext('args', { __isArgsStory: true, jsx }, {});
    expect(() => {
      jsxDecorator(storyFn, context);
    }).toThrow(Promise);
    jsxDecorator(storyFn, context);
    await new Promise((r) => setTimeout(r, 0));

    expect(mockChannel.emit).toHaveBeenCalledTimes(2);
    expect(mockChannel.emit).nthCalledWith(1, SNIPPET_RENDERED, {
      id: 'jsx-test--args',
      args: {},
      source: '',
    });
    expect(mockChannel.emit).nthCalledWith(2, SNIPPET_RENDERED, {
      id: 'jsx-test--args',
      args: {},
      source: '<div>\n  resolved args story\n</div>',
    });
  });
});
