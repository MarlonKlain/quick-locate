import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, Button} from 'react-native';

export default async function PickUpFile() {
    try {
        const file = await DocumentPicker.getDocumentAsync({ type: '*/*' }); // Allow any file type
        if (file.canceled) return;

        const formData = new FormData();
        formData.append('file', {
            uri: file.assets[0].uri, // File URI
            name: file.assets[0].name, // File name
            type: file.assets[0].mimeType || 'application/octet-stream' // MIME type
        });

        const response = await fetch('https://quick-locate.onrender.com//upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        const result = await response.json();
        console.log('Upload success:', result);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}