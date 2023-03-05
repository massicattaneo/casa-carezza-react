/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { FullFileBrowser } from 'chonky';
import { useFiles, useFolderChain, useFileActionHandler } from '../../hooks/files.hooks';

const createFileList = async (storageRef, flatMap, folderId) => {
    const res = await storageRef.listAll();
    await Promise.all(res.items.map(async itemRef => {
        const downloadUrl = await itemRef.getDownloadURL();
        const child = {
            id: itemRef.fullPath,
            name: itemRef.name,
            childrenIds: [],
            downloadUrl,
            parentId: folderId
        };
        flatMap[child.id] = child;
        flatMap[folderId].childrenIds.push(child.id);
    }));
    await Promise.all(res.prefixes.map(async itemRef => {
        const folder = {
            childrenIds: [],
            id: itemRef.fullPath,
            name: itemRef.name,
            isDir: true,
            parentId: folderId
        };
        flatMap[folder.id] = folder;
        flatMap[folderId].childrenIds.push(folder.id);
        await createFileList(itemRef, flatMap, folder.id);
    }));

    return JSON.parse(JSON.stringify(flatMap));
};

const flat = {
    root: {
        id: 'root',
        name: 'Casa Carezza',
        isDir: true,
        childrenIds: []
    }
};

const AdminFiles = () => {
    const [currentFolderId, setCurrentFolderId] = useState('root');
    const [fileMap, setFileMap] = useState(flat);
    const files = useFiles(fileMap, currentFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);
    const storage = firebase.storage();
    const storageRef = storage.ref();

    useEffect(async () => {
        const mod = await createFileList(storageRef, flat, 'root');
        setFileMap(mod);
    }, []);

    if (files.length === 0) {
        return <form style={{ padding: '0 10px' }}>
            <label>NESSUN COMUNICATO</label>
        </form>;
    }

    return <form style={{ padding: '0 10px' }}>
        <label>COMUNICATI:</label>
        <FullFileBrowser
            files={files}
            folderChain={folderChain}
            onFileAction={handleFileAction} />
    </form>;
};

export { AdminFiles };
