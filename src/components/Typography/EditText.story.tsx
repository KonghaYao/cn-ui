import { CopyText, EllipsisText } from './EditText';
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
        </>
    );
};
