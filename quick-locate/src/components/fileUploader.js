import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, Button} from 'react-native';

    export default function PickUpFile() {
        async function getAndSendFile() {
        try {
            const file = await DocumentPicker.getDocumentAsync({}); // Allow any file type
            console.log(file);
            
            if (file.canceled) return;
    
            const formData = new FormData();
            formData.append('file', {
                uri: file.assets[0].uri, // File URI
                name: file.assets[0].name, // File name
                type: file.assets[0].mimeType || 'application/octet-stream' // MIME type
            });
            
            console.log(formData);
            
            const response = await fetch('https://quick-locate.onrender.com/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response);
            const result = await response.json();
            console.log('Upload success:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
    return (
        <View>
            <Button title='Upload File' onPress={() => getAndSendFile()}/>
        </View>
    )
}