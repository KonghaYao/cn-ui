/** 判断是否 accept file
 * @link https://github.com/arco-design/arco-design/blob/main/components/Upload/util.tsx#L3-L43
 */

export const isAcceptFile = (file: File, accept?: string): boolean => {
    if (accept && file) {
        const accepts = accept
            .split(',')
            .map((x) => x.trim())
            .filter((x) => x);
        const fileExtension = file.name.indexOf('.') > -1 ? `.${file.name.split('.').pop()}` : '';
        return accepts.some((type) => {
            const typeText = type && type.toLowerCase();
            const fileType = (file.type || '').toLowerCase();
            if (typeText === fileType) {
                // 类似excel文件这种
                // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
                // 所以优先对比input的accept类型和文件对象的type值
                return true;
            }
            // */*,*  之类的所有类型
            if (/^\*(\/\*)?$/.test(typeText)) {
                return true;
            }
            if (/\/\*/.test(typeText)) {
                // image/* 这种通配的形式处理
                return fileType.replace(/\/.*$/, '') === typeText.replace(/\/.*$/, '');
            }
            if (/\..*/.test(typeText)) {
                // .jpg 等后缀名
                let suffixList = [typeText];
                // accept=".jpg", jpeg后缀类型同样可以上传，反之亦然
                if (typeText === '.jpg' || typeText === '.jpeg') {
                    suffixList = ['.jpg', '.jpeg'];
                }
                return suffixList.indexOf(fileExtension) > -1;
            }
            return false;
        });
    }
    return !!file;
};
