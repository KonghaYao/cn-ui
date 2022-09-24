import { Button } from '../Button';
import { CopyText, EllipsisText } from './EditText';
import { useFont } from './useFont';
export const Controller = [];
export default (props) => {
    return (
        <>
            <CopyText>这里面是可以复制的东西</CopyText>
            <EllipsisText line={2}>
                可展开文本。A design is a plan or specification for the construction of an object or
                system or for the implementation of an activity or process, or the result of that
                plan or specification in the form of a prototype, product or process. The verb to
                design expresses the process of developing a design. The verb to design expresses
                the process of developing a design. A design is a plan or specification for the
                construction of an object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form of a prototype,
                product or process. The verb to design expresses the process of developing a design.
                The verb to design expresses the process of developing a design.
            </EllipsisText>
            <Button
                onClick={() => {
                    const { register, loadFont } = useFont();
                    loadFont(
                        'https://cdn.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/build/江西拙楷2.0/result.css'
                    ).then((res) => {
                        register('jiangxizhuokai');
                    });
                }}
            >
                {' '}
                改变字体为江西拙楷
            </Button>
        </>
    );
};
