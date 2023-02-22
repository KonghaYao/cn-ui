/** 渐变拟物化颜色表，需要添加 bg-gradient-to-b */
export const Gradient = {
    position: 'bg-gradient-to-b',
    white: 'from-white to-gray-100 text-slate-700',
    black: 'from-neutral-900 to-neutral-700 text-slate-100', // 未测试
    slate: 'from-slate-600 to-slate-700 text-slate-50',
    gray: 'from-gray-600 to-gray-700 text-slate-50',
    zinc: 'from-zinc-600 to-zinc-700 text-slate-50',
    neutral: 'from-neutral-600 to-neutral-700 text-slate-50',
    stone: 'from-stone-600 to-stone-700 text-slate-50',
    red: 'from-red-600 to-red-700 text-slate-50',
    orange: 'from-orange-600 to-orange-700 text-slate-50',
    amber: 'from-amber-600 to-amber-700 text-slate-50',
    yellow: 'from-yellow-600 to-yellow-700 text-slate-50',
    lime: 'from-lime-600 to-lime-700 text-slate-50',
    green: 'from-green-600 to-green-700 text-slate-50',
    emerald: 'from-emerald-600 to-emerald-700 text-slate-50',
    teal: 'from-teal-600 to-teal-700 text-slate-50',
    cyan: 'from-cyan-600 to-cyan-700 text-slate-50',
    sky: 'from-sky-600 to-sky-700 text-slate-50',
    blue: 'from-blue-600 to-blue-700 text-slate-50',
    indigo: 'from-indigo-600 to-indigo-700 text-slate-50',
    violet: 'from-violet-600 to-violet-700 text-slate-50',
    purple: 'from-purple-600 to-purple-700 text-slate-50',
    fuchsia: 'from-fuchsia-600 to-fuchsia-700 text-slate-50',
    pink: 'from-pink-600 to-pink-700 text-slate-50',
    rose: 'from-rose-600 to-rose-700 text-slate-50',
};
/** 专属于 Button 的颜色表 */
export const TextColor = {
    white: 'bg-white text-black',
    slate: 'text-slate-600',
    gray: 'text-gray-600',
    zinc: 'text-zinc-600',
    neutral: 'text-neutral-600',
    stone: 'text-stone-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    amber: 'text-amber-600',
    yellow: 'text-yellow-600',
    lime: 'text-lime-600',
    green: 'text-green-600',
    emerald: 'text-emerald-600',
    teal: 'text-teal-600',
    cyan: 'text-cyan-600',
    sky: 'text-sky-600',
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    violet: 'text-violet-600',
    purple: 'text-purple-600',
    fuchsia: 'text-fuchsia-600',
    pink: 'text-pink-600',
    rose: 'text-rose-600',
};
/** */
export const Colors = {
    white: 'bg-white text-black',
    slate: 'bg-slate-500',
    gray: 'bg-gray-500',
    zinc: 'bg-zinc-500',
    neutral: 'bg-neutral-500',
    stone: 'bg-stone-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-500',
    lime: 'bg-lime-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    sky: 'bg-sky-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    purple: 'bg-purple-500',
    fuchsia: 'bg-fuchsia-500',
    pink: 'bg-pink-500',
    rose: 'bg-rose-500',
};
/** @deprecated */
export const SizeTrans = {
    mini: 'h-6 px-2 text-xs',
    small: 'h-8 px-3 text-sm',
    normal: 'h-10 px-4',
    large: 'h-12 px-4 text-lg',
};

export type GlobalSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export const hSizeStairs = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
};
export const wSizeStairs = {
    sm: 'w-2',
    md: 'w-4',
    lg: 'w-6',
    xl: 'w-8',
};
export const ensureGet = <Result, O extends Object = Object, T extends string = string>(
    obj: O,
    prop: T,
    voidVal?: Result
) => {
    console.log(prop);
    if (prop in obj) {
        return (obj as any)[prop] as Result;
    }
    return voidVal;
};
