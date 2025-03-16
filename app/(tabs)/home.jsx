import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_USER_URL } from "@/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_USER_URL}/api/v1/DPSSelectItem?CurrentPage=1&PageSize=4&SearchBy=1&ChildCategoryName=&MaximumPrice=0&MinimumPrice=0&ParentCategoryName=&SortBy=1&NameAccessory=`
            );
            const data = await response.json();
            if (data.success) {
                setProducts(data.response.items);
                setFilteredProducts(data.response.items);
            } else {
                setProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const handleSearch = () => {
        if (search.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((item) =>
                item.nameAccessory.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };
const addToCart = async (product) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập!');
        return;
      }
      const response = await fetch(`${API_USER_URL}/api/v1/DPSInsertCart`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codeAccessory: product.codeProduct,
          quantity: 1,  
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      if (result.success) {
        Alert.alert(
            "Notification",
            'Product has been added to cart!!!');
      } else {
        alert(result.message || 'Thêm vào giỏ hàng thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
    }
  };
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Discover, Trade, and Collect Your Unique Accessories</Text>
                <Text style={styles.subHeaderText}>Unlock a world of surprises with our exclusive blind boxes.</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search blindbox type e.g"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.buttonText}>🔍</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Loading */}
            {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" style={{ marginTop: 50 }} />
            ) : (
                <>
                    {/* Featured Products */}
                    <Text style={styles.sectionTitle}>Popular Products</Text>
                    <FlatList
                        data={filteredProducts}
                        numColumns={2}
                        keyExtractor={(item) => item.codeProduct}
                        contentContainerStyle={styles.productList}
                        renderItem={({ item }) => (
                            <View style={styles.productCard}>
                                <Image source={{ uri: item.imageUrl[0]?.imageUrl || 'https://via.placeholder.com/100' }} style={styles.productImage} />
                                <Text style={styles.productName}>{item.nameAccessory}</Text>
                                {item.price && <Text style={styles.oldPrice}>{item.price} VND</Text>}
                                <Text style={styles.productPrice}>{item.salePrice ? `${item.salePrice} VND` : `${item.price} VND`}</Text>
                                <TouchableOpacity style={styles.buyButton}><Text style={styles.buttonText}>Buy Now</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() => addToCart(item)}
                                >
                                    <Text style={styles.buttonText}>Add To Cart</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            )}
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
        width: '45%'
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
    buyButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

