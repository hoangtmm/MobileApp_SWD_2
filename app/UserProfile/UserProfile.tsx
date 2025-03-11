import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen({ navigation }) {
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
        <View style={styles.container}>
            <ScrollView>
                {/* Header Navigation */}
                <TouchableOpacity style={styles.backButton} >
                    <Text style={styles.backButtonText}>{'< Trở về danh mục'}</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />

                {/* Ảnh đại diện */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/469444934_1769979723793798_1425409264350456114_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFSVu-fH9iMIVuqJ0NIJFOharyF1_4Ff5dqvIXX_gV_l42JY_cln5LOr6ELQJ2FE4k1FwCsBiSk2WtYkyVN9Cgo&_nc_ohc=71moZUWhV0QQ7kNvgGCxvvl&_nc_oc=AdgIK1Qd0vLecxqvR3KebETY-JOHpllGr5XXFEfWBIn6ZiKZNIXDZRi-LNRqdCa4S04l7Cd5oGGqGKEA8Ro8lnWu&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=ASzj7ByTfZwsZD_q9HSKhbY&oh=00_AYFkzzvrl1WYng4crKfPC5-MsjLQPxY6OsKCHqJfde_nnw&oe=67D38432' }}
                        style={styles.avatar}
                    />
                </View>

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

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home" size={24} color="white" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="search" size={24} color="white" />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="swap-horizontal" size={24} color="white" />
                    <Text style={styles.navText}>Exchange</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
                    <Ionicons name="person" size={24} color="white" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
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
    backButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#007BFF',
        padding: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
    },
});
