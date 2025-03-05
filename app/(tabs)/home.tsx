import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function UserProfileScreen() {
    const [name, setName] = useState('Nguyễn Văn A');
    const [phone, setPhone] = useState('0123456789');

    const handleUpdate = () => {
        Alert.alert('Cập nhật', 'Thông tin đã được cập nhật.');
    };

    const handleDelete = () => {
        Alert.alert(
            'Xóa tài khoản',
            'Bạn có chắc muốn xóa tài khoản không?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => Alert.alert('Tài khoản đã bị xóa') }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.navItems}>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Home</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Product</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Exchange Service</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Request</Text></TouchableOpacity>
                </View>
                <View style={styles.authButtons}>
                    <TouchableOpacity style={styles.loginButton}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                </View>
            </View>

            <StatusBar style="auto" />

            {/* Thông tin người dùng */}
            <Text style={styles.title}>Thông Tin Người Dùng</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={setPhone}
                />
            </View>

            {/* Nút cập nhật & xóa tài khoản */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Xóa tài khoản</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF69B4',
        padding: 15,
    },
    navItems: {
        flexDirection: 'row',
    },
    navButton: {
        padding: 10,
    },
    authButtons: {
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    signupButton: {
        backgroundColor: '#C71585',
        padding: 10,
        borderRadius: 5,
    },
    navText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    updateButton: {
        backgroundColor: '#00CC66',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

