import { CameraAlbum } from '@crawl/camera-album';
import React, { useReducer, type PropsWithChildren } from 'react';

import { CreatePostActionsContext, CreatePostStateContext } from './context';
import createPostReducer from './reducer';
import type { CreatePostState } from './type';

import { TagProvider } from '@/components/@common/organisms/TagTextInput';

const initialState: CreatePostState = {
    croppedImage: [],
    cropInfoMap: {},
};

export default function CreatePostProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(createPostReducer, initialState);

    return (
        <CameraAlbum>
            <TagProvider>
                <CreatePostActionsContext.Provider value={dispatch}>
                    <CreatePostStateContext.Provider value={state}>{children}</CreatePostStateContext.Provider>
                </CreatePostActionsContext.Provider>
            </TagProvider>
        </CameraAlbum>
    );
}
