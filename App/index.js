// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Create a fairy tale with a hero named ${hero}, a villain named ${villain}, and the following plot: ${plot}` }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error(error);
            setStory('Error generating story. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Plot"
                    value={plot}
                    onChangeText={setPlot}
                    multiline
                />
                <Button title="Generate Story" onPress={generateStory} />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.box}>
                        <Text>{story}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
        width: '100%',
    },
    box: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginTop: 20,
    },
});