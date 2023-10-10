import { TouchableTypo } from 'design-system';
import React, { useEffect } from 'react';
import { useTag } from 'tag-text-input';

interface ChangeHeaderSubmitButtonActions {
    onSubmit(props: { contents: string }): void;
    onChangeHeaderRight(headerRight: () => React.JSX.Element): void;
}

type ChangeHeaderSubmitButtonProps = ChangeHeaderSubmitButtonActions;

const useEffectChangeHeaderRight = ({ onSubmit, onChangeHeaderRight }: ChangeHeaderSubmitButtonProps) => {
    const { contents } = useTag();

    useEffect(() => {
        const headerRight = () => {
            const handleSubmitUpdatePost = () => {
                onSubmit({ contents });
            };

            return (
                <TouchableTypo variant="body2" onPress={handleSubmitUpdatePost}>
                    완료
                </TouchableTypo>
            );
        };

        onChangeHeaderRight(headerRight);
    }, [contents, onChangeHeaderRight, onSubmit]);
};

export default useEffectChangeHeaderRight;
