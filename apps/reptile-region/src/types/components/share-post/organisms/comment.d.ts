declare module '<context/share-post/comment>' {
    type SubmitType = 'UPDATE' | 'CREATE';

    type CommentState = {
        id: string;
        submitType: SubmitType;
    };

    interface ChangeSubmitType {
        type: 'CHANGE_SUBMIT_TYPE';
        id: string;
        submitType: SubmitType;
    }

    interface SetCreateSubmitType {
        type: 'SET_CREATE_SUBMIT_TYPE';
        id: string;
    }

    type CommentActions = ChangeSubmitType | SetCreateSubmitType;
}
