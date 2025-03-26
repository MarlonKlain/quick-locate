import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Button } from 'react-native';

export default function PickUpFile() {
    async function getAndSendFile() {
        try {
            const file = await DocumentPicker.getDocumentAsync({});
            if (file.canceled) return;
            
            const formData = new FormData();
            formData.append('file', {
                uri: file.assets[0].uri,
                name: file.assets[0].name,
                type: file.assets[0].mimeType || 'application/octet-stream'
            });

            const response = await fetch('https://quick-locate.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('Upload success:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }

    return (
        <View>
            <Button title='Upload File' onPress={() => getAndSendFile()} />
        </View>
    );
}
