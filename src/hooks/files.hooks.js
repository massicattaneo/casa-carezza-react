import { useMemo, useCallback } from 'react';
import {
    ChonkyActions,
    FileHelper
} from 'chonky';

export const useFiles = (fileMap, currentFolderId) => useMemo(() => {
    const currentFolder = fileMap[currentFolderId];
    const files = currentFolder.childrenIds
        ? currentFolder.childrenIds.map(fileId => fileMap[fileId] || null)
        : [];
    return files;
}, [currentFolderId, fileMap]);

export const useFolderChain = (fileMap, currentFolderId) => useMemo(() => {
    const currentFolder = fileMap[currentFolderId];

    const folderChain = [currentFolder];

    let { parentId } = currentFolder;
    while (parentId) {
        const parentFile = fileMap[parentId];
        if (parentFile) {
            folderChain.unshift(parentFile);
            parentId = parentFile.parentId;
        } else {
            parentId = null;
        }
    }

    return folderChain;
}, [currentFolderId, fileMap]);

export const useFileActionHandler = setCurrentFolderId => useCallback(
    data => {
        if (data.id === ChonkyActions.OpenFiles.id) {
            const { targetFile, files } = data.payload;
            const fileToOpen = targetFile || files[0];
            if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                setCurrentFolderId(fileToOpen.id);
            } else {
                window.open(fileToOpen.downloadUrl);
            }
        }
    },
    [setCurrentFolderId]
);
