import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// SHOW PRODUCT
const products = [
    { id: '1', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://th.bing.com/th/id/OIP.7YY6ZZhyGdm2fOl6ooeTGgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
    { id: '2', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://img.lazcdn.com/g/p/5ab0191783ebaa302ef6a5b605b09603.jpg_720x720q80.jpg' },
    { id: '3', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://prod-america-res.popmart.com/default/20231215_094938_254780__1200x1200.jpg?x-oss-process=image/resize,p_30,format,webp,format,webp' },
    { id: '4', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://otakustore.vn/image/cache/catalog/2024/01/the-monsters-labubu-time-to-chill-series-vinyl-doll-pop-mart-3-1500x1500.jpg' },
];

export default function HomeScreen() {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Discover, Trade, and Collect Your Unique Accessories</Text>
                <Text style={styles.subHeaderText}>Unlock a world of surprises with our exclusive blind boxes.</Text>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchBar} placeholder="search blindbox type e.g" />
                    <TouchableOpacity style={styles.searchButton}><Text style={styles.buttonText}>🔍</Text></TouchableOpacity>
                </View>
            </View>
            {/* Bộ lọc Filter */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(!showFilter)}>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>

                {/* Hiển thị filterBox ngay bên dưới nút Filter */}
                {showFilter && (
                    <View style={styles.filterBox}>
                        <TouchableOpacity style={styles.filterOption} onPress={() => setShowFilter(false)}>
                            <Text style={styles.filterText}>Giá: Thấp → Cao</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterOption} onPress={() => setShowFilter(false)}>
                            <Text style={styles.filterText}>Giá: Cao → Thấp</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Featured Products */}
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.productList}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <Text style={styles.rating}>{item.rating} ⭐</Text>
                        <TouchableOpacity style={styles.buyButton}><Text style={styles.buttonText}>Mua ngay</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buyButton}><Text style={styles.buttonText}>Thêm vào giỏ hàng</Text></TouchableOpacity>
                    </View>
                )}
            />


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 30
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 15,
    },
    navItems: {
        flexDirection: 'row',
    },
    navButton: {
        padding: 10,
    },
    navText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    authButtons: {
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    signupButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFE4E1',
        borderRadius: 10,
        marginVertical: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subHeaderText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#1E90FF',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
    },
    filterText: {
        fontSize: 16, fontWeight: 'bold'
    },
    filterContainer: { alignSelf: 'flex-end', marginBottom: 10 },
    searchButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    productList: {
        alignItems: 'center',
    },
    productCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        elevation: 3,
        width: '45%',
        borderWidth: 2,
        borderColor: '#000',
    },

    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF1493',
    },
    rating: {
        fontSize: 14,
        color: '#FFA500',
        marginBottom: 5,
    },
    buyButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FF69B4',
        padding: 15,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    filterBox: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        elevation: 5,
    },
    filterOption: {
        padding: 10,
        fontSize: 16,
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

});