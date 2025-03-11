import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '@/context/UserContext';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({ navigation }) {
    // Lấy user và loading từ UserContext, logout từ AuthContext
    const userContext = useContext(UserContext);
    const auth = useContext(AuthContext);
    const router = useRouter();

    if (!userContext || !auth) {
        return <Text>Chưa có UserContext hoặc AuthContext</Text>;
    }

    const { user, loading } = userContext;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const mapGender = (value) => {
        if (value === 1) return "Male";
        if (value === 0) return "Female";
        return "Khác";
    };
    useEffect(() => {
        if (user && user.response) {
            const firstName = user.response.firstName ?? '';
            const lastName = user.response.lastName ?? '';
            const fullName = `${firstName} ${lastName}`.trim();

            setName(fullName);
            setPhone(user.response.phoneNumber ?? '');
            setEmail(user.response.email ?? '');
            setBirthDate(user.response.birthDate ?? '');
            setGender(mapGender(user.response.gender));
            setAvatarUrl(user.response.imageUrl ?? '');
        }
    }, [user]);

    const handleUpdate = () => {
        Alert.alert('Cập nhật', 'Thông tin đã được cập nhật (demo).');
    };

    const handleLogout = async () => {
        try {
            await auth.logout();
            const storedToken = await AsyncStorage.getItem('token');
            console.log("Token sau khi logout:", storedToken);
            Alert.alert("Thông báo", "Logout Successfully!!!");
            router.replace('/auth/signIn');
        } catch (error) {
            Alert.alert("Lỗi", "Không thể đăng xuất.");
        }
    };
    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Đang tải thông tin người dùng...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar style="auto" />

                {/* Ảnh đại diện */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatar}
                    />
                </View>

                {/* Tiêu đề */}
                <Text style={styles.title}>User Information</Text>

                {/* Input Tên */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Input Số điện thoại */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        keyboardType="phone-pad"
                        onChangeText={setPhone}
                    />
                </View>

                {/* Input Email */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                </View>

                {/* Input Ngày sinh */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date of birth:</Text>
                    <TextInput
                        style={styles.input}
                        value={birthDate}
                        onChangeText={setBirthDate}
                    />
                </View>

                {/* Hiển thị Giới tính */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={[styles.input, { paddingVertical: 10 }]}>{gender}</Text>
                </View>

                {/* Nút cập nhật */}
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update Information</Text>
                </TouchableOpacity>

                {/* Nút Logout */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
