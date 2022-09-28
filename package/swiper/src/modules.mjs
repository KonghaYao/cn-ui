import fs from 'fs';
fs.unlinkSync('./src/module.ts');
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
    'FreeMode',
    'Grid',
    'Manipulation',
].map((i) => {
    let [name, smallName] = i instanceof Array ? i : [i, i.toLowerCase()];
    fs.writeFileSync(
        `./src/modules/${smallName}.ts`,
        `
import 'swiper/css/${smallName}.css'
export { ${name} } from 'swiper';`
    );
    fs.writeFileSync('./src/module.ts', `export { ${name} } from './modules/${smallName}';\n`, {
        flag: 'a',
    });
});
