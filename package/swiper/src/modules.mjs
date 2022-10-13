import fs from 'fs';
try {
    fs.unlinkSync('./src/module.ts');
} catch (e) {}
[
    'A11y',
    'Autoplay',
    'Controller',
    ['EffectCoverflow', 'effect-coverflow'],
    ['EffectCube', 'effect-cube'],
    ['EffectFade', 'effect-fade'],
    ['EffectFlip', 'effect-flip'],
    ['EffectCreative', 'effect-creative'],
    ['EffectCards', 'effect-cards'],
    ['HashNavigation', 'hash-navigation'],
    'History',
    'Keyboard',
    'Lazy',
    'Mousewheel',
    'Navigation',
    'Pagination',
    'Parallax',
    'Scrollbar',
    'Thumbs',
    'Virtual',
    'Zoom',
    ['FreeMode', 'free-mode'],
    'Grid',
    'Manipulation',
].map((i) => {
    let [name, smallName] = i instanceof Array ? i : [i, i.toLowerCase()];
    fs.writeFileSync(
        `./src/modules/${smallName}.ts`,
        `
import 'swiper/css/${smallName}'
export { ${name} } from 'swiper';`
    );
    fs.writeFileSync('./src/module.ts', `export { ${name} } from './modules/${smallName}.js';\n`, {
        flag: 'a',
    });
});
