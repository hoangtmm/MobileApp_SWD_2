import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal, ScrollView, Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

// Tạo nhiều sản phẩm hơn để kiểm tra phân trang
const generateProducts = () => {
    const baseProducts = [
        { id: '1', name: 'Dây đeo Labubu Size R Đen', price: 500000, oldPrice: 800000, rating: '4.5/5', image: 'https://th.bing.com/th/id/OIP.7YY6ZZhyGdm2fOl6ooeTGgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7', date: '2024-01-15', popularity: 120, brand: 'Labubu', model: 'Size R' },
        { id: '2', name: 'Dây đeo Labubu Size R Đen', price: 400000, oldPrice: 700000, rating: '4.5/5', image: 'https://img.lazcdn.com/g/p/5ab0191783ebaa302ef6a5b605b09603.jpg_720x720q80.jpg', date: '2024-02-20', popularity: 85, brand: 'Labubu', model: 'Size S' },
        { id: '3', name: 'Dây đeo Labubu Size R Đen', price: 600000, oldPrice: 900000, rating: '4.5/5', image: 'https://prod-america-res.popmart.com/default/20231215_094938_254780__1200x1200.jpg?x-oss-process=image/resize,p_30,format,webp,format,webp', date: '2023-12-10', popularity: 200, brand: 'Popmart', model: 'Time to Chill' },
        { id: '4', name: 'Dây đeo Labubu Size R Đen', price: 700000, oldPrice: 1000000, rating: '4.5/5', image: 'https://otakustore.vn/image/cache/catalog/2024/01/the-monsters-labubu-time-to-chill-series-vinyl-doll-pop-mart-3-1500x1500.jpg', date: '2023-11-05', popularity: 150, brand: 'Popmart', model: 'Vinyl Doll' },
    ];

    // Các thương hiệu và mẫu sản phẩm để tạo sản phẩm ngẫu nhiên
    const brands = ['Labubu', 'Popmart', 'Molly', 'Dimoo', 'Skullpanda'];
    const models = ['Size R', 'Size S', 'Time to Chill', 'Vinyl Doll', 'Winter Series', 'Summer Edition', 'Limited Edition'];
    const years = [2020, 2021, 2022, 2023, 2024];

    // Tạo thêm sản phẩm để có tổng cộng 20 sản phẩm
    let allProducts = [...baseProducts];
    for (let i = 5; i <= 20; i++) {
        const randomBaseProduct = baseProducts[Math.floor(Math.random() * baseProducts.length)];
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const randomModel = models[Math.floor(Math.random() * models.length)];
        const randomYear = years[Math.floor(Math.random() * years.length)];
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomDay = Math.floor(Math.random() * 28) + 1;

        allProducts.push({
            ...randomBaseProduct,
            id: i.toString(),
            price: Math.floor(Math.random() * 500000) + 300000,
            oldPrice: Math.floor(Math.random() * 500000) + 800000,
            popularity: Math.floor(Math.random() * 200) + 50,
            date: `${randomYear}-${randomMonth < 10 ? '0' + randomMonth : randomMonth}-${randomDay < 10 ? '0' + randomDay : randomDay}`,
            brand: randomBrand,
            model: randomModel
        });
    }
    return allProducts;
};

const products = generateProducts();

// Tạo danh sách các thương hiệu và mẫu sản phẩm duy nhất
const getUniqueBrands = () => {
    const brands = products.map(product => product.brand);
    return ['All', ...new Set(brands)];
};

const getUniqueModels = () => {
    const models = products.map(product => product.model);
    return ['All', ...new Set(models)];
};

const getUniqueYears = () => {
    const years = products.map(product => new Date(product.date).getFullYear());
    return ['All', ...new Set(years)].sort();
};

export default function HomeScreen() {
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortedProducts, setSortedProducts] = useState(products);
    const [activeFilter, setActiveFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Filter state
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedModel, setSelectedModel] = useState('All');
    const [startYear, setStartYear] = useState('All');
    const [endYear, setEndYear] = useState('All');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [condition, setCondition] = useState('All');
    const [rating, setRating] = useState(0);

    // Get unique lists for dropdowns
    const uniqueBrands = getUniqueBrands();
    const uniqueModels = getUniqueModels();
    const uniqueYears = getUniqueYears();

    // Tính toán số trang dựa trên tổng số sản phẩm và số sản phẩm trên mỗi trang
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    // Lấy sản phẩm cho trang hiện tại
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedProducts.slice(startIndex, endIndex);
    };

    const [currentItems, setCurrentItems] = useState(getCurrentPageItems());

    // Cập nhật các sản phẩm hiển thị khi trang hoặc danh sách sản phẩm thay đổi
    useEffect(() => {
        setCurrentItems(getCurrentPageItems());
    }, [currentPage, sortedProducts]);

    // Di chuyển đến trang trước
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Di chuyển đến trang kế tiếp
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Apply sorting
    const applySort = (sortType) => {
        let sorted = [...filteredProducts];

        switch (sortType) {
            case 'asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                sorted.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'newest':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            default:
            // Không làm gì
        }

        setSortedProducts(sorted);
        setActiveFilter(sortType);
        setCurrentPage(1); // Reset về trang đầu tiên khi áp dụng bộ lọc mới
    };

    // Apply filters
    const applyFilters = () => {
        let filtered = [...products];

        // Filter by brand
        if (selectedBrand !== 'All') {
            filtered = filtered.filter(product => product.brand === selectedBrand);
        }

        // Filter by model
        if (selectedModel !== 'All') {
            filtered = filtered.filter(product => product.model === selectedModel);
        }

        // Filter by year range
        if (startYear !== 'All') {
            filtered = filtered.filter(product => new Date(product.date).getFullYear() >= startYear);
        }

        if (endYear !== 'All') {
            filtered = filtered.filter(product => new Date(product.date).getFullYear() <= endYear);
        }

        // Filter by price range
        if (priceFrom && !isNaN(parseInt(priceFrom))) {
            filtered = filtered.filter(product => product.price >= parseInt(priceFrom));
        }

        if (priceTo && !isNaN(parseInt(priceTo))) {
            filtered = filtered.filter(product => product.price <= parseInt(priceTo));
        }

        // Filter by condition
        if (condition !== 'All') {
            // Giả định rằng condition được lưu trong sản phẩm
            filtered = filtered.filter(product => product.condition === condition);
        }

        setFilteredProducts(filtered);
        setSortedProducts(filtered); // Reset sorting when applying new filters
        setActiveFilter(null);
        setCurrentPage(1); // Reset to first page
        setShowFilter(false);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedBrand('All');
        setSelectedModel('All');
        setStartYear('All');
        setEndYear('All');
        setPriceFrom('');
        setPriceTo('');
        setCondition('All');
        setRating(0);
        setFilteredProducts(products);
        setSortedProducts(products);
        setActiveFilter(null);
        setCurrentPage(1);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.brandModel}>{item.brand} - {item.model}</Text>
            <Text style={styles.oldPrice}>{item.oldPrice.toLocaleString()}đ</Text>
            <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
            <Text style={styles.rating}>{item.rating} ⭐</Text>
            <TouchableOpacity style={styles.buyButton}><Text style={styles.buttonText}>Mua ngay</Text></TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Discover, Trade, and Collect Your Unique Accessories</Text>
                    <Text style={styles.subHeaderText}>Unlock a world of surprises with our exclusive blind boxes.</Text>
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchBar} placeholder="search blindbox type e.g" />
                        <TouchableOpacity style={styles.searchButton}><Text style={styles.buttonText}>🔍</Text></TouchableOpacity>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
                        <Text style={styles.buttonText}>Filter</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Popular product</Text>

                    <FlatList
                        data={currentItems}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        contentContainerStyle={styles.productList}
                    />

                    {/* Pagination Controls */}
                    <View style={styles.paginationContainer}>
                        <TouchableOpacity
                            style={[styles.paginationButton, currentPage === 1 ? styles.paginationButtonDisabled : null]}
                            onPress={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            <Text style={[styles.paginationButtonText, currentPage === 1 ? styles.paginationButtonTextDisabled : null]}>Trước</Text>
                        </TouchableOpacity>

                        <Text style={styles.paginationText}>
                            Trang {currentPage} / {totalPages}
                        </Text>

                        <TouchableOpacity
                            style={[styles.paginationButton, currentPage === totalPages ? styles.paginationButtonDisabled : null]}
                            onPress={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={[styles.paginationButtonText, currentPage === totalPages ? styles.paginationButtonTextDisabled : null]}>Tiếp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                transparent={true}
                visible={showFilter}
                animationType="fade"
                onRequestClose={() => setShowFilter(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.filterBox}>
                        <ScrollView contentContainerStyle={styles.filterScrollContent}>
                            <Text style={styles.filterTitle}>Filters</Text>

                            {/* Product Brand */}
                            <Text style={styles.filterSubtitle}>Product Brand</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedBrand}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSelectedBrand(itemValue)}
                                >
                                    {uniqueBrands.map((brand, index) => (
                                        <Picker.Item key={index} label={brand} value={brand} />
                                    ))}
                                </Picker>
                            </View>

                            {/* Product Model */}
                            <Text style={styles.filterSubtitle}>Product Model</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedModel}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSelectedModel(itemValue)}
                                >
                                    {uniqueModels.map((model, index) => (
                                        <Picker.Item key={index} label={model} value={model} />
                                    ))}
                                </Picker>
                            </View>

                            {/* Manufacture Year */}
                            <Text style={styles.filterSubtitle}>Manufacture Year</Text>
                            <View style={styles.yearContainer}>
                                <View style={styles.yearPickerContainer}>
                                    <Text style={styles.yearLabel}>Start Year</Text>
                                    <Picker
                                        selectedValue={startYear}
                                        style={styles.yearPicker}
                                        onValueChange={(itemValue) => setStartYear(itemValue)}
                                    >
                                        {uniqueYears.map((year, index) => (
                                            <Picker.Item key={index} label={year.toString()} value={year} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.yearPickerContainer}>
                                    <Text style={styles.yearLabel}>End Year</Text>
                                    <Picker
                                        selectedValue={endYear}
                                        style={styles.yearPicker}
                                        onValueChange={(itemValue) => setEndYear(itemValue)}
                                    >
                                        {uniqueYears.map((year, index) => (
                                            <Picker.Item key={index} label={year.toString()} value={year} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>

                            {/* Price Range */}
                            <Text style={styles.filterSubtitle}>Price Range</Text>
                            <View style={styles.priceRangeContainer}>
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder="From"
                                    keyboardType="numeric"
                                    value={priceFrom}
                                    onChangeText={setPriceFrom}
                                />
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder="To"
                                    keyboardType="numeric"
                                    value={priceTo}
                                    onChangeText={setPriceTo}
                                />
                            </View>

                            {/* Condition */}
                            <Text style={styles.filterSubtitle}>Condition</Text>
                            <View style={styles.conditionContainer}>
                                <TouchableOpacity
                                    style={[styles.conditionOption, condition === 'All' && styles.activeCondition]}
                                    onPress={() => setCondition('All')}
                                >
                                    <Text style={styles.conditionText}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.conditionOption, condition === 'New' && styles.activeCondition]}
                                    onPress={() => setCondition('New')}
                                >
                                    <Text style={styles.conditionText}>New</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.conditionOption, condition === 'Used' && styles.activeCondition]}
                                    onPress={() => setCondition('Used')}
                                >
                                    <Text style={styles.conditionText}>Used</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Sort Options */}
                            <Text style={styles.filterTitle}>Sort by</Text>
                            <View style={styles.sortOptionsContainer}>
                                <TouchableOpacity
                                    style={[styles.sortOptionButton, activeFilter === 'popular' && styles.activeSortButton]}
                                    onPress={() => applySort('popular')}
                                >
                                    <Text style={styles.filterText}>Most Popular</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sortOptionButton, activeFilter === 'newest' && styles.activeSortButton]}
                                    onPress={() => applySort('newest')}
                                >
                                    <Text style={styles.filterText}>Newest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sortOptionButton, activeFilter === 'oldest' && styles.activeSortButton]}
                                    onPress={() => applySort('oldest')}
                                >
                                    <Text style={styles.filterText}>Oldest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sortOptionButton, activeFilter === 'asc' && styles.activeSortButton]}
                                    onPress={() => applySort('asc')}
                                >
                                    <Text style={styles.filterText}>Price: Low to High</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sortOptionButton, activeFilter === 'desc' && styles.activeSortButton]}
                                    onPress={() => applySort('desc')}
                                >
                                    <Text style={styles.filterText}>Price: High to Low</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.filterActionContainer}>
                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={applyFilters}
                                >
                                    <Text style={styles.buttonText}>Apply Filters</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={clearAllFilters}
                                >
                                    <Text style={styles.clearButtonText}>Clear All</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowFilter(false)}
                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFE4E1',
        borderRadius: 10,
        margin: 10,
        marginBottom: 0
    },
    contentContainer: {
        padding: 10,
        paddingTop: 0
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    subHeaderText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%'
    },
    searchBar: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5
    },
    searchButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5
    },
    filterButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginVertical: 10
    },
    filterBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        width: '90%',
        maxHeight: '80%'
    },
    filterScrollContent: {
        paddingBottom: 20
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10
    },
    filterSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#f9f9f9'
    },
    picker: {
        height: 50,
        width: '100%'
    },
    yearContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    yearPickerContainer: {
        width: '48%',
    },
    yearLabel: {
        fontSize: 14,
        marginBottom: 5
    },
    yearPicker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9'
    },
    priceRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    priceInput: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f9f9f9'
    },
    conditionContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    conditionOption: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        marginRight: 8
    },
    activeCondition: {
        backgroundColor: '#e6f7ff',
        borderColor: '#1890ff'
    },
    conditionText: {
        fontSize: 14
    },
    sortOptionsContainer: {
        marginBottom: 15
    },
    sortOptionButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 8
    },
    activeSortButton: {
        backgroundColor: '#e6f7ff',
        borderColor: '#1890ff'
    },
    filterText: {
        fontSize: 14
    },
    filterActionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 15
    },
    applyButton: {
        backgroundColor: '#1E90FF',
        padding: 12,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center'
    },
    clearButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff6b6b'
    },
    clearButtonText: {
        color: '#ff6b6b',
        fontWeight: 'bold'
    },
    closeButton: {
        backgroundColor: '#FF6347',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    productList: {
        alignItems: 'center'
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
        borderColor: '#000'
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    brandModel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        textAlign: 'center'
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#888'
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF1493'
    },
    rating: {
        fontSize: 14,
        color: '#FFA500',
        marginBottom: 5
    },
    buyButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5
    },
    // Pagination styles
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 10
    },
    paginationButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 10
    },
    paginationButtonDisabled: {
        backgroundColor: '#cccccc'
    },
    paginationButtonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    paginationButtonTextDisabled: {
        color: '#999999'
    },
    paginationText: {
        fontSize: 16,
        fontWeight: '500',
    }
});