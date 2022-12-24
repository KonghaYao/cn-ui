export const getURL: any = () => {
    const path = new URLSearchParams(location.hash.replace('#/?', '')).get('path');
    // console.log(path);
    return {
        viewing: () => ({ path }),
    };
};
